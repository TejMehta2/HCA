import { useContext, useEffect } from 'react';
import Select from './Select';
import Checkbox from './Checkbox';
import { IvfCalculatorContext } from '../context/IvfCalculatorContext';
import uuid from 'react-uuid';

const Form = () => {
  useEffect(() => {
    // scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const {
    costData,
    loading,
    cycleTypeVal,
    setCycleTypeVal,
    protocolType,
    setProtocolType,
    stimulationDrug,
    stimulationDrug2,
    setStimulationDrug,
    setStimulationDrug2,
    startingDose,
    startingDose2,
    setStartingDose,
    setStartingDose2,
    blastocystCulture,
    setBlastocystCulture,
    adjuvants,
    setAdjuvants,
    isDisabled,
    setIsDisabled,
    isProtocolType,
    setIsProtocolType,
    setTotalCost,
    setError,
    setIsCalculating,
    checkStatus,
    setCheckStatus,
    setCycleTypeCost,
    setProtocolTypeCost,
    setBlastocystCultureCost,
    setAdjuvantsCost,
    setProtocolNotes,
    setCycleNotes,
    setCycleTypeAdditionalDrugNotes,
    setCycleTypeAdditionalDrugNotes2,
    setBlastocystCultureNotes,
    setAdjuvantsNotes,
    setSelectedDrugNotes,
    setSelectedDrugNotes2,
    setSelectedDrugValue,
    setSelectedDrugValue2,
    setCycleCost,
    setDrug1Cost,
    setDrug2Cost,
    setAdjuvantsValuesPrint,
    calculatorHeading,
    cycleTypeLabel,
    blastocystCultureLabel,
    startingDoseLabel,
    startingDoseLabel2,
    protocolTypeLabel,
    stimulationDrugLabel,
    stimulationDrugLabel2,
    adjuvantsLabel,
    calculateButtonLabel,
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
  } = useContext(IvfCalculatorContext);

  const resetFields = () => {
    setProtocolType('');
    setStimulationDrug('');
    setStimulationDrug2('');
    setStartingDose('');
    setStartingDose2('');
    // HED-1660 - default charge for this
    setBlastocystCulture('Yes');
    setAdjuvants([]);
    setCheckStatus(
      new Array(Object.keys(costData.Adjuvants).length).fill(false)
    );
  };

  const showAllFields = () => {
    setIsProtocolType(true);
    setIsStimulationDrug(true);
    setIsStimulationDrug2(false);
    setIsStartingDrug(true);
    setIsStartingDrug2(false);
    setIsAdjuvants(true);

    // HED-1660 - default charge for this, hide field
    setBlastocystCulture('Yes');
    setIsBlastocyst(false);
  };

  const hideAllFields = () => {
    setIsProtocolType(false);
    setIsStimulationDrug(false);
    setIsStimulationDrug2(false);
    setIsStartingDrug(false);
    setIsStartingDrug2(false);
    setIsAdjuvants(false);
    setIsBlastocyst(false);
  };

  const handleChangecycleTypeVal = (e) => {
    setCycleTypeVal(e.target.value);
    // console.log(e.target.value);
    // each time the cycle changes, reset form, disable button
    resetFields();
    hideAllFields();
    setIsDisabled(true);

    // reset/ hide fields, hide summary when no cycle selection
    if (e.target.value === '') {
      setIsCalculating(false);
    } else if (e.target.value.startsWith('EggFreezing')) {
      // if egg freezing, show:
      // protocol
      // stimulation drug
      // starting doze
      setIsProtocolType(true);
      setIsStimulationDrug(true);
      setIsStimulationDrug2(true);
      setIsStartingDrug(true);
      setIsStartingDrug2(true);
      setIsBlastocyst(false);
      setIsAdjuvants(false);
      // HED-1660 - don't charge for this
      setBlastocystCulture('No');
    } else if (e.target.value === 'EggThaw') {
      // show
      setIsBlastocyst(true);
      setIsProtocolType(true);
      setIsAdjuvants(true);
      // hide
      setIsStimulationDrug(false);
      setIsStimulationDrug2(false);
      setIsStartingDrug(false);
      setIsStartingDrug2(false);
    } else if (
      e.target.value === 'EmbryoThaw' ||
      e.target.value === 'EggDonation'
    ) {
      // show
      setIsProtocolType(true);
      setIsAdjuvants(true);
      // hide
      setIsStimulationDrug(false);
      setIsStimulationDrug2(false);
      setIsStartingDrug(false);
      setIsStartingDrug2(false);
      if (e.target.value === 'EggDonation') {
        // HED-1670 include 1a the £999 supplementary embryology services fee
        // show/set advanced
        setBlastocystCulture('Yes');
      } else {
        // HED-1660 - don't charge for this
        setBlastocystCulture('No');
      }
      // hide
      setIsBlastocyst(false);
    } else {
      showAllFields();
    }
  };

  const handleChangeProtocolType = (e) => {
    setProtocolType(e.target.value);
    // console.log(e.target.value);
    if (cycleTypeVal.startsWith('EggFreezing')) {
      if (
        e.target.value.length > 0 &&
        stimulationDrug.length > 0 &&
        startingDose.length > 0
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (cycleTypeVal === 'EggThaw') {
      if (
        e.target.value.length > 0 &&
        blastocystCulture.length > 0 &&
        cycleTypeVal.length > 0
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (
      cycleTypeVal === 'EmbryoThaw' ||
      cycleTypeVal === 'EggDonation'
    ) {
      if (e.target.value.length > 0) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else {
      if (
        e.target.value.length > 0 &&
        stimulationDrug.length > 0 &&
        startingDose.length > 0 &&
        blastocystCulture.length > 0 &&
        cycleTypeVal.length > 0
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  };

  const handleChangeStimulationDrug = (e) => {
    // console.log(e.target.value);
    setStimulationDrug(e.target.value);

    if (cycleTypeVal.startsWith('EggFreezing')) {
      if (
        e.target.value.length > 0 &&
        startingDose.length > 0 &&
        protocolType.length > 0 &&
        cycleTypeVal.length > 0
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (
      e.target.value.length > 0 &&
      protocolType.length > 0 &&
      startingDose.length > 0 &&
      blastocystCulture.length > 0 &&
      cycleTypeVal.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChangeStimulationDrug2 = (e) => {
    // console.log(e.target.value);
    setStimulationDrug2(e.target.value);

    /*
    if (cycleTypeVal === 'EggFreezing') {
      if (
        e.target.value.length > 0 &&
        startingDose.length > 0 &&
        protocolType.length > 0 &&
        cycleTypeVal.length > 0
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (
      e.target.value.length > 0 &&
      protocolType.length > 0 &&
      startingDose.length > 0 &&
      blastocystCulture.length > 0 &&
      cycleTypeVal.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }*/
  };

  const handleChangeStartingDose = (e) => {
    // console.log(e.target.value);
    setStartingDose(e.target.value);

    if (e.target.value.length > 0) {
      setIsStimulationDrug2(true);
      setIsStartingDrug2(true);
    } else {
      // hide and zero out second drug option HED-1668
      setIsStimulationDrug2(false);
      setIsStartingDrug2(false);
      setStimulationDrug2('');
      setStartingDose2('');
    }

    if (cycleTypeVal.startsWith('EggFreezing')) {
      if (
        e.target.value.length > 0 &&
        stimulationDrug.length > 0 &&
        protocolType.length > 0 &&
        cycleTypeVal.length > 0
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (
      e.target.value.length > 0 &&
      protocolType.length > 0 &&
      stimulationDrug.length > 0 &&
      blastocystCulture.length > 0 &&
      cycleTypeVal.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChangeStartingDose2 = (e) => {
    // console.log(e.target.value);
    setStartingDose2(e.target.value);

    /*
    if (cycleTypeVal === 'EggFreezing') {
      if (
        e.target.value.length > 0 &&
        stimulationDrug2.length > 0 &&
        protocolType.length > 0 &&
        cycleTypeVal.length > 0
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (
      e.target.value.length > 0 &&
      protocolType.length > 0 &&
      stimulationDrug2.length > 0 &&
      blastocystCulture.length > 0 &&
      cycleTypeVal.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }*/
  };

  const handleChangeBlastocystCulture = (e) => {
    // console.log(e.target.value);
    setBlastocystCulture(e.target.value);

    if (cycleTypeVal === 'EggThaw') {
      if (e.target.value.length > 0) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (
      e.target.value.length > 0 &&
      protocolType.length > 0 &&
      stimulationDrug.length > 0 &&
      startingDose.length > 0 &&
      cycleTypeVal.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChangeAdjuvants = (position) => {
    let values = [];
    let valuesLabels = [];
    const updateChecketState = checkStatus.map((item, index) =>
      index === position ? !item : item
    );
    // console.log(updateChecketState);
    setCheckStatus(updateChecketState);

    updateChecketState.forEach((item, index) => {
      if (item === true) {
        // console.log(costData.Adjuvants[Object.keys(costData.Adjuvants)[index]].Value);
        valuesLabels.push(
          costData.Adjuvants[Object.keys(costData.Adjuvants)[index]].Value
        );
        values.push(Object.keys(costData.Adjuvants)[index]);
      }
    });

    // console.log(values);
    // console.log(valuesLabels);
    setAdjuvants(values);
    setAdjuvantsValuesPrint(valuesLabels);
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    setIsCalculating(true);

    // figure costs
    const cycleTypeCostCalc =
      cycleTypeVal.length > 0
        ? parseFloat(costData['CycleType'][cycleTypeVal].Cost)
        : 0;
    setCycleTypeCost(cycleTypeCostCalc);

    // multiplier lookups - James request 2025-11-11
    // Advanced embryology / blastocystCulture / supplementaryMultiplier cost
    let supplementaryMultiplier =
      parseFloat(
        costData['CycleType'][cycleTypeVal]?.SupplementaryMultiplier
      ) ?? 1.0;
    if (isNaN(supplementaryMultiplier)) supplementaryMultiplier = 1.0;
    let bloodsMultiplier =
      parseFloat(costData['CycleType'][cycleTypeVal]?.BloodsMultiplier) ?? 1.0;
    if (isNaN(bloodsMultiplier)) bloodsMultiplier = 1.0;
    let medicationMultiplier =
      parseFloat(costData['CycleType'][cycleTypeVal]?.MedicationMultiplier) ??
      1.0;
    if (isNaN(medicationMultiplier)) medicationMultiplier = 1.0;

    //console.log("supplementary multiplier", supplementaryMultiplier);
    //console.log("bloods multiplier", bloodsMultiplier);
    //console.log("medication multiplier", medicationMultiplier);

    // console.log("cycle cost", cycleTypeCostCalc);
    const protocolTypeCostCalc =
      protocolType.length > 0
        ? parseFloat(costData['ProtocolType'][protocolType].Cost) *
          bloodsMultiplier
        : 0;
    setProtocolTypeCost(protocolTypeCostCalc);
    // added 16/02 feedback from James
    const additionalProtocolDrugCost =
      protocolType.length > 0
        ? parseFloat(costData['ProtocolType'][protocolType].AdditionalDrugCost)
        : 0;
    //console.log("additional protocol drug cost", additionalProtocolDrugCost);
    const blastocystCultureCostCalc =
      (blastocystCulture.length > 0
        ? parseFloat(costData['BlastocystCulture'][blastocystCulture].Cost)
        : 0) * supplementaryMultiplier;
    setBlastocystCultureCost(blastocystCultureCostCalc);
    // console.log("blastocyst culture cost", blastocystCultureCostCalc);
    // multi-select
    let adjuvantsCostCalc = 0.0;

    adjuvants.forEach((key) => {
      if (key !== '') {
        let cost = parseFloat(costData['Adjuvants'][key].Cost);
        adjuvantsCostCalc += cost;
      }
    });
    // console.log('adjuvants cost', adjuvantsCostCalc);
    setAdjuvantsCost(adjuvantsCostCalc);

    // combi key - this is a lookup table in the data that combines the three keys to make a cost
    let cyclePrice = 0.0;
    let cyclePrice2 = 0.0;
    let selectedDrugValue = '';
    let selectedDrugValue2 = '';
    if (
      stimulationDrug.length > 0 &&
      protocolType.length > 0 &&
      startingDose.length > 0
    ) {
      try {
        cyclePrice = parseFloat(
          costData['CyclePrice'][stimulationDrug + protocolType + startingDose]
            .Cost
        );
        // figure drug text
        selectedDrugValue =
          costData['CyclePrice'][stimulationDrug + protocolType + startingDose]
            .Value;
        // console.log('cycle price', cyclePrice);
        // console.log('selected drug value', selectedDrugValue);

        // drug 2 option
        cyclePrice2 = parseFloat(
          costData['CyclePrice'][
            stimulationDrug2 + protocolType + startingDose2
          ].Cost
        );
        // figure drug text 2
        selectedDrugValue2 =
          costData['CyclePrice'][
            stimulationDrug2 + protocolType + startingDose2
          ].Value;
        //console.log('cycle price 2', cyclePrice2);
        //console.log('selected drug value 2', selectedDrugValue2);
      } catch (e) {
        setError('cycle price not in lookup table!');
        // console.log("cycle price not in lookup table!");
      }
    }

    setDrug1Cost(
      (cyclePrice + additionalProtocolDrugCost) * medicationMultiplier
    );
    setDrug2Cost(cyclePrice2 * medicationMultiplier);
    setCycleCost(
      (cyclePrice + additionalProtocolDrugCost + cyclePrice2) *
        medicationMultiplier
    );
    setSelectedDrugValue(selectedDrugValue);
    setSelectedDrugValue2(selectedDrugValue2);

    let totalCalculation =
      cyclePrice +
      cyclePrice2 +
      cycleTypeCostCalc +
      protocolTypeCostCalc +
      blastocystCultureCostCalc +
      adjuvantsCostCalc +
      additionalProtocolDrugCost;
    setTotalCost(totalCalculation.toFixed(2));

    // cycle type notes
    let cycleTypeNotes = '';
    if (cycleTypeVal.length > 0) {
      cycleTypeNotes = costData['CycleType'][cycleTypeVal].Notes;
      if (cycleTypeNotes === null) {
        cycleTypeNotes = '';
      }
    }
    // console.log('cycle Type Notes -->', cycleTypeNotes);
    setCycleNotes(cycleTypeNotes);

    // cycle type additional drug notes
    let cycleTypeAdditionalDrugNotes = '';
    if (cycleTypeVal.length > 0) {
      cycleTypeAdditionalDrugNotes =
        costData['CycleType'][cycleTypeVal].AdditionalDrugNotes;
      if (cycleTypeAdditionalDrugNotes === null) {
        cycleTypeAdditionalDrugNotes = '';
      }
    }
    //console.log('cycle Type Additional Drug Notes -->', cycleTypeAdditionalDrugNotes);
    setCycleTypeAdditionalDrugNotes(cycleTypeAdditionalDrugNotes);

    // cycle type additional drug notes
    let cycleTypeAdditionalDrugNotes2 = '';
    if (cycleTypeVal.length > 0) {
      cycleTypeAdditionalDrugNotes2 =
        costData['CycleType'][cycleTypeVal].AdditionalDrugNotes;
      if (cycleTypeAdditionalDrugNotes === null) {
        cycleTypeAdditionalDrugNotes2 = '';
      }
    }
    //console.log('cycle Type Additional Drug Notes 2 -->', cycleTypeAdditionalDrugNotes2);
    setCycleTypeAdditionalDrugNotes2(cycleTypeAdditionalDrugNotes2);

    // protocol notes
    let protocolNotesCalc = '';
    if (protocolType.length > 0) {
      if (protocolNotesCalc === null) {
        protocolNotesCalc = '';
      } else {
        protocolNotesCalc = costData['ProtocolType'][protocolType].Notes;
      }
    }
    // console.log('protocol notes -->', protocolNotesCalc);
    setProtocolNotes(protocolNotesCalc);

    // drug notes
    var drugNotes = '';
    if (startingDose.length > 0) {
      if (drugNotes === null) {
        drugNotes = '';
      } else {
        drugNotes = costData['StartingDose'][startingDose].Notes;
      }
    }
    // console.log('selected drugs notes -->', drugNotes);
    setSelectedDrugNotes(drugNotes);

    // drug notes 2
    var drugNotes2 = '';
    if (startingDose2.length > 0) {
      if (drugNotes2 === null) {
        drugNotes2 = '';
      } else {
        drugNotes2 = costData['StartingDose'][startingDose2].Notes;
      }
    }
    //console.log('selected drugs notes 2 -->', drugNotes2);
    setSelectedDrugNotes2(drugNotes2);

    // blastocyst culture notes
    let blastocystCultureNotes = '';
    if (blastocystCulture.length > 0) {
      blastocystCultureNotes =
        costData['BlastocystCulture'][blastocystCulture].Notes;
      if (blastocystCultureNotes === null) {
        blastocystCultureNotes = '';
      }
    }
    // console.log('blastocyst Culture Notes -->', blastocystCultureNotes);
    setBlastocystCultureNotes(blastocystCultureNotes);

    // adjuvants notes
    let adjuvantsNotes = '';
    adjuvants.forEach((key) => {
      if (key !== '') {
        let note = costData['Adjuvants'][key].Notes;
        if (note !== null) {
          adjuvantsNotes += note;
        }
      }
    });
    // console.log('adjuvants Notes --->', adjuvantsNotes);
    setAdjuvantsNotes(adjuvantsNotes);
  };

  return (
    <div className="ivf-calculator-form">
      {!loading && Object.keys(costData).length > 0 && (
        <form onSubmit={handleSubmit}>
          <h1>{costData?.Title?.Title?.Notes}</h1>
          <p className="ivf-calculator-intro">{calculatorHeading}</p>
          {/* Cycle type select */}
          <Select
            name={'cycleType'}
            id={'cycleType'}
            label={cycleTypeLabel}
            data={costData.CycleType}
            value={cycleTypeVal}
            onChange={handleChangecycleTypeVal}
          />
          {/* Cycle type select */}
          {
            // Protocol Type select
            isProtocolType && (
              <div className="ivf-calculator-input">
                <div className="ivf-calculator-input__select">
                  <label
                    className="ivf-calculator-input__select-label"
                    htmlFor="protocolType"
                  >
                    {protocolTypeLabel}
                  </label>
                  <div className="ivf-calculator-input__select-container">
                    <select
                      name="protocolType"
                      id="protocolType"
                      className="ivf-calculator-input__select-menu g-select__menu"
                      onChange={handleChangeProtocolType}
                      value={protocolType}
                    >
                      <option value="">Please select</option>
                      {/* If EggThaw or EmbryoThaw are selected, hide first 2 options from protocol */}
                      {(cycleTypeVal === 'EggThaw' ||
                        cycleTypeVal === 'EmbryoThaw' ||
                        cycleTypeVal === 'EggDonation') &&
                        Object.keys(costData.ProtocolType)
                          .filter(
                            (item) => item !== 'Long' && item !== 'Antagonist'
                          )
                          .map(function (key) {
                            return (
                              <option key={uuid()} value={key}>
                                {costData.ProtocolType[key].Value}
                              </option>
                            );
                          })}
                      {/* If IVF, ICSI or IMSI are selected, hide Thaw options from protocol */}
                      {cycleTypeVal !== 'EggThaw' &&
                        cycleTypeVal !== 'EmbryoThaw' &&
                        cycleTypeVal !== 'EggDonation' &&
                        Object.keys(costData.ProtocolType)
                          .filter(
                            (item) =>
                              item !== 'MedicatedThawCycle' &&
                              item !== 'NaturalThawCycle'
                          )
                          .map(function (key) {
                            return (
                              <option key={uuid()} value={key}>
                                {costData.ProtocolType[key].Value}
                              </option>
                            );
                          })}
                    </select>
                    <span className="ivf-calculator-input__select-arrow">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.26906 0.209435L5.98337 5.06956L10.7317 0.209435C11.3645 -0.457416 12.4405 0.622131 11.8077 1.28946L6.42757 6.81451C6.20595 7.03696 5.7943 7.06867 5.57268 6.84622L0.191593 1.28946C-0.441195 0.622613 0.634832 -0.457415 1.26762 0.209435L1.26906 0.209435Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            )
          }

          {/* Stimulation Drug select */}
          {isStimulationDrug && (
            <Select
              name={'stimulationDrug'}
              id={'stimulationDrug'}
              label={stimulationDrugLabel}
              data={costData.StimulationDrug}
              value={stimulationDrug}
              onChange={handleChangeStimulationDrug}
            />
          )}
          {/* Stimulation Drug select */}

          {/* Starting Dose select */}
          {isStartingDrug && (
            <Select
              name={'startingDose'}
              id={'startingDose'}
              label={startingDoseLabel}
              data={costData.StartingDose}
              value={startingDose}
              onChange={handleChangeStartingDose}
            />
          )}
          {/* Starting Dose select */}

          {/* Stimulation Drug 2 select */}
          {isStimulationDrug2 && (
            <Select
              name={'stimulationDrug2'}
              id={'stimulationDrug2'}
              label={stimulationDrugLabel2 + ' 2 (optional)'}
              data={costData.StimulationDrug}
              value={stimulationDrug2}
              onChange={handleChangeStimulationDrug2}
            />
          )}
          {/* Stimulation Drug 2 select */}

          {/* Starting Dose 2 select */}
          {isStartingDrug2 && (
            <Select
              name={'startingDose2'}
              id={'startingDose2'}
              label={startingDoseLabel2 + ' 2 (optional)'}
              data={costData.StartingDose}
              value={startingDose2}
              onChange={handleChangeStartingDose2}
            />
          )}
          {/* Starting Dose 2 select */}

          {/* Blastocyst Culture select */}
          {isBlastocyst && (
            <Select
              name={'blastocystCulture'}
              id={'blastocystCulture'}
              label={blastocystCultureLabel}
              data={costData.BlastocystCulture}
              value={blastocystCulture}
              onChange={handleChangeBlastocystCulture}
            />
          )}
          {/* Blastocyst Culture select */}

          {/* Adjuvants checkboxes */}
          {isAdjuvants && (
            <div>
              <label
                htmlFor="adjuvants"
                className="ivf-calculator-checkbox__group-label"
              >
                {adjuvantsLabel}
              </label>
              <br></br>
              {Object.keys(costData.Adjuvants).map(function (key, index) {
                return (
                  <Checkbox
                    key={uuid()}
                    label={costData.Adjuvants[key].Value}
                    id={key}
                    value={key}
                    checked={checkStatus[index]}
                    onChange={() => handleChangeAdjuvants(index)}
                  />
                );
              })}
            </div>
          )}
          {/* Adjuvants checkboxes */}

          <br></br>
          <button
            className={`ivf-calculator__btn ${
              isDisabled ? 'ivf-calculator__btn--disabled' : ''
            }`}
            disabled={isDisabled ? 'disabled' : ''}
          >
            {calculateButtonLabel}
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
