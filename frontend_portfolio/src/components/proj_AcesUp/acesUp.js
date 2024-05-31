import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { ClipLoader } from 'react-spinners';
import 'chart.js/auto';
import './acesUp.css';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const AcesUp = () => {
  const [numSimulations, setNumSimulations] = useState(1000);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Probability',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const simulationCounts = [10, 50, 100, 500, 1000, 10000, 100000];

  const startSimulation = async (iterations) => {
    console.log('Starting simulation...');
    setLoading(true); // Set loading to true when simulation starts
    try {
      const response = await axios.post('http://127.0.0.1:8000/simulate/', {
        num_simulations: iterations,
      });

      console.log('Response received:', response);

      const data = response.data;

      console.log('Data:', data);

      if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid data format');
      }

      const labels = Object.keys(data);
      const values = Object.values(data).map((value) => value * 100); // Convert to percent

      console.log('Labels:', labels);
      console.log('Values:', values);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Probability',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    } catch (error) {
      console.error('Error starting simulation:', error);
    } finally {
      setLoading(false); // Set loading to false when simulation ends
    }
  };

  useEffect(() => {
    startSimulation(numSimulations);
  }, []);

  return (
    <div className="simulation-container">
      <h2>Card Game Simulation</h2>
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
        <h3>Simulation Results</h3>
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
                },
                y: {
                  title: {
                    display: true,
                    text: 'Probability (%)',
                  },
                  ticks: {
                    callback: function (value) {
                      return value + '%'; // Convert y-axis labels to percent
                    },
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    title: function (context) {
                      return context[0].label + ' Cards Remaining';
                    },
                    label: function (context) {
                      let value = context.raw || 0;
                      return `Probability: ${value.toFixed(2)}%`;
                    },
                    labelColor: function() {
                      return {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent'
                      };
                    },
                    labelTextColor: function() {
                      return '#000';
                    }
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AcesUp;
