import { useState, createContext, useEffect, useRef } from 'react';
import axios from 'axios';
export const FertilityCalculatorContext = createContext();
const parse = require('html-react-parser');

export const FertilityCalculatorProvider = ({ children }) => {
    const [value, setValue] = useState({ optage: '', optblasto: '', optfsh: '', optamh: '', optattmpt: '' });

    // treatments
    const [treatmentCycle, setTreatmentCycle] = useState('');
    const [treatmentCyclePregancyRate, setTreatmentCyclePregancyRate] = useState('');
    const [treatmentCycleBirthRate, setTreatmentCycleBirthRate] = useState('');
    const [eggCollectionCycles, setEggCollectionCycles] = useState('');
    const [eggCollectionPregancyRate, setEggCollectionPregancyRate] = useState('');
    const [eggCollectionBirthRate, setEggCollectionBirthRate] = useState('');
    const [embrioTransferCycles, setEmbrioTransferCycles] = useState('');
    const [embrioTransferPregnancyRate, setEmbrioTransferPregnancyRate] = useState('');
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
    const [liveBirthsPerEmbryoTransferred, setLiveBirthsPerEmbryoTransferred] = useState('');
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
    const [liveBirthsEmbryTransfLabel, setLiveBirthsEmbryTransfLabel] = useState('');
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

    useEffect(() => {
        setPercentage(`100%`);
        // getting the content local testing url
        // axios.get(`https://hcauks-dev-sitecore-single-app.azurewebsites.net/api/fertilitycalculator/content`)
        axios.get(`/api/fertilitycalculator/content`)
            .then(resp => {
                if (resp.data.hasOwnProperty("Error")) {
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
                        ...params
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
            .catch(error => {
                setLoadingMessage();
                console.log(error);
            })

        // get inital results
        const getInitialResults = (initParams) => {
            // local testing url
            // axios.get(`https://hcauks-uat-sitecore-cd.azurewebsites.net/api/fertilitycalculator/results${initParams}`)
            axios.get(`/api/fertilitycalculator/results${initParams}`)
                .then(resp => {
                    if (resp.data.hasOwnProperty("Error")) {
                        // hide loader
                        setIsLoadingContent(false);
                        setIsServerError(true);
                        setServerErrorMsg(resp.data.Error);
                    } else {
                        displayRecordData(resp.data);
                        // hide loader
                        setIsLoadingContent(false);
                    }
                })
                .catch(error => {
                    setLoadingMessage();
                    console.log(error);
                })
        }
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
        setLiveBirthsEmbryTransfLabel(data.Dictionaries.livebirthsperembryotransferred);
        setCyclesLabel(data.Dictionaries.cycles);
        setPregnancyRateLabel(data.Dictionaries.pregnancyrate);
        setLiveBirthRateLabel(data.Dictionaries.livebirthrate);
        // btns
        setCalculateBtn(data.Dictionaries.calculatebtn);
        setResetAllBtn(data.Dictionaries.resetallbtn);
    }

    const displayRecordData = (data) => {
        // results subtitle
        let updatedResultsTitle = resultSubtitle.current.replace(/{patientsTotal}/g, data.PATS);
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
    }

    const setLoadingMessage = () => {
        setIsLoadingContent(false);
        setError(true);
    }

    const closeNoResults = (e) => {
        e.preventDefault();
        setNoResults(false);
    }

    const showCalculation = (e) => {
        e.preventDefault();
        setLoadingText(loadingMsg.current);
        setIsLoading(true);
        setPercentage(`100%`);
        let selectParams = `?Optage=${value.optage}&Optblasto=${value.optblasto}&Optfsh=${value.optfsh}&Optamh=${value.optamh}&Optattmpt=${value.optattmpt}`;

        // local testing url
        // axios.get(`https://hcauks-uat-sitecore-cd.azurewebsites.net/api/fertilitycalculator/results${selectParams}`)
        axios.get(`/api/fertilitycalculator/results${selectParams}`)
            .then(resp => {
                if (resp.data.hasOwnProperty("Error")) {
                    // hide loader
                    setIsLoading(false);
                    setIsServerError(true);
                    setServerErrorMsg(resp.data.Error);
                } else if (Object.keys(resp.data).length > 0 && !resp.data.hasOwnProperty("Error")) {
                    setIsLoading(false);
                    document.getElementById("fc__stats").scrollIntoView({ behavior: "smooth" });
                    displayRecordData(resp.data);
                } else if (Object.keys(resp.data).length === 0) {
                    // results are all 0
                    setIsLoading(false);
                    setNoResults(true);
                    setNoResultsMsg(noResultsText.current);
                }
            })
            .catch(error => {
                console.log(error);
                setLoadingMessage();
            })
    }

    return (
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
                loadingText
            }}>
            {children}
        </FertilityCalculatorContext.Provider>
    )
}
