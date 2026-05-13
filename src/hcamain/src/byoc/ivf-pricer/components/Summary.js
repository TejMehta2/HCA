import { useContext } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
// import IntroImg from '../images/intro.jpg';
import PdfDoc from './PdfDoc';
import { IvfCalculatorContext } from '../context/IvfCalculatorContext';

const Summary = () => {
  const {
    urlHost,
    costData,
    totalCost,
    cycleTypeCost,
    protocolTypeCost,
    blastocystCultureCost,
    adjuvantsCost,
    isCalculating,
    setIsCalculating,
    cycleTypeVal,
    setTotalCost,
    setCycleTypeCost,
    setProtocolTypeCost,
    setBlastocystCultureCost,
    setAdjuvantsCost,
    setCycleTypeVal,
    setProtocolType,
    setStimulationDrug,
    setStartingDose,
    setBlastocystCulture,
    setAdjuvants,
    setIsDisabled,
    setIsProtocolType,
    setCheckStatus,
    protocolNotes,
    selectedDrugValue,
    selectedDrugValue2,
    cycleNotes,
    cycleTypeAdditionalDrugNotes,
    cycleTypeAdditionalDrugNotes2,
    blastocystCultureNotes,
    adjuvantsNotes,
    selectedDrugNotes,
    selectedDrugNotes2,
    cycleCost,
    drug1Cost,
    drug2Cost,
    protocolType,
    blastocystCulture,
    adjuvantsValuesPrint,
    introPDF,
    protocolTypeLabel,
    cycleTypeLabel,
    blastocystCultureLabel,
    adjuvantsLabel,
    drugPriceLabel,
    setIsStartingDrug,
    setIsStartingDrug2,
    setIsStimulationDrug,
    setIsStimulationDrug2,
    setIsBlastocyst,
    setIsAdjuvants,
  } = useContext(IvfCalculatorContext);

  const resetCalculator = () => {
    setCycleTypeCost(0);
    setProtocolTypeCost(0);
    setBlastocystCultureCost(0);
    setAdjuvantsCost(0);
    setTotalCost(0);
    setCycleTypeVal('');
    setProtocolType('');
    setStimulationDrug('');
    setStartingDose('');
    setBlastocystCulture('');
    setAdjuvants([]);
    setCheckStatus(
      new Array(Object.keys(costData.Adjuvants).length).fill(false)
    );
    setIsDisabled(true);
    setIsProtocolType(false);
    setIsStartingDrug(false);
    setIsStimulationDrug(false);
    setIsStartingDrug2(false);
    setIsStimulationDrug2(false);
    setIsBlastocyst(false);
    setIsAdjuvants(false);
    setIsCalculating(false);
    // scroll to the top of the page
    window.scrollTo(0, 0);
  };

  return (
    <div className="ivf-calculator-summary">
      {isCalculating && (
        <div className="ivf-calculator-summary-box">
          {/* <div className="ivf-calculator-summary-box-headline">
                        <h3>{costData?.SummaryLabel?.Heading?.Label}</h3>
                        <p className="ivf-calculator-summary-box-total">£{totalCost}</p>
                    </div> */}
          <div className="ivf-calculator-summary-box-costs">
            <div className="ivf-calculator-summary-box-costs-row">
              <div className="ivf-calculator-summary-box-costs-col ivf-calculator-summary-box-costs-col--left">
                <p>{costData?.SummaryLabel?.CycleCost?.Label}</p>
              </div>
              <div className="ivf-calculator-summary-box-costs-col">
                <p>£{cycleTypeCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="ivf-calculator-summary-box-costs-row">
              <div className="ivf-calculator-summary-box-costs-col ivf-calculator-summary-box-costs-col--left">
                <p>{costData?.SummaryLabel?.ProtocolCost?.Label}</p>
              </div>
              <div className="ivf-calculator-summary-box-costs-col">
                <p>£{protocolTypeCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="ivf-calculator-summary-box-costs-row">
              <div className="ivf-calculator-summary-box-costs-col ivf-calculator-summary-box-costs-col--left">
                <p>{costData?.SummaryLabel?.BlastocystCultureCost?.Label}</p>
              </div>
              <div className="ivf-calculator-summary-box-costs-col">
                <p>£{blastocystCultureCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="ivf-calculator-summary-box-costs-row">
              <div className="ivf-calculator-summary-box-costs-col ivf-calculator-summary-box-costs-col--left">
                <p>{costData?.SummaryLabel?.AdjuvantsCost?.Label}</p>
              </div>
              <div className="ivf-calculator-summary-box-costs-col">
                <p>£{adjuvantsCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="ivf-calculator-summary-box-costs-row">
              <div className="ivf-calculator-summary-box-costs-col ivf-calculator-summary-box-costs-col--left">
                <p>{costData?.SummaryLabel?.CycleDrugCost?.Label}</p>
              </div>
              <div className="ivf-calculator-summary-box-costs-col">
                <p>£{cycleCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="ivf-calculator-summary-box-costs-row ivf-calculator-summary-box-costs-row--total">
              <div className="ivf-calculator-summary-box-costs-col ivf-calculator-summary-box-costs-col--left ivf-calculator-summary-box-costs-col--total">
                <p className="ivf-calculator-summary-box-costs-col-total-headline">
                  {costData?.SummaryLabel?.Heading?.Label}
                </p>
              </div>
              <div className="ivf-calculator-summary-box-costs-col ivf-calculator-summary-box-costs-col--total">
                <p className="ivf-calculator-summary-box-costs-col-total">
                  £{totalCost}
                </p>
              </div>
            </div>
          </div>

          <div>
            <PDFDownloadLink
              document={
                <PdfDoc
                  totalCost={totalCost}
                  cycleTypeCost={cycleTypeCost}
                  protocolTypeCost={protocolTypeCost}
                  blastocystCultureCost={blastocystCultureCost}
                  adjuvantsCost={adjuvantsCost}
                  protocolNotes={protocolNotes}
                  cycleNotes={cycleNotes}
                  cycleTypeAdditionalDrugNotes={cycleTypeAdditionalDrugNotes}
                  cycleTypeAdditionalDrugNotes2={cycleTypeAdditionalDrugNotes2}
                  blastocystCultureNotes={blastocystCultureNotes}
                  adjuvantsNotes={adjuvantsNotes}
                  selectedDrugNotes={selectedDrugNotes}
                  selectedDrugNotes2={selectedDrugNotes2}
                  cycleCost={cycleCost}
                  drug1Cost={drug1Cost}
                  drug2Cost={drug2Cost}
                  cycleTypeVal={cycleTypeVal}
                  protocolType={protocolType}
                  blastocystCulture={blastocystCulture}
                  selectedDrugValue={selectedDrugValue}
                  selectedDrugValue2={selectedDrugValue2}
                  adjuvants={adjuvantsValuesPrint}
                  introPDF={introPDF}
                  protocolTypeLabel={protocolTypeLabel}
                  cycleTypeLabel={cycleTypeLabel}
                  blastocystCultureLabel={blastocystCultureLabel}
                  adjuvantsLabel={adjuvantsLabel}
                  drugPriceLabel={drugPriceLabel}
                  urlHost={urlHost}
                  hcaLogo={costData?.Image?.HCALogoPDF2x?.Value}
                  pdfTitle={costData?.PDFLabel?.PDFTableHeading?.Label}
                  pdfTableColumn1Heading={
                    costData?.PDFLabel?.PDFTableColumn1Heading?.Label
                  }
                  pdfTableColumn2Heading={
                    costData?.PDFLabel?.PDFTableColumn2Heading?.Label
                  }
                  pdfTableColumn3Heading={
                    costData?.PDFLabel?.PDFTableColumn3Heading?.Label
                  }
                  pdfTableColumn4Heading={
                    costData?.PDFLabel?.PDFTableColumn4Heading?.Label
                  }
                  pdfTableItem1Heading={
                    costData?.PDFLabel?.PDFTableItem1Heading?.Label
                  }
                  pdfTableItem2Heading={
                    costData?.PDFLabel?.PDFTableItem2Heading?.Label
                  }
                  pdfTableItem3Heading={
                    costData?.PDFLabel?.PDFTableItem3Heading?.Label
                  }
                  pdfTableItem4Heading={
                    costData?.PDFLabel?.PDFTableItem4Heading?.Label
                  }
                  pdfTableItem5Heading={
                    costData?.PDFLabel?.PDFTableItem5Heading?.Label
                  }
                  pdfTableItemTotalCostHeading={
                    costData?.PDFLabel?.PDFTableItemTotalCostHeading?.Label
                  }
                  pdfFurtherInformationHeading={
                    costData?.PDFContent?.PDFFurtherInformationHeading?.Label
                  }
                  pdfWhatHappensNextBody={
                    costData?.PDFContent?.PDFWhatHappensNextBody?.Label
                  }
                  pdfWhatHappensNextHeading={
                    costData?.PDFContent?.PDFWhatHappensNextHeading?.Label
                  }
                  pdfWhatHappensNextPhoneNumber={
                    costData?.PDFContent?.PDFWhatHappensNextPhoneNumber?.Label
                  }
                  pdfFurtherInformationBody={
                    costData?.PDFContent?.PDFFurtherInformationBody?.Label
                  }
                  adjuvantsExtraNotes={costData?.Label?.AdjuvantsText?.Label}
                  adjuvantsExtraNotesLink={
                    costData?.Label?.AdjuvantsLink?.Label
                  }
                  accessFertilityAd={costData?.Image?.AccessFertilityAd?.Value}
                />
              }
              fileName={'IVF-Cost-Estimation.pdf'}
              className={`ivf-calculator__btn ivf-calculator__btn--icon ivf-calculator__btn--icon--green ${
                !isCalculating ? 'ivf-calculator__btn--disabled' : ''
              }`}
            >
              <svg
                className="ivf-calculator__btn-icon"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.25 10.0625L9 13.1562L11.75 10.0625M9 1.125V13.1562"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.125 16.25H15.875"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {costData.Label.DownloadPDFButton.Label}
            </PDFDownloadLink>
            <button
              className={`ivf-calculator__btn ivf-calculator__btn--icon ivf-calculator__btn--icon--blue-outline ${
                cycleTypeVal.length === 0 ? 'ivf-calculator__btn--disabled' : ''
              }`}
              disabled={cycleTypeVal.length === 0 ? 'disabled' : ''}
              onClick={resetCalculator}
            >
              <svg
                className="ivf-calculator__btn-icon"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33469 14.9948C9.6021 15.2183 10.9073 15.0608 12.0852 14.5424C13.2632 14.0241 14.2609 13.168 14.9524 12.0826C15.6438 10.9972 15.9978 9.73107 15.9697 8.44443C15.9416 7.15778 15.5325 5.90838 14.7943 4.8542C14.0561 3.80003 13.0218 2.98843 11.8224 2.52205C10.6229 2.05567 9.31206 1.95544 8.05563 2.23405C6.7992 2.51266 5.6536 3.15759 4.7637 4.08728C3.8738 5.01697 3.27957 6.18967 3.05615 7.45708"
                  stroke="#02173E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M1.0293 2.19229L2.3813 8.19252L8.08883 6.90646"
                  stroke="#02173E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {costData.Label.ResetButton.Label}
            </button>
          </div>
        </div>
      )}
      {!isCalculating && (
        <div className="ivf-calculator-summary__intro-img">
          <img
            src={`${urlHost}${costData.Image.CalculatorImage.Value}`}
            alt="Ivf calculator intro"
          />
        </div>
      )}
    </div>
  );
};

export default Summary;
