'use client';
import { useContext } from 'react';
import uuid from 'react-uuid';
import { motion, AnimatePresence } from "../js/framer-motion/framer-motion.js";
import { FertilityCalculatorContext } from '../context/FertilityCalculatorContext';
import Label from './Label';

export default function Select() {
  const {
    value,
    setValue,
    showCalculation,
    isLoading,
    percent,
    selectMenus,
    calculateBtn,
    loadingText,
  } = useContext(FertilityCalculatorContext);

  const handleOnChange = (e) => {
    const valueSelected = e.target.value;
    setValue({
      ...value,
      [e.target.name]: valueSelected,
    });
  };

  const resetAllSelections = (e) => {
    e.preventDefault();
    setValue({
      optage: '0',
      optblasto: '0',
      optfsh: '0',
      optamh: '0',
      optattmpt: '0',
    });
  };

  const resetSelection = (e) => {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.dataset.selectName]: '0',
    });
  };

  return (
    <form>
      {selectMenus?.length > 0 && (
        <div className="selectors-container">
          {selectMenus.map((select, i) => (
            <div className="select" key={uuid()}>
              <Label
                headerTitle={select.Label}
                helpText={select.HelpText}
                id={select.Id}
                isLabel={true}
                rightAligned={false}
              />
              <div className="select__menu-btn-container">
                <div className="select__container">
                  <select
                    name={select.Name}
                    id={select.Id}
                    value={value[`${select.Name}`]}
                    onChange={handleOnChange}
                  >
                    {select.Options.map((option) => (
                      <option value={option.Value} key={uuid()}>
                        {option.Text}
                      </option>
                    ))}
                  </select>
                  <span className="select__arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25.965"
                      height="11.689"
                      viewBox="0 0 25.965 11.689"
                      role="none"
                    >
                      <path
                        id="Path_1604"
                        data-name="Path 1604"
                        d="M-3171.064-11880.769l-12.346,9.633-12.389-9.633"
                        transform="translate(3196.414 11881.558)"
                        fill="none"
                        stroke="#072342"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                </div>
                <button
                  data-select-name={select.Name}
                  onClick={resetSelection}
                  title={select.Label + ' Reset'}
                  aria-label={select.Label + ' Reset'}
                >
                  <span className="select__icon-reset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <defs>
                        <clipPath id="clipPath">
                          <rect
                            id="Rectangle_1701"
                            data-name="Rectangle 1701"
                            width="30"
                            height="30"
                            transform="translate(0 -0.26)"
                            fill="none"
                            stroke="#04cac7"
                            strokeWidth="1"
                          />
                        </clipPath>
                      </defs>
                      <g
                        id="Group_2657"
                        data-name="Group 2657"
                        transform="translate(-1000.311 -941.583)"
                      >
                        <g
                          id="Group_2543"
                          data-name="Group 2543"
                          transform="translate(1000.311 941.844)"
                        >
                          <g
                            id="Group_2496"
                            data-name="Group 2496"
                            clipPath="url(#clipPath)"
                          >
                            <path
                              id="Path_1480"
                              data-name="Path 1480"
                              d="M126.8,200.054a8.028,8.028,0,0,1-5.473-2.146l.842-.909a6.815,6.815,0,0,0,11.446-5h1.239A8.064,8.064,0,0,1,126.8,200.054Z"
                              transform="translate(-111.93 -177.13)"
                              fill="#04cac7"
                            />
                            <path
                              id="Path_1481"
                              data-name="Path 1481"
                              d="M107.972,232.258l-3.877-1.617.538,4.167Z"
                              transform="translate(-96.032 -212.779)"
                              fill="#04cac7"
                              stroke="#04cac7"
                              strokeWidth="1"
                            />
                            <path
                              id="Path_1482"
                              data-name="Path 1482"
                              d="M89.239,96.054H88a8.054,8.054,0,0,1,13.528-5.909l-.842.909a6.815,6.815,0,0,0-11.446,5Z"
                              transform="translate(-81.185 -81.185)"
                              fill="#04cac7"
                            />
                            <path
                              id="Path_1483"
                              data-name="Path 1483"
                              d="M229.84,102.109l3.877,1.617-.538-4.167Z"
                              transform="translate(-212.04 -91.849)"
                              fill="#04cac7"
                              stroke="#04cac7"
                              strokeWidth="1"
                            />
                            <path
                              id="Ellipse_34"
                              data-name="Ellipse 34"
                              d="M6.87-8A14.87,14.87,0,1,1-8,6.87,14.887,14.887,0,0,1,6.87-8Zm0,28.5A13.631,13.631,0,1,0-6.761,6.87,13.646,13.646,0,0,0,6.87,20.5Z"
                              transform="translate(8 8)"
                              fill="#072342"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ))}
          <div className="selectors__controls">
            <button onClick={resetAllSelections}>
              <span className="reset-text">Reset all</span>
              <span className="select__icon-reset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <defs>
                    <clipPath id="clipPath">
                      <rect
                        id="Rectangle_1701"
                        data-name="Rectangle 1701"
                        width="30"
                        height="30"
                        transform="translate(0 -0.26)"
                        fill="none"
                        stroke="#04cac7"
                        strokeWidth="1"
                      />
                    </clipPath>
                  </defs>
                  <g
                    id="Group_2657"
                    data-name="Group 2657"
                    transform="translate(-1000.311 -941.583)"
                  >
                    <g
                      id="Group_2543"
                      data-name="Group 2543"
                      transform="translate(1000.311 941.844)"
                    >
                      <g
                        id="Group_2496"
                        data-name="Group 2496"
                        clipPath="url(#clipPath)"
                      >
                        <path
                          id="Path_1480"
                          data-name="Path 1480"
                          d="M126.8,200.054a8.028,8.028,0,0,1-5.473-2.146l.842-.909a6.815,6.815,0,0,0,11.446-5h1.239A8.064,8.064,0,0,1,126.8,200.054Z"
                          transform="translate(-111.93 -177.13)"
                          fill="#04cac7"
                        />
                        <path
                          id="Path_1481"
                          data-name="Path 1481"
                          d="M107.972,232.258l-3.877-1.617.538,4.167Z"
                          transform="translate(-96.032 -212.779)"
                          fill="#04cac7"
                          stroke="#04cac7"
                          strokeWidth="1"
                        />
                        <path
                          id="Path_1482"
                          data-name="Path 1482"
                          d="M89.239,96.054H88a8.054,8.054,0,0,1,13.528-5.909l-.842.909a6.815,6.815,0,0,0-11.446,5Z"
                          transform="translate(-81.185 -81.185)"
                          fill="#04cac7"
                        />
                        <path
                          id="Path_1483"
                          data-name="Path 1483"
                          d="M229.84,102.109l3.877,1.617-.538-4.167Z"
                          transform="translate(-212.04 -91.849)"
                          fill="#04cac7"
                          stroke="#04cac7"
                          strokeWidth="1"
                        />
                        <path
                          id="Ellipse_34"
                          data-name="Ellipse 34"
                          d="M6.87-8A14.87,14.87,0,1,1-8,6.87,14.887,14.887,0,0,1,6.87-8Zm0,28.5A13.631,13.631,0,1,0-6.761,6.87,13.646,13.646,0,0,0,6.87,20.5Z"
                          transform="translate(8 8)"
                          fill="#072342"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </button>
            <button onClick={showCalculation} className="select__calculate-btn">
              <strong>{calculateBtn}</strong>
            </button>
            {isLoading && (
              <div className="overlay">
                <div className="overlay__loader">
                  <div className="overlay__loader-text">{loadingText}</div>
                  <div className="overlay__loader-container">
                    <AnimatePresence>
                      <motion.div
                        style={{ overflow: 'hidden' }}
                        initial={{ width: 0 }}
                        animate={{ width: percent }}
                        exit={{ width: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <div className="overlay__loader-progress-bar"></div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
