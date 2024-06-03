import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { ClipLoader } from 'react-spinners';
import 'chart.js/auto';
import './acesUp.css';

const AcesUp = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Probability',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.9)',
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const simulationCounts = [10, 50, 100, 500, 1000, 10000, 50000];

  const startSimulation = async (iterations) => {
    console.log('Starting simulation...');
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/simulate/', {
        num_simulations: iterations,
      });

      console.log('Response received:', response);

      const { data } = response;

      console.log('Data:', data);

      if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid data format');
      }

      const labels = Object.keys(data);
      const values = Object.values(data).map((value) => value * 100);

      console.log('Labels:', labels);
      console.log('Values:', values);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Probability',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.9)',
          },
        ],
      });
    } catch (error) {
      console.error('Error starting simulation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startSimulation(1000);
  }, []);

  return (
    <div className="simulation-container">
      <h2>Aces Up Simulation</h2>
      <div className="simulation-buttons">
        {simulationCounts.map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => startSimulation(count)}
            className="simulation-button"
          >
            {count}
          </button>
        ))}
      </div>
      <div className="chart-container">
        <h3>Results</h3>
        {loading ? (
          <div className="loading-spinner">
            <ClipLoader color="#36d7b7" loading={loading} size={150} />
          </div>
        ) : (
          <Bar
            data={chartData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Number of Cards Remaining on the Board',
                  },
                  grid: {
                    lineWidth: 1,
                    color: (0,0,0,.9),
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Probability (%)',
                  },
                  ticks: {
                    callback(value) {
                      return `${value}%`;
                    },
                  },
                  grid: {
                    lineWidth: 1,
                    color: (0,0,0,.9),
                  }
                },
              },
              plugins: {
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    title(context) {
                      return `${context[0].label} Cards Remaining`;
                    },
                    label(context) {
                      const value = context.raw || 0;
                      return `Probability: ${value.toFixed(2)}%`;
                    },
                    labelColor() {
                      return {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                      };
                    },
                    labelTextColor() {
                      return '#000';
                    },
                  },
                },
              },
            }}
          />
        )}
      </div>
      <div>
        <p>
          In an attempt to distract myself from watching, reading, or otherwise looking at anything related to Michigan&apos;s 2024 playoff football game against Alabama, I spent the day trying to answer a question my math-wiz Uncle had. My family loves card games and a recent solo-time-waster everyone at Christmas has been playing is Aces Up. I&apos;ll let Wikipedia explain it:
        </p>
        <blockquote>
          <p>Gameplay for Aces Up works as follows:</p>
          <p>1. Deal four cards in a row face up.</p>
          <p>2. If there are two or more cards of the same suit, discard all but the highest-ranked card of that suit. Aces rank high.</p>
          <p>3. Repeat step 2 until there are no more pairs of cards with the same suit.</p>
          <p>4. Whenever there are any empty spaces, you may choose the top card of another pile to be put into the empty space. After you do this, go to Step 2.</p>
          <p>5. When there are no more cards to move or remove, deal out the next four cards from the deck face-up onto each pile.</p>
          <p>6. Repeat Step 2, using only the visible, or top, cards on each of the four piles.</p>
          <p>7. When the last four cards have been dealt out and any moves made, the game is over. The fewer cards left in the tableau, the better. To win is to have only the four aces left.</p>
          <p>When the game ends, the number of discarded cards is your score. The maximum score (and thus the score necessary to win) is 48, which means all cards have been discarded except for the four aces, thus the name of the game.</p>
        </blockquote>
      </div>
    </div>
  );
};

export default AcesUp;
