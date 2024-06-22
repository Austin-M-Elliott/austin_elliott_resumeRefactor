from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
import random
from collections import namedtuple, defaultdict
from fastapi.middleware.cors import CORSMiddleware

Card = namedtuple('Card', ['suit', 'value', 'ace_moved'])

def create_deck():
    suits = ['hearts', 'diamonds', 'clubs', 'spades']
    values = list(range(2, 11)) + ['J', 'Q', 'K', 'A']
    return [Card(suit, value, False) for suit in suits for value in values]

def shuffle_deck(deck):
    random.shuffle(deck)
    return deck

def card_value(card):
    if card.value in ['J', 'Q', 'K']:
        return 11 + ['J', 'Q', 'K'].index(card.value)
    if card.value == 'A':
        return 14
    return card.value

def deal_round_with_stack(deck, board):
    for i in range(4):
        if deck:
            if len(board) > i:
                board[i].append(deck.pop(0))
            else:
                board.append([deck.pop(0)])

def discard_face_up_cards(board):
    cards_discarded = True
    while cards_discarded:
        cards_discarded = False
        highest_face_up_cards = {suit: 0 for suit in ['hearts', 'diamonds', 'clubs', 'spades']}
        for stack in board:
            if stack:
                top_card = stack[-1]
                top_card_value = card_value(top_card)
                if top_card_value > highest_face_up_cards[top_card.suit]:
                    highest_face_up_cards[top_card.suit] = top_card_value
        for stack in board:
            if stack and card_value(stack[-1]) < highest_face_up_cards[stack[-1].suit]:
                stack.pop()
                cards_discarded = True

def play_game_with_stacks_updated(deck):
    deck = shuffle_deck(deck)
    board = [[] for _ in range(4)]
    while deck:
        deal_round_with_stack(deck, board)
        discard_face_up_cards(board)
        move_ace_with_optimal_strategy(board)
    remaining_on_board = sum(len(stack) for stack in board)
    return remaining_on_board, len(deck)

def simulate_games_with_stacks_updated(num_simulations):
    outcomes_board = defaultdict(int)
    outcomes_hand = defaultdict(int)
    for _ in range(num_simulations):
        deck = create_deck()
        board_remaining, hand_remaining = play_game_with_stacks_updated(deck)
        outcomes_board[board_remaining] += 1
        outcomes_hand[hand_remaining] += 1
    return outcomes_board, outcomes_hand

def can_move_ace(stack):
    return stack and stack[-1].value == 'A' and not stack[-1].ace_moved

def simulate_move_ace(board, from_pile, to_pile):
    new_board = [stack[:] for stack in board]
    moved_ace = new_board[from_pile].pop()
    moved_ace = moved_ace._replace(ace_moved=True)
    new_board[to_pile].append(moved_ace)
    return new_board

def simulate_subsequent_rounds(board, depth=0, max_depth=5):
    if depth == max_depth:
        return 0
    score = 0
    score += discard_face_up_cards_simulated(board)
    for i, stack in enumerate(board):
        if can_move_ace(stack):
            for j in range(4):
                if j != i and not board[j]:
                    new_board = simulate_move_ace(board, i, j)
                    score += simulate_subsequent_rounds(new_board, depth + 1, max_depth)
    return score

def discard_face_up_cards_simulated(board):
    cards_discarded = True
    discard_count = 0
    while cards_discarded:
        cards_discarded = False
        highest_face_up_cards = {suit: 0 for suit in ['hearts', 'diamonds', 'clubs', 'spades']}
        for stack in board:
            if stack:
                top_card = stack[-1]
                top_card_value = card_value(top_card)
                if top_card_value > highest_face_up_cards[top_card.suit]:
                    highest_face_up_cards[top_card.suit] = top_card_value
        for stack in board:
            if stack and card_value(stack[-1]) < highest_face_up_cards[stack[-1].suit]:
                stack.pop()
                cards_discarded = True
                discard_count += 1
    return discard_count

def move_ace_with_optimal_strategy(board):
    movable_aces = [(i, stack) for i, stack in enumerate(board) if can_move_ace(stack)]
    empty_piles = [j for j, stack in enumerate(board) if not stack]
    if len(movable_aces) == 1 and empty_piles:
        execute_move_ace(board, movable_aces[0][0], empty_piles[0])
        discard_face_up_cards(board)
        return
    best_score = 0
    best_moves = []
    for i, _ in movable_aces:
        for j in empty_piles:
            simulated_board = simulate_move_ace(board, i, j)
            score = simulate_subsequent_rounds(simulated_board)
            if score > best_score:
                best_score = score
                best_moves = [(i, j)]
            elif score == best_score:
                best_moves.append((i, j))
    if best_moves:
        chosen_move = random.choice(best_moves)
        execute_move_ace(board, *chosen_move)
        discard_face_up_cards(board)

def execute_move_ace(board, from_pile, to_pile):
    moved_ace = board[from_pile].pop()
    moved_ace = moved_ace._replace(ace_moved=True)
    board[to_pile].append(moved_ace)