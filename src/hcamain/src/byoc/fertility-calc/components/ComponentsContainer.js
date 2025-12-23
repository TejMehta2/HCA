import { useContext } from 'react';
import Stats from './Stats';
import FormContainer from './FormContainer';
import Births from './Births';
import Headline from './Headline';
import { FertilityCalculatorContext } from '../context/FertilityCalculatorContext';
import { motion, AnimatePresence } from '../js/framer-motion/framer-motion.js';

export default function ComponentsContainer() {
  const {
    isError,
    isLoadingContent,
    percent,
    isServerError,
    serverErrorMsg,
    noResults,
    noResultsMsg,
    closeNoResults,
  } = useContext(FertilityCalculatorContext);

  return (
    <>
      {!isError && (
        <div>
          <Headline />
          <FormContainer />
          <Stats />
          <Births />
        </div>
      )}
      {isError && (
        <div>An error occured. Please try again or contact support.</div>
      )}
      {isLoadingContent && (
        <div className="overlay">
          <div className="overlay__loader">
            <div className="overlay__loader-text">Loading...</div>
            <div className="overlay__loader-container">
              <AnimatePresence>
                <motion.main
                  style={{ overflow: 'hidden' }}
                  initial={{ width: 0 }}
                  animate={{ width: percent }}
                  exit={{ width: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="overlay__loader-progress-bar"></div>
                </motion.main>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
      {isServerError && (
        <div className="overlay">
          <div className="overlay__loader">
            <div className="overlay__loader-text">{serverErrorMsg}</div>
          </div>
        </div>
      )}
      {noResults && (
        <div className="info-noresults">
          <div className="info-noresults__content">
            <div className="info-noresults__content-header">
              <button onClick={(e) => closeNoResults(e)}>
                <span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.295 7.115C18.6844 6.72564 18.6844 6.09436 18.295 5.705C17.9056 5.31564 17.2744 5.31564 16.885 5.705L12 10.59L7.115 5.705C6.72564 5.31564 6.09436 5.31564 5.705 5.705C5.31564 6.09436 5.31564 6.72564 5.705 7.115L10.59 12L5.705 16.885C5.31564 17.2744 5.31564 17.9056 5.705 18.295C6.09436 18.6844 6.72564 18.6844 7.115 18.295L12 13.41L16.885 18.295C17.2744 18.6844 17.9056 18.6844 18.295 18.295C18.6844 17.9056 18.6844 17.2744 18.295 16.885L13.41 12L18.295 7.115Z"
                      fill="#00B2AE"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="info-noresults__content-header-text">
              {noResultsMsg}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
