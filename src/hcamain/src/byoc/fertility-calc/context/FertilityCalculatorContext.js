import { useState, createContext, useEffect, useRef } from 'react';
import axios from 'axios';
export const FertilityCalculatorContext = createContext();
const parse = (input) => {
  return input;
}; // require('html-react-parser');

// debug
// http://localhost:3000/fertility-calculator/calc

const FertilityCalculatorContextProvider = ({ children }) => {
  const [value, setValue] = useState({
    optage: '',
    optblasto: '',
    optfsh: '',
    optamh: '',
    optattmpt: '',
  });

  // treatments
  const [treatmentCycle, setTreatmentCycle] = useState('');
  const [treatmentCyclePregancyRate, setTreatmentCyclePregancyRate] =
    useState('');
  const [treatmentCycleBirthRate, setTreatmentCycleBirthRate] = useState('');
  const [eggCollectionCycles, setEggCollectionCycles] = useState('');
  const [eggCollectionPregancyRate, setEggCollectionPregancyRate] =
    useState('');
  const [eggCollectionBirthRate, setEggCollectionBirthRate] = useState('');
  const [embrioTransferCycles, setEmbrioTransferCycles] = useState('');
  const [embrioTransferPregnancyRate, setEmbrioTransferPregnancyRate] =
    useState('');
  const [embrioTransferBirthRate, setEmbrioTransferBirthRate] = useState('');
  // births
  const [singleton, setSingleton] = useState('');
  const [singletonRate, setSingletonRate] = useState('');
  const [twins, setTwins] = useState('');
  const [twinsRate, setTwinsRate] = useState('');
  const [triplets, setTriplets] = useState('');
  const [tripletsRate, setTripletsRate] = useState('');
  const [pregnancyLoss, setPregnancyLoss] = useState('');
  const [pregnancyLossRate, setPregnancyLossRate] = useState('');
  const [liveBirthsPerEmbryoTransferred, setLiveBirthsPerEmbryoTransferred] =
    useState('');
  // ref for element to be scrolled
  let myRef = useRef();
  // setting loader
  const [isLoading, setIsLoading] = useState(false);
  const [percent, setPercentage] = useState('');
  const [selectMenus, setSelectMenus] = useState([]);
  // Labels:
  // results
  const [resultsTitle, setResultsTitle] = useState('');
  const [resultsSubTitle, setResultsSubTitle] = useState('');
  // treatment
  const [treatmentMainLabel, setTreatmentMainLabel] = useState('');
  const [treatmentHelpText, setTreatmentHelpText] = useState('');
  // EggCollection
  const [eggCollectionMainLabel, setEggCollectionMainLabel] = useState('');
  const [eggCollectionHelpText, setEggCollectionHelpText] = useState('');
  // EmbryoTransfer
  const [embryoTransferMainLabel, setEmbryoTransferMainLabel] = useState('');
  const [embryoTransferHelpText, setEmbryoTransferHelpText] = useState('');
  // Births
  const [birthsMainLabel, setBirthsMainLabel] = useState('');
  const [birthsHelpText, setBirthsHelpText] = useState('');
  // Dictionary
  const [singletonLabel, setSingletonLabel] = useState('');
  const [twinsLabel, setTwinsLabel] = useState('');
  const [tripletsLabel, setTripletsLabel] = useState('');
  const [pregnancyLossLabel, setPregnancyLossLabel] = useState('');
  const [liveBirthsEmbryTransfLabel, setLiveBirthsEmbryTransfLabel] =
    useState('');
  const [cyclesLabel, setCyclesLabel] = useState('');
  const [pregnancyRateLabel, setPregnancyRateLabel] = useState('');
  const [liveBirthRateLabel, setLiveBirthRateLabel] = useState('');
  // headline
  const [headlineTitle, setHeadlineTitle] = useState('');
  const [headerSubtitle, setHeaderSubtitle] = useState('');
  // Buttons
  const [calculateBtn, setCalculateBtn] = useState('');
  const [resetAllBtn, setResetAllBtn] = useState('');
  // loading data
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  // errors variables
  const [isError, setError] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [noResultsMsg, setNoResultsMsg] = useState('');
  let noResultsText = useRef();
  const [loadingText, setLoadingText] = useState('');
  let loadingMsg = useRef();

  let resultSubtitle = useRef();

  // ported from Legacy Sitecore 9.3
  const content = {
    Labels: {
      Results: {
        Title: 'Pregnancy rate results',
        Subtitle: 'from <span>{patientsTotal}</span> patients',
      },
      Treatment: {
        MainLabel: 'Treatment Cycles Started',
        HelpText:
          'This is the total number of treatment cycles started, and includes cycles which did not progress to egg collection.<br /><br /><span class="title">Cycles</span> - This is the total number of treatment cycles started, and includes cycles which did not progress to egg collection.<br /><br /><span class="title">Pregnancy rate</span> - This is the percentage of cycles that achieved a positive pregnancy test following embryo transfer. A positive pregnancy test is determined by measuring hCG levels in a blood or urine sample around two weeks after embryo transfer.<br /><br /><span class="title">Live birth rate</span> - This is the total number of live birth events. A twin or triplet pregnancy or delivery is calculated as one live birth.',
      },
      EggCollection: {
        MainLabel: 'Egg Collection Cycles',
        HelpText:
          'This is the total number of cycles that progressed to egg collection, including those that did not reach embryo transfer.<br /><br /><span class="title">Cycles</span> - This is the total number of treatment cycles started, and includes cycles which did not progress to egg collection.<br /><br /><span class="title">Pregnancy rate</span> - This is the percentage of cycles that achieved a positive pregnancy test following embryo transfer. A positive pregnancy test is determined by measuring hCG levels in a blood or urine sample around two weeks after embryo transfer.<br /><br /><span class="title">Live birth rate</span> - This is the total number of live birth events. A twin or triplet pregnancy or delivery is calculated as one live birth.',
      },
      EmbryoTransfer: {
        MainLabel: 'Embryo Transfer Cycles',
        HelpText:
          'This is the total number of cycles that progressed to embryo transfer.<br /><br /><span class="title">Cycles</span> - This is the total number of treatment cycles started, and includes cycles which did not progress to egg collection.<br /><br /><span class="title">Pregnancy rate</span> - This is the percentage of cycles that achieved a positive pregnancy test following embryo transfer. A positive pregnancy test is determined by measuring hCG levels in a blood or urine sample around two weeks after embryo transfer.<br /><br /><span class="title">Live birth rate</span> - This is the total number of live birth events. A twin or triplet pregnancy or delivery is calculated as one live birth.',
      },
      Births: {
        MainLabel: 'Births',
        HelpText:
          '<span class="title">Singleton</span> - This is the total number of cycles yielding a singleton delivery.<br /><br /><span class="title">Twins</span> - This is the total number of cycles yielding a twin delivery.<br /><br /><span class="title">Triplets</span> - This is the total number of cycles yielding a triplets delivery.<br /><br /><span class="title">Pregnancy loss</span> - A pregnancy loss is a miscarriage occurring between the positive pregnancy test and 20 weeks gestation.<br /><br /><span class="title">Live Births Per Embryo Transferred</span> - This shows the likelihood of each embryo transferred resulting in a live birth. It takes into account how many embryos were transferred in a cycle. It presents how many women had a live birth out of the total number of embryos transferred across the cycles.',
      },
      Dictionaries: {
        calculatebtn: 'Calculate',
        cycles: 'Cycles',
        headersubtitle:
          "Our celebrated Pregnancy Calculator enables patients to establish their very own chances of achieving a pregnancy at the Lister Fertility Clinic (using the clinic's own data from 01-01-2005 to 30-09-2016).<br /><br />Start by choosing your age group (age of female partner). You can then select one or more additional factors to see how they affect pregnancy rates.<br /><br />Note - Selecting several of these factors together results in a small number of treatment cycles matching those criteria. This may compromise how precise the calculation can be.",
        headertitle: "Let's get started",
        livebirthrate: 'Live birth rates',
        livebirthsperembryotransferred: 'Live Births Per Embryo Transferred',
        loadingtext: 'Loading...',
        noresultsmsg: 'No results found. Please try selecting fewer options.',
        pregnancyloss: 'Pregnancy loss',
        pregnancyrate: 'Pregnancy rates',
        resetallbtn: 'Reset all',
        singleton: 'Singleton',
        triplets: 'Triplets',
        twins: 'Twins',
      },
    },
    SelectMenus: [
      {
        Label: 'Age Group',
        Name: 'optage',
        DefaultValue: '1',
        HelpText:
          "<p>Select your age group according to your age at the time of treatment. If you are 39 years old and want to postpone your treatment for 1 year, select '40-42 years' to find out your chances of success in 1 year's time.</p>",
        Id: 'select_optage',
        Options: [
          {
            Value: '0',
            Text: 'All age groups',
          },
          {
            Value: '1',
            Text: 'Less than 35',
          },
          {
            Value: '2',
            Text: '35 - 37 yrs',
          },
          {
            Value: '3',
            Text: '38 - 39 yrs',
          },
          {
            Value: '4',
            Text: '40 - 42 yrs',
          },
          {
            Value: '5',
            Text: '43 - 44 yrs',
          },
          {
            Value: '6',
            Text: '45 yrs +',
          },
        ],
      },
      {
        Label: 'Blastocyst',
        Name: 'optblasto',
        DefaultValue: '0',
        HelpText:
          '<p>If you have at least three good quality embryos three days after egg collection, we recommend continuing to culture the embryos to the blastocyst stage, which is the stage just before implantation. In most cases, this enables us to more accurately select the embryos that have the best potential for implantation, thereby increasing your chances of pregnancy. Not all embryos reach the blastocyst stage by day 5 or 6.</p>',
        Id: 'select_optblasto',
        Options: [
          {
            Value: '0',
            Text: 'All',
          },
          {
            Value: '1',
            Text: 'Blastocyst Transfer',
          },
          {
            Value: '2',
            Text: 'Non Blastocyst',
          },
        ],
      },
      {
        Label: 'Fresh Attempt',
        Name: 'optattmpt',
        DefaultValue: '0',
        HelpText:
          "<p>Some patients have had no previous IVF treatment and others may have had several attempts at IVF before. If you have had no previous treatment, select 'Fresh attempt 1'. If you have had two previous treatment cycles and want to know what your chances will be in this unit on a third attempt, choose 'Fresh attempt 3'.</p>",
        Id: 'select_optattmpt',
        Options: [
          {
            Value: '0',
            Text: 'All',
          },
          {
            Value: '1',
            Text: 'Fresh attempt 1',
          },
          {
            Value: '2',
            Text: 'Fresh attempt 2',
          },
          {
            Value: '3',
            Text: 'Fresh attempt 3',
          },
          {
            Value: '4',
            Text: 'Fresh attempt 4',
          },
          {
            Value: '5',
            Text: 'Fresh attempt 5',
          },
          {
            Value: '6',
            Text: 'Fresh attempt 6',
          },
          {
            Value: '7',
            Text: 'Fresh attempt 7',
          },
          {
            Value: '8',
            Text: 'Fresh attempt 8',
          },
          {
            Value: '9',
            Text: 'Fresh attempt 9',
          },
          {
            Value: '10',
            Text: 'Fresh attempt 10',
          },
          {
            Value: '11',
            Text: 'Fresh attempt 11 +',
          },
        ],
      },
      {
        Label: 'FSH Level',
        Name: 'optfsh',
        DefaultValue: '0',
        HelpText:
          '<p>Follicle Stimulating Hormone (FSH) is the hormone produced in the pituitary gland in the brain that stimulates the ovary to develop a dominant follicle in each normal menstrual cycle. As the function of the ovary deteriorates, so the level of FSH will tend to rise. A woman with a raised FSH (the normal range is below 10 IU/l) is more likely to produce fewer eggs than a woman of the same age who has a lower level of FSH.</p>',
        Id: 'select_optfsh',
        Options: [
          {
            Value: '0',
            Text: 'All',
          },
          {
            Value: '1',
            Text: 'No FSH data',
          },
          {
            Value: '2',
            Text: 'FSH < 10',
          },
          {
            Value: '3',
            Text: 'FSH 10 - 14.99',
          },
          {
            Value: '4',
            Text: 'FSH 15 - 19.9',
          },
          {
            Value: '5',
            Text: 'FSH 20 - 29.9',
          },
          {
            Value: '',
            Text: 'FSH 30 +',
          },
        ],
      },
      {
        Label: 'AMH Level',
        Name: 'optamh',
        DefaultValue: '0',
        HelpText:
          '<p>Anti-Müllerian hormone (AMH) is present in the cells surrounding the antral follicles in the ovary. As the volume of antral follicles decline, the level of AMH in the blood also declines, which is why it is used as a marker for measuring ovarian reserve.</p>',
        Id: 'select_optamh',
        Options: [
          {
            Value: '0',
            Text: 'All',
          },
          {
            Value: '7',
            Text: 'AMH > 35',
          },
          {
            Value: '2',
            Text: 'AMH  0.1 to 1.0',
          },
          {
            Value: '3',
            Text: 'AMH  1.1 to 3.0',
          },
          {
            Value: '4',
            Text: 'AMH  3.1 to 7.0',
          },
          {
            Value: '5',
            Text: 'AMH  7.1 to 15',
          },
          {
            Value: '6',
            Text: 'AMH  15.1 to 35',
          },
          {
            Value: '1',
            Text: 'No AMH',
          },
        ],
      },
    ],
  };

  useEffect(() => {
    setPercentage(`100%`);
    // getting the content local testing url - was in sitecore 9.3
    // axios.get(`https://hcauks-dev-sitecore-single-app.azurewebsites.net/api/fertilitycalculator/content`)
    /*axios
      .get(`/api/fertilitycalculator/content`)
      .then((resp) => {
        if (resp.data.hasOwnProperty('Error')) {
          // hide loader
          setIsLoadingContent(false);
          setIsServerError(true);
          setServerErrorMsg(resp.data.Error);
        } else {
          // render select menus
          setSelectMenus(resp.data.SelectMenus);

          let params = {};

          resp.data.SelectMenus.forEach((select) => {
            params[select.Name] = select.DefaultValue;
          });

          setValue({
            ...params,
          });

          // set up initial parameters to get default values
          let initParams = `?Optage=${params.optage}&Optblasto=${params.optblasto}&Optfsh=${params.optfsh}&Optamh=${params.optamh}&Optattmpt=${params.optattmpt}`;

          // storing value with useRef, so it is not lost after next rendering
          resultSubtitle.current = resp.data.Labels.Results.Subtitle;

          // get no results message and store it
          noResultsText.current = resp.data.Labels.Dictionaries.noresultsmsg;

          // get loading results msg
          loadingMsg.current = resp.data.Labels.Dictionaries.loadingtext;

          // display Labels
          displayLabels(resp.data.Labels);

          // second api call to get results
          getInitialResults(initParams);

          // hide loader
          setIsLoadingContent(false);
        }
      })
      .catch((error) => {
        setLoadingMessage();
        console.log(error);
      });*/

    const resp = {};
    resp.data = content;
    // render select menus
    setSelectMenus(resp.data.SelectMenus);

    let params = {};

    resp.data.SelectMenus.forEach((select) => {
      params[select.Name] = select.DefaultValue;
    });

    setValue({
      ...params,
    });

    // storing value with useRef, so it is not lost after next rendering
    resultSubtitle.current = resp.data.Labels.Results.Subtitle;

    // get no results message and store it
    noResultsText.current = resp.data.Labels.Dictionaries.noresultsmsg;

    // get loading results msg
    loadingMsg.current = resp.data.Labels.Dictionaries.loadingtext;

    // display Labels
    displayLabels(resp.data.Labels);

    // get inital results
    const getInitialResults = (params) => {
      // local testing url
      // keys must be in the same order as in the spreadsheet OPTAGE	OPTBLASTO	OPTATTMPT	OPTFSH	OPTAMH
      // axios.get(`http://localhost:3000/api/lookupAPI/FertilityCalculator/default/findbydictionary/data?key=${params.optage}-${params.optblasto}-${params.optattmpt}-${params.optfsh}-${params.optamh}`)
      axios
        .get(
          `/api/lookupAPI/FertilityCalculator/default/findbydictionary/data?key=${params.optage}-${params.optblasto}-${params.optattmpt}-${params.optfsh}-${params.optamh}`
        )
        .then((resp) => {
          if (resp.data.hasOwnProperty('Error')) {
            // hide loader
            setIsLoadingContent(false);
            setIsServerError(true);
            setServerErrorMsg(resp.data.Error);
          } else if (resp.data && resp.data.length == 1) {
            displayRecordData(resp.data[0].Values);
            // hide loader
            setIsLoadingContent(false);
          } else {
            // hide loader
            setIsLoadingContent(false);
            setIsServerError(true);
            setServerErrorMsg('unexpected data format response from server');
          }
        })
        .catch((error) => {
          setLoadingMessage();
          console.log(error);
        });
    };

    // second api call to get results
    getInitialResults(params);

    // hide loader
    setIsLoadingContent(false);
  }, []);

  const displayLabels = (data) => {
    // headline
    setHeadlineTitle(data.Dictionaries.headertitle);
    setHeaderSubtitle(parse(data.Dictionaries.headersubtitle));
    setResultsTitle(data.Results.Title);
    setTreatmentMainLabel(data.Treatment.MainLabel);
    setTreatmentHelpText(data.Treatment.HelpText);
    setEggCollectionMainLabel(data.EggCollection.MainLabel);
    setEggCollectionHelpText(data.EggCollection.HelpText);
    setEmbryoTransferMainLabel(data.EmbryoTransfer.MainLabel);
    setEmbryoTransferHelpText(data.EmbryoTransfer.HelpText);
    setBirthsMainLabel(data.Births.MainLabel);
    setBirthsHelpText(data.Births.HelpText);
    // dictionaries
    setSingletonLabel(data.Dictionaries.singleton);
    setTwinsLabel(data.Dictionaries.twins);
    setTripletsLabel(data.Dictionaries.triplets);
    setPregnancyLossLabel(data.Dictionaries.pregnancyloss);
    setLiveBirthsEmbryTransfLabel(
      data.Dictionaries.livebirthsperembryotransferred
    );
    setCyclesLabel(data.Dictionaries.cycles);
    setPregnancyRateLabel(data.Dictionaries.pregnancyrate);
    setLiveBirthRateLabel(data.Dictionaries.livebirthrate);
    // btns
    setCalculateBtn(data.Dictionaries.calculatebtn);
    setResetAllBtn(data.Dictionaries.resetallbtn);
  };

  const displayRecordData = (data) => {
    // results subtitle
    let updatedResultsTitle = resultSubtitle.current.replace(
      /{patientsTotal}/g,
      data.PATS
    );
    setResultsSubTitle(parse(updatedResultsTitle));
    // results
    setTreatmentCycle(data.CYCS);
    setTreatmentCyclePregancyRate(`${data.POSCYCS}%`);
    setTreatmentCycleBirthRate(`${data.DLVCYCS}%`);
    setEggCollectionCycles(data.CYCEC);
    setEggCollectionPregancyRate(`${data.POSCYCEC}%`);
    setEggCollectionBirthRate(`${data.DLVCYCEC}%`);
    setEmbrioTransferCycles(data.CYCTRANS);
    setEmbrioTransferPregnancyRate(`${data.POSCYCTRAN}%`);
    setEmbrioTransferBirthRate(`${data.DLVCYCTRAN}%`);
    // births
    setSingleton(data.SINGLETON);
    setSingletonRate(`${data.SINGLETON_PC}%`);
    setTwins(data.TWINS);
    setTwinsRate(`${data.TWINS_PC}%`);
    setTriplets(data.TRIPLET);
    setTripletsRate(`${data.TRIPLET_PC}%`);
    setPregnancyLoss(data.PREGLOSS);
    setPregnancyLossRate(`${data.PREGLOSS_PC}%`);
    setLiveBirthsPerEmbryoTransferred(`${data.DLVEMBTRAN}%`);
  };

  const setLoadingMessage = () => {
    setIsLoadingContent(false);
    setError(true);
  };

  const closeNoResults = (e) => {
    e.preventDefault();
    setNoResults(false);
  };

  const showCalculation = (e) => {
    e.preventDefault();
    setLoadingText(loadingMsg.current);
    setIsLoading(true);
    setPercentage(`100%`);
    //let selectParams = `?Optage=${value.optage}&Optblasto=${value.optblasto}&Optfsh=${value.optfsh}&Optamh=${value.optamh}&Optattmpt=${value.optattmpt}`;

    // local testing url
    // axios.get(`http://localhost:3000/api/lookupAPI/FertilityCalculator/default/findbydictionary/data?key=${value.optage}-${value.optblasto}-${value.optattmpt}-${value.optfsh}-${value.optamh}`)

    axios
      .get(
        `/api/lookupAPI/FertilityCalculator/default/findbydictionary/data?key=${value.optage}-${value.optblasto}-${value.optattmpt}-${value.optfsh}-${value.optamh}`
      )
      .then((resp) => {
        if (resp.data.hasOwnProperty('Error')) {
          // hide loader
          setIsLoading(false);
          setIsServerError(true);
          setServerErrorMsg(resp.data.Error);
        } else if (resp.data && resp.data.length == 1) {
          setIsLoading(false);
          document
            .getElementById('fc__stats')
            .scrollIntoView({ behavior: 'smooth' });
          displayRecordData(resp.data[0].Values);
        } else {
          // results are all 0
          setIsLoading(false);
          setNoResults(true);
          setNoResultsMsg(noResultsText.current);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingMessage();
      });
  };

  return (
    // useContext(FertilityCalculatorContext);
    <FertilityCalculatorContext.Provider
      value={{
        value,
        setValue,
        treatmentCycle,
        treatmentCyclePregancyRate,
        treatmentCycleBirthRate,
        eggCollectionCycles,
        eggCollectionPregancyRate,
        eggCollectionBirthRate,
        embrioTransferCycles,
        embrioTransferPregnancyRate,
        embrioTransferBirthRate,
        myRef,
        showCalculation,
        singleton,
        singletonRate,
        twins,
        twinsRate,
        triplets,
        tripletsRate,
        pregnancyLoss,
        pregnancyLossRate,
        liveBirthsPerEmbryoTransferred,
        isLoading,
        percent,
        selectMenus,
        resultsTitle,
        resultsSubTitle,
        treatmentMainLabel,
        treatmentHelpText,
        eggCollectionMainLabel,
        eggCollectionHelpText,
        embryoTransferMainLabel,
        embryoTransferHelpText,
        birthsMainLabel,
        birthsHelpText,
        singletonLabel,
        twinsLabel,
        tripletsLabel,
        pregnancyLossLabel,
        liveBirthsEmbryTransfLabel,
        cyclesLabel,
        pregnancyRateLabel,
        liveBirthRateLabel,
        calculateBtn,
        resetAllBtn,
        isError,
        headlineTitle,
        headerSubtitle,
        isLoadingContent,
        isServerError,
        serverErrorMsg,
        noResults,
        closeNoResults,
        noResultsMsg,
        loadingText,
      }}
    >
      {children}
    </FertilityCalculatorContext.Provider>
  );
};

export default FertilityCalculatorContextProvider;
