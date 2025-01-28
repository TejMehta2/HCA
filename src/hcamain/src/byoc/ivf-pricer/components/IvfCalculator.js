import { useContext } from 'react';
import Form from './Form';
import Summary from './Summary';
import loader from '../images/loading.gif';
import { IvfCalculatorContext } from '../context/IvfCalculatorContext';
let loaderImg;

/*
// change path of image based on enviroment variable
if (process.env.NODE_ENV === 'production') {
    loaderImg = `/static/react/ivf${loader}`;
} else {
    loaderImg = loader;
}*/

loaderImg = loader;
//console.log('loaderImg',loaderImg);
const IvfCalculator = () => {
  const { loading, errorData, costData } = useContext(IvfCalculatorContext);

  return (
    <div>
      {loading && (
        <div className="ivf-calculator__loader">
          <div className="ivf-calculator__loader-content">
            <img src={loaderImg.src} alt="loader" width="40" height="40" />
            Loading...
          </div>
        </div>
      )}
      {!loading && !errorData && Object.keys(costData).length > 0 && (
        <div className="ivf-calculator-wrapper">
          <Form />
          <Summary />
        </div>
      )}
      {errorData && <p>There was an error, please try again.</p>}
    </div>
  );
};

export default IvfCalculator;
