import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const IvfCalculatorContext = createContext();

const IvfCalculatorContextProvider = ({ children }) => {
  const [costData, setCostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState(false);
  // selections variables
  const [cycleTypeVal, setCycleTypeVal] = useState('');
  const [protocolType, setProtocolType] = useState('');
  const [stimulationDrug, setStimulationDrug] = useState('');
  const [stimulationDrug2, setStimulationDrug2] = useState('');
  const [startingDose, setStartingDose] = useState('');
  const [startingDose2, setStartingDose2] = useState('');
  const [blastocystCulture, setBlastocystCulture] = useState('');
  const [adjuvants, setAdjuvants] = useState([]);
  const [adjuvantsValuesPrint, setAdjuvantsValuesPrint] = useState([]);
  const [selectedDrugValue, setSelectedDrugValue] = useState('');
  const [selectedDrugValue2, setSelectedDrugValue2] = useState('');
  // helpers variables
  const [isDisabled, setIsDisabled] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  // conditional variables to show fields
  const [isProtocolType, setIsProtocolType] = useState(false);
  const [isStartingDrug, setIsStartingDrug] = useState(false);
  const [isStartingDrug2, setIsStartingDrug2] = useState(false);
  const [isStimulationDrug, setIsStimulationDrug] = useState(false);
  const [isStimulationDrug2, setIsStimulationDrug2] = useState(false);
  const [isBlastocyst, setIsBlastocyst] = useState(false);
  const [isAdjuvants, setIsAdjuvants] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [checkStatus, setCheckStatus] = useState([]);
  // costs variables
  const [cycleTypeCost, setCycleTypeCost] = useState(0);
  const [cycleCost, setCycleCost] = useState(0);
  const [drug1Cost, setDrug1Cost] = useState(0);
  const [drug2Cost, setDrug2Cost] = useState(0);
  const [protocolTypeCost, setProtocolTypeCost] = useState(0);
  const [blastocystCultureCost, setBlastocystCultureCost] = useState(0);
  const [adjuvantsCost, setAdjuvantsCost] = useState(0);
  // notes variables
  const [protocolNotes, setProtocolNotes] = useState('');
  const [cycleNotes, setCycleNotes] = useState('');
  const [cycleTypeAdditionalDrugNotes, setCycleTypeAdditionalDrugNotes] =
    useState('');
  const [cycleTypeAdditionalDrugNotes2, setCycleTypeAdditionalDrugNotes2] =
    useState('');
  const [blastocystCultureNotes, setBlastocystCultureNotes] = useState('');
  const [startingDoseNotes, setStartingDoseNotes] = useState('');
  const [adjuvantsNotes, setAdjuvantsNotes] = useState(0);
  const [selectedDrugNotes, setSelectedDrugNotes] = useState('');
  const [selectedDrugNotes2, setSelectedDrugNotes2] = useState('');
  const [introPDF, setIntroPDF] = useState('');
  // calculator heading
  const [calculatorHeading, setCalculatorHeading] = useState('');
  // labels
  const [cycleTypeLabel, setCycleTypeLabel] = useState('');
  const [blastocystCultureLabel, setBlastocystCultureLabel] = useState('');
  const [startingDoseLabel, setStartingDoseLabel] = useState('');
  const [startingDoseLabel2, setStartingDoseLabel2] = useState('');
  const [protocolTypeLabel, setProtocolTypeLabel] = useState('');
  const [stimulationDrugLabel, setStimulationDrugLabel] = useState('');
  const [stimulationDrugLabel2, setStimulationDrugLabel2] = useState('');
  const [adjuvantsLabel, setAdjuvantsLabel] = useState('');
  const [drugPriceLabel, setDrugPriceLabel] = useState('');
  const [calculateButtonLabel, setCalculateButtonLabel] = useState('');

  // change host based on enviroment variable
  /*   let urlHost;
  if (process.env.NODE_ENV === 'production') {
    urlHost = window.location.origin;
  } else {
    urlHost = 'https://forms.hcahealthcare.co.uk';
  } */

  const urlHost = '';

  useEffect(() => {
    // get data
    // legacy https://forms.hcahealthcare.co.uk/lookupApi/IVFCostCalculator/default/findbydictionaryasobject/Costs
    // candidate api/lookupAPI/IVFCostCalculator/default/findbydictionaryasobjectnolegacy/Costs
    axios
      .get(
        `${urlHost}/api/lookupAPI/IVFCostCalculator/default/findbydictionaryasobjectnolegacy/Costs`
      )
      .then((response) => {
        setLoading(false);
        setCostData(response.data);
        let test = new Array(Object.keys(response.data.Adjuvants).length).fill(
          false
        );
        setCheckStatus(test);
        setIntroPDF(response.data?.Introduction?.Introduction?.Notes || '');
        setCalculatorHeading(
          response.data?.CalculatorHeading?.CalculatorHeading?.Notes || ''
        );
        setCycleTypeLabel(response.data?.Label?.CycleType?.Label || '');
        setBlastocystCultureLabel(
          response.data?.Label?.BlastocystCulture?.Label || ''
        );
        setStartingDoseLabel(response.data?.Label?.StartingDose?.Label || '');
        setStartingDoseLabel2(response.data?.Label?.StartingDose?.Label || '');
        setProtocolTypeLabel(response.data?.Label?.ProtocolType?.Label || '');
        setStimulationDrugLabel(
          response.data?.Label?.StimulationDrug?.Label || ''
        );
        setStimulationDrugLabel2(
          response.data?.Label?.StimulationDrug?.Label || ''
        );
        setAdjuvantsLabel(response.data?.Label?.Adjuvants?.Label || '');
        setDrugPriceLabel(response.data?.Label?.DrugPrice?.Label || '');
        setCalculateButtonLabel(
          response.data?.Label?.CalculateButton?.Label || ''
        );
      })
      .catch((error) => {
        setLoading(false);
        setErrorData(true);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <IvfCalculatorContext.Provider
      value={{
        urlHost,
        costData,
        setCostData,
        loading,
        setLoading,
        cycleTypeVal,
        setCycleTypeVal,
        protocolType,
        setProtocolType,
        stimulationDrug,
        setStimulationDrug,
        stimulationDrug2,
        setStimulationDrug2,
        startingDose,
        setStartingDose,
        startingDose2,
        setStartingDose2,
        blastocystCulture,
        setBlastocystCulture,
        adjuvants,
        setAdjuvants,
        isDisabled,
        setIsDisabled,
        isProtocolType,
        setIsProtocolType,
        totalCost,
        setTotalCost,
        error,
        setError,
        isCalculating,
        setIsCalculating,
        checkStatus,
        setCheckStatus,
        cycleTypeCost,
        setCycleTypeCost,
        protocolTypeCost,
        setProtocolTypeCost,
        blastocystCultureCost,
        setBlastocystCultureCost,
        adjuvantsCost,
        setAdjuvantsCost,
        protocolNotes,
        setProtocolNotes,
        startingDoseNotes,
        setStartingDoseNotes,
        cycleNotes,
        setCycleNotes,
        cycleTypeAdditionalDrugNotes,
        setCycleTypeAdditionalDrugNotes,
        cycleTypeAdditionalDrugNotes2,
        setCycleTypeAdditionalDrugNotes2,
        blastocystCultureNotes,
        setBlastocystCultureNotes,
        adjuvantsNotes,
        setAdjuvantsNotes,
        selectedDrugNotes,
        setSelectedDrugNotes,
        selectedDrugNotes2,
        setSelectedDrugNotes2,
        cycleCost,
        setCycleCost,
        drug1Cost,
        setDrug1Cost,
        drug2Cost,
        setDrug2Cost,
        selectedDrugValue,
        setSelectedDrugValue,
        selectedDrugValue2,
        setSelectedDrugValue2,
        adjuvantsValuesPrint,
        setAdjuvantsValuesPrint,
        introPDF,
        calculatorHeading,
        cycleTypeLabel,
        blastocystCultureLabel,
        startingDoseLabel,
        startingDoseLabel2,
        protocolTypeLabel,
        stimulationDrugLabel,
        stimulationDrugLabel2,
        adjuvantsLabel,
        drugPriceLabel,
        calculateButtonLabel,
        errorData,
        isStartingDrug,
        setIsStartingDrug,
        isStartingDrug2,
        setIsStartingDrug2,
        isStimulationDrug,
        setIsStimulationDrug,
        isStimulationDrug2,
        setIsStimulationDrug2,
        isBlastocyst,
        setIsBlastocyst,
        isAdjuvants,
        setIsAdjuvants,
      }}
    >
      {children}
    </IvfCalculatorContext.Provider>
  );
};

export default IvfCalculatorContextProvider;
