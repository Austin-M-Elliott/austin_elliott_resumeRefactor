import { useContext, useMemo, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ThemeContext } from '../../contexts/theme';
import './FantasyFootball.css';

const WINNER_HALO = 'rgba(0, 230, 118, 0.95)';
const LOSER_HALO = 'rgba(255, 23, 68, 0.95)';

const resultHaloPlugin = {
  id: 'resultHaloPlugin',
  afterDatasetDraw(chart, args) {
    const { ctx } = chart;
    const { index, meta } = args;

    if (!chart.isDatasetVisible(index)) return;

    const dataset = chart.data.datasets[index];
    const results = dataset.pointResults || [];

    meta.data.forEach((pointEl, i) => {
      const res = results[i];
      if (res !== 'winner' && res !== 'loser') return;
      if (pointEl.skip) return;

      const val = dataset.data?.[i];
      if (val == null || Number.isNaN(val)) return;

      const props = pointEl.getProps(['x', 'y', 'radius'], false);
      const baseR = props.radius ?? pointEl.options?.radius ?? 4;

      const ringWidth = 4;
      const ringGap = 3;
      const ringRadius = baseR + ringGap + ringWidth / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(props.x, props.y, ringRadius, 0, Math.PI * 2);
      ctx.lineWidth = ringWidth;
      ctx.strokeStyle = res === 'winner' ? WINNER_HALO : LOSER_HALO;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();
    });
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  resultHaloPlugin
);

const seasonYears = Array.from({ length: 10 }, (_, index) => 2016 + index);

const leagueMembers = [
  {
    name: 'Yogesh',
    color: '#2563EB',
    image: '/images/fantasy/yogesh.png',
    data: {
      2016: {
        value: 5.727272727,
      },
      2017: {
        value: 5.909090909,
      },
      2018: {
        value: 9.181818182,
        result: 'winner',
      },
      2019: {
        value: 5,
      },
      2020: {
        value: 3.272727273,
        result: 'loser',
      },
      2021: {
        value: 6.363636364,
      },
      2022: {
        value: 4.636363636,
      },
      2023: {
        value: 6.272727273,
      },
      2024: {
        value: 5.363636364,
      },
      2025: {
        value: 6.272727273,
      }
    },
  },
  {
    name: 'Austin',
    color: '#F59E0B',
    image: '/images/fantasy/austin.png',
    data: {
      2016: {
        value: 7.727272727,
        result: 'winner',
      },
      2017: {
        value: 5.272727273,
      },
      2018: {
        value: 7.090909091,
      },
      2019: {
        value: 6.454545455,
      },
      2020: {
        value: 8.909090909,
        result: 'winner',
      },
      2021: {
        value: 6,
        result: 'winner',
      },
      2022: {
        value: 5.181818182,
        result: 'loser',
      },
      2023: {
        value: 4.272727273,
      },
      2024: {
        value: 4.727272727,
      },
      2025: {
        value: 8.454545455,
        result: 'winner',
      }
    },
  },
  {
    name: 'Sam',
    color: '#7C3AED',
    image: '/images/fantasy/sam.png',
    data: {
      2016: {
        value: 3.181818182,
      },
      2017: {
        value: 8.727272727,
        result: 'winner',
      },
      2018: {
        value: 6.727272727,
      },
      2019: {
        value: 7.636363636,
      },
      2020: {
        value: 7.454545455,
      },
      2021: {
        value: 6.454545455,
      },
      2022: {
        value: 5.272727273,
      },
      2023: {
        value: 6.545454545,
      },
      2024: {
        value: 7,
      },
      2025: {
        value: 3.636363636,
      }
    },
  },
  {
    name: 'Taylor',
    color: '#EC4899',
    image: '/images/fantasy/taylor.png',
    data: {
      2016: {
        value: 4.636363636,
      },
      2017: {
        value: 5.090909091,
      },
      2018: {
        value: 5.545454545,
      },
      2019: {
        value: 7.727272727,
      },
      2020: {
        value: 6.363636364,
      },
      2021: {
        value: 5.727272727,
      },
      2022: {
        value: 7.909090909,
        result: 'winner',
      },
      2023: {
        value: 5.181818182,
      },
      2024: {
        value: 4.636363636,
        result: 'loser',
      },
      2025: {
        value: 5.090909091,
      }
    },
  },
  {
    name: 'Ryan',
    color: '#06B6D4',
    image: '/images/fantasy/ryan.png',
    data: {
      2016: {
        value: 6.727272727,
      },
      2017: {
        value: 4.454545455,
      },
      2018: {
        value: 4.272727273,
      },
      2019: {
        value: 6.090909091,
      },
      2020: {
        value: 6.545454545,
      },
      2021: {
        value: 6.909090909,
      },
      2022: {
        value: 2.818181818,
      },
      2023: {
        value: 5.545454545,
      },
      2024: {
        value: 6,
      },
      2025: {
        value: 4.636363636,
      }
    },
  },
  {
    name: 'Mason',
    color: '#A16207',
    image: '/images/fantasy/mason.png',
    data: {
      2016: {
        value: 6.090909091,
      },
      2017: {
        value: 4.636363636,
      },
      2018: {
        value: 6.818181818,
      },
      2019: {
        value: 4,
      },
      2020: {
        value: 5,
      },
      2021: {
        value: 4.181818182,
      },
      2022: {
        value: 6.909090909,
      },
      2023: {
        value: 4.636363636,
      },
      2024: {
        value: 6.181818182,
      },
      2025: {
        value: 6.090909091,
        result: 'loser',
      }
    },
  },
  {
    name: 'Corey',
    color: '#F97316',
    image: '/images/fantasy/corey.png',
    data: {
      2016: {
        value: 6.727272727,
      },
      2017: {
        value: 6.181818182,
      },
      2018: {
        value: 5.363636364,
      },
      2019: {
        value: 5,
      },
      2020: {
        value: 4.818181818,
      },
      2021: {
        value: 6.727272727,
      },
      2022: {
        value: 5.363636364,
      },
      2023: {
        value: 5.181818182,
      },
      2024: {
        value: 5.363636364,
        result: 'winner',
      },
      2025: {
        value: 4.181818182,
      }
    },
  },
  {
    name: 'Tanim',
    color: '#0EA5E9',
    image: '/images/fantasy/tanim.png',
    data: {
      2016: {
        value: 3.909090909,
      },
      2017: {
        value: 4.090909091,
      },
      2018: {
        value: 3.545454545,
      },
      2019: {
        value: 5.636363636,
      },
      2020: {
        value: 3.545454545,
      },
      2021: {
        value: 6.272727273,
      },
      2022: {
        value: 3.272727273,
      },
      2023: {
        value: 5.636363636,
      },
      2024: {
        value: 6.363636364,
      },
      2025: {
        value: 4.818181818,
      }
    },
  },
  {
    name: 'Dan',
    color: '#22C55E',
    image: '/images/fantasy/dan.png',
    data: {
      2016: {
        value: 5.545454545,
      },
      2017: {
        value: 5.363636364,
      },
      2018: {
        value: 5.818181818,
      },
      2019: {
        value: 5.454545455,
        result: 'winner',
      },
      2020: {
        value: 5.727272727,
      },
      2021: {
        value: 6,
      },
      2022: {
        value: 4.181818182,
      },
      2023: {
        value: 8.363636364,
        result: 'winner',
      },
      2024: {
        value: 5.272727273,
      },
      2025: {
        value: 5.909090909,
      }
    },
  },
  {
    name: 'Eamon',
    color: '#84CC16',
    image: '/images/fantasy/eamon.png',
    data: {
      2016: {
        value: 4.545454545,
        result: 'loser',
      },
      2017: {
        value: 5.727272727,
      },
      2018: {
        value: 3.181818182,
        result: 'loser',
      },
      2019: {
        value: 3,
        result: 'loser',
      },
      2020: {
        value: 5.363636364,
      },
      2021: {
        value: 3.272727273,
      },
      2022: {
        value: 7.090909091,
      },
      2023: {
        value: 4.636363636,
        result: 'loser',
      },
      2024: {
        value: 3.636363636,
      },
      2025: {
        value: 5,
      }
    },
  },
  {
    name: 'Eric',
    color: '#6366F1',
    image: '/images/fantasy/eric.png',
    data: {
      2016: {
        value: 5.727272727,
      },
      2017: {
        value: 5.636363636,
      },
      2018: {
        value: 3.909090909,
      },
      2019: {
        value: 5.545454545,
      },
      2020: {
        value: 5,
      },
      2021: {
        value: 5.181818182,
      },
      2022: {
        value: 5.727272727,
      },
      2023: {
        value: 3.181818182,
      },
      2024: {
        value: 6.272727273,
      },
      2025: {
        value: 4.272727273,
      }
    },
  },
  {
    name: 'Saad',
    color: '#14B8A6',
    image: '/images/fantasy/saad.png',
    data: {
      2016: {
        value: 4.818181818,
      },
      2017: {
        value: 4,
        result: 'loser',
      },
      2018: {
        value: 5.181818182,
      },
      2019: {
        value: 4.454545455,
      },
      2020: {
        value: 3.909090909,
      },
      2021: {
        value: 2.909090909,
        result: 'loser',
      }
    },
  },
  {
    name: 'Michelle',
    color: '#FB7185',
    image: '/images/fantasy/michelle.png',
    data: {
      2022: {
        value: 7.636363636,
      },
      2023: {
        value: 6.545454545,
      },
      2024: {
        value: 5.181818182,
      },
      2025: {
        value: 7.636363636,
      }
    },
  },
];

const resolveDataPoint = (entry) => {
  if (typeof entry === 'number') {
    return { value: entry, result: null };
  }
  return entry ?? { value: null, result: null };
};

const computeMemberStats = (member) => {
  const seasons = Object.keys(member.data).map(Number);
  const values = seasons
    .map((year) => resolveDataPoint(member.data[year]).value)
    .filter((v) => v != null);

  const totalARSE = values.reduce((sum, v) => sum + v, 0);
  const avgARSE = values.length ? totalARSE / values.length : 0;

  const placings = seasons
    .map((year) => {
      const myValue = resolveDataPoint(member.data[year]).value;
      if (myValue == null) return null;
      const allThisYear = leagueMembers
        .map((m) => (m.data[year] != null ? resolveDataPoint(m.data[year]).value : null))
        .filter((v) => v != null)
        .sort((a, b) => b - a);
      return allThisYear.indexOf(myValue) + 1;
    })
    .filter((p) => p !== null);

  const avgPlacing = placings.length
    ? placings.reduce((sum, p) => sum + p, 0) / placings.length
    : 0;

  return {
    seasons: values.length,
    totalARSE: totalARSE.toFixed(1),
    avgARSE: avgARSE.toFixed(2),
    avgPlacing: avgPlacing.toFixed(1),
  };
};

const FantasyFootball = () => {
  const [{ themeName }] = useContext(ThemeContext);
  const tooltipRef = useRef(null);
  const [activeMembers, setActiveMembers] = useState(
    () => new Set(leagueMembers.map((member) => member.name)),
  );
  const [yearRange, setYearRange] = useState({
    start: seasonYears[0],
    end: seasonYears[seasonYears.length - 1],
  });

  const toggleMember = (name) => {
    setActiveMembers((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const handleYearChange = (key, value) => {
    setYearRange((prev) => {
      const next = { ...prev, [key]: Number(value) };
      if (next.start > next.end) {
        if (key === 'start') {
          next.end = next.start;
        } else {
          next.start = next.end;
        }
      }
      return next;
    });
  };

  const visibleYears = useMemo(
    () => seasonYears.filter((year) => year >= yearRange.start && year <= yearRange.end),
    [yearRange],
  );

  const themeColors = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        foreground: '#111',
        grid: 'rgba(0, 0, 0, 0.08)',
      };
    }

    const styles = getComputedStyle(document.documentElement);
    const cssFg = styles.getPropertyValue('--clr-fg').trim() || '#555';

    const foreground = themeName === 'dark' ? '#FFFFFF' : cssFg;
    const grid = themeName === 'dark'
      ? 'rgba(255, 255, 255, 0.22)'
      : 'rgba(0, 0, 0, 0.08)';

    return { foreground, grid };
  }, [themeName]);

  const tooltipHandler = useMemo(
    () => (context) => {
      const tooltipEl = tooltipRef.current;
      if (!tooltipEl) {
        return;
      }

      const { chart, tooltip } = context;

      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      const dataPoint = tooltip.dataPoints?.[0];
      if (!dataPoint) {
        tooltipEl.style.opacity = 0;
        return;
      }

      const member = leagueMembers.find((item) => item.name === dataPoint.dataset.label);
      const memberImage = member?.image ?? '';
      const memberColor = member?.color ?? themeColors.foreground;
      const year = dataPoint.label;
      const value = dataPoint.formattedValue;
      const initials = member?.name
        ? member.name
            .split(' ')
            .map((part) => part[0])
            .join('')
        : '';

      tooltipEl.innerHTML = `
        <div class="fantasy__tooltip-card" style="border-color:${memberColor}">
          <div class="fantasy__tooltip-avatar">
            <img src="${memberImage}" alt="${member?.name ?? ''}" />
            <span>${initials}</span>
          </div>
          <div class="fantasy__tooltip-meta">
            <strong>${member?.name ?? ''}</strong>
            <span>${year} · ${value} ARSE wins</span>
          </div>
        </div>
      `;

      const tooltipImage = tooltipEl.querySelector('img');
      const tooltipInitials = tooltipEl.querySelector('.fantasy__tooltip-avatar span');
      if (tooltipImage && tooltipInitials) {
        tooltipImage.onload = () => {
          tooltipInitials.style.opacity = '0';
        };
        tooltipImage.onerror = () => {
          tooltipImage.style.display = 'none';
        };
      }

      const container = chart.canvas.closest('.fantasy__chart');
      if (!container) return;

      const canvasRect = chart.canvas.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = `${tooltip.caretX + (canvasRect.left - containerRect.left)}px`;
      tooltipEl.style.top = `${tooltip.caretY + (canvasRect.top - containerRect.top)}px`;

    },
    [themeColors.foreground],
  );

  const chartData = useMemo(
    () => ({
      labels: visibleYears,
      datasets: leagueMembers.map((member) => {
        const pointResults = visibleYears.map(
          (year) => resolveDataPoint(member.data[year]).result
        );

        return {
          label: member.name,
          data: visibleYears.map((year) => resolveDataPoint(member.data[year]).value ?? null),

          borderColor: member.color,
          backgroundColor: member.color,
          borderWidth: 3,
          tension: 0.3,
          spanGaps: false,

          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: member.color,
          pointBorderColor: member.color,
          pointBorderWidth: 2,

          pointResults,

          hidden: !activeMembers.has(member.name),
        };
      }),
    }),
    [activeMembers, visibleYears],
  );


  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'ARSE Wins by Season (2016–2025)',
          color: themeColors.foreground,
          font: {
            size: 18,
            family: 'Poppins',
          },
        },
        tooltip: {
          enabled: false,
          external: tooltipHandler,
        },
      },
      scales: {
        x: {
          ticks: { color: themeColors.foreground },
          grid: { color: themeColors.grid },
          border: { color: themeColors.grid },
        },
        y: {
          title: {
            display: true,
            text: 'ARSE Wins',
            color: themeColors.foreground,
            font: { family: 'Poppins', size: 15 },
          },
          ticks: { color: themeColors.foreground },
          grid: { color: themeColors.grid },
          border: { color: themeColors.grid },
        },
      }
    }),
    [themeColors],
  );

  const getOutcomeYears = (member) => {
    const wins = [];
    const losses = [];

    Object.entries(member.data ?? {}).forEach(([year, entry]) => {
      const { result } = resolveDataPoint(entry);
      if (result === 'winner') wins.push(Number(year));
      if (result === 'loser') losses.push(Number(year));
    });

    wins.sort((a, b) => a - b);
    losses.sort((a, b) => a - b);

    return { wins, losses };
  };

  return (
    <section className="section fantasy">
      <div className="fantasy__hero">
        <h2 className="section__title">Fantasy Football</h2>
        <p className="fantasy__intro">
            Our senior year in undergrad, our friend group started a fantasy football league. Starting with 10 complete noobs in 2015 and expanding to 12 in 2016, the league is officially 10 years old now!
            
            Since 2016, I have been keeping track of various statistics, but the one with the most staying power has been ARSE wins - the number of wins a player would have if they played an All Random Season Everytime.
        </p>
      </div>

      <div className="fantasy__chart-card">
        <div className="fantasy__chart">
          <Line data={chartData} options={chartOptions} />
          <div ref={tooltipRef} className="fantasy__tooltip" />
        </div>
        <div className="fantasy__range">
          <div className="fantasy__range-labels">
            <span>Year range</span>
            <strong>
              {yearRange.start} – {yearRange.end}
            </strong>
          </div>
          <div className="fantasy__sliders">
            <input
              type="range"
              min={seasonYears[0]}
              max={seasonYears[seasonYears.length - 1]}
              value={yearRange.start}
              onChange={(event) => handleYearChange('start', event.target.value)}
              className="fantasy__slider"
              aria-label="start year"
            />
            <input
              type="range"
              min={seasonYears[0]}
              max={seasonYears[seasonYears.length - 1]}
              value={yearRange.end}
              onChange={(event) => handleYearChange('end', event.target.value)}
              className="fantasy__slider fantasy__slider--end"
              aria-label="end year"
            />
          </div>
        </div>
      </div>

      <div className="fantasy__legend">
        <h3 className="fantasy__legend-title">League Mates</h3>
        <p className="fantasy__legend-hint">click a card to toggle on the chart</p>
        <div className="fantasy__legend-grid">
          {leagueMembers.map((member) => {
            const isActive = activeMembers.has(member.name);
            const { wins, losses } = getOutcomeYears(member);
            const stats = computeMemberStats(member);
            const initials = member.name
              .split(' ')
              .map((p) => p[0])
              .join('');

            return (
              <button
                key={member.name}
                type="button"
                className={`fantasy__legend-item ${isActive ? '' : 'is-muted'}`}
                onClick={() => toggleMember(member.name)}
                aria-pressed={isActive}
              >
                <span className="fantasy__avatar" style={{ borderColor: member.color }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      img.classList.add('is-loaded');
                      img.parentElement?.classList.add('has-image');
                    }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                    }}
                  />
                  <span className="fantasy__initials">{initials}</span>
                </span>

                <span className="fantasy__legend-name">{member.name}</span>
                <span
                  className="fantasy__hovercard"
                  style={{ borderColor: member.color }}
                  onClick={(e) => e.stopPropagation()}
                  aria-hidden="true"
                >
                  <span className="fantasy__hovercard-header">
                    <span className="fantasy__hovercard-avatar" style={{ borderColor: member.color }}>
                      <img
                        src={member.image}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="fantasy__hovercard-initials">{initials}</span>
                    </span>

                    <span className="fantasy__hovercard-title">
                      <span className="fantasy__hovercard-name">{member.name}</span>
                      <span className="fantasy__hovercard-sub">{stats.seasons} seasons</span>
                    </span>
                  </span>

                  <span className="fantasy__hovercard-stats">
                    <span className="fantasy__hovercard-stat">
                      <span className="fantasy__hovercard-stat-val">{stats.totalARSE}</span>
                      <span className="fantasy__hovercard-stat-lbl">total ARSE</span>
                    </span>
                    <span className="fantasy__hovercard-stat">
                      <span className="fantasy__hovercard-stat-val">{stats.avgARSE}</span>
                      <span className="fantasy__hovercard-stat-lbl">avg / season</span>
                    </span>
                    <span className="fantasy__hovercard-stat">
                      <span className="fantasy__hovercard-stat-val">{stats.avgPlacing}</span>
                      <span className="fantasy__hovercard-stat-lbl">avg place</span>
                    </span>
                  </span>

                  <span className="fantasy__hovercard-section fantasy__hovercard-section--winner">
                    <span className="fantasy__hovercard-label">Championships</span>
                    <span className="fantasy__chip-row">
                      {wins.length ? (
                        wins.map((y) => (
                          <span key={`${member.name}-w-${y}`} className="fantasy__chip fantasy__chip--winner">
                            {y}
                          </span>
                        ))
                      ) : (
                        <span className="fantasy__chip fantasy__chip--empty">—</span>
                      )}
                    </span>
                  </span>

                  <span className="fantasy__hovercard-section fantasy__hovercard-section--loser">
                    <span className="fantasy__hovercard-label">Toilet Bowls</span>
                    <span className="fantasy__chip-row">
                      {losses.length ? (
                        losses.map((y) => (
                          <span key={`${member.name}-l-${y}`} className="fantasy__chip fantasy__chip--loser">
                            {y}
                          </span>
                        ))
                      ) : (
                        <span className="fantasy__chip fantasy__chip--empty">—</span>
                      )}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FantasyFootball;
