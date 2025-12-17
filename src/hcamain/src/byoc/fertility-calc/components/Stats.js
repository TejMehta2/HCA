
import { useContext } from 'react';
import { FertilityCalculatorContext } from '../context/FertilityCalculatorContext';
//import { motion, AnimatePresence } from "framer-motion";
import Label from './Label';

export default function Stats() {
    const {
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
        resultsTitle,
        resultsSubTitle,
        treatmentMainLabel,
        treatmentHelpText,
        eggCollectionMainLabel,
        eggCollectionHelpText,
        embryoTransferMainLabel,
        embryoTransferHelpText,
        cyclesLabel,
        pregnancyRateLabel,
        liveBirthRateLabel } = useContext(FertilityCalculatorContext);

    return (
        <>
            <div className="stats" id="fc__stats" ref={myRef}>
                <div className="stats__title">
                    <h3>{resultsTitle}</h3>
                    <h2>{resultsSubTitle}</h2>
                </div>
                <div className="stats__cards-container">
                    <div className="card">
                        <Label headerTitle={treatmentMainLabel} helpText={treatmentHelpText} id={false} isLabel={false} rightAligned={false} />
                        <div className="card__data">
                            <div className="card__cycle">
                                <div className="card__cycle-title">{cyclesLabel}</div>
                                <div className="card__cycle-data">{treatmentCycle}</div>
                            </div>

                            <div className="card__rate">
                                <div className="card__rate-stats-container">
                                    <div className="card__rate-title">{pregnancyRateLabel}</div>
                                    <div className="card__rate-percentage">{treatmentCyclePregancyRate}</div>
                                </div>
                                <div className="card__rate-data-container">
                                    {/*<AnimatePresence>
                                        <motion.div
                                            style={{ overflow: "hidden" }}
                                            initial={{ width: 0 }}
                                            animate={{ width: treatmentCyclePregancyRate }}
                                            exit={{ width: 0 }}
                                            transition={{ duration: 1 }}
                                        >*/}
                                            <div className="card__rate-data"></div>
                                        {/*</motion.div>
                                    </AnimatePresence>*/}
                                </div>
                            </div>

                            <div className="card__rate cart__rate--border-bttm-0">
                                <div className="card__rate-stats-container">
                                    <div className="card__rate-title">{liveBirthRateLabel}</div>
                                    <div className="card__rate-percentage card__rate-percentage--green">{treatmentCycleBirthRate}</div>
                                </div>
                                <div className="card__rate-data-container">
                                    {/*<AnimatePresence>
                                        <motion.div
                                            style={{ overflow: "hidden" }}
                                            initial={{ width: 0 }}
                                            animate={{ width: treatmentCycleBirthRate }}
                                            exit={{ width: 0 }}
                                            transition={{ duration: 1 }}
                                        >*/}
                                            <div className="card__rate-data card__rate-data--green"></div>
                                        {/*</div></motion.div>
                                    </AnimatePresence>  */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <Label headerTitle={eggCollectionMainLabel} helpText={eggCollectionHelpText} id={false} isLabel={false} rightAligned={false} />
                        <div className="card__data">
                            <div className="card__cycle">
                                <div className="card__cycle-title">{cyclesLabel}</div>
                                <div className="card__cycle-data">{eggCollectionCycles}</div>
                            </div>
                            <div className="card__rate">
                                <div className="card__rate-stats-container">
                                    <div className="card__rate-title">{pregnancyRateLabel}</div>
                                    <div className="card__rate-percentage">{eggCollectionPregancyRate}</div>
                                </div>
                                <div className="card__rate-data-container">
                                   {/* <AnimatePresence>
                                        <motion.div
                                            style={{ overflow: "hidden" }}
                                            initial={{ width: 0 }}
                                            animate={{ width: eggCollectionPregancyRate }}
                                            exit={{ width: 0 }}
                                            transition={{ duration: 1 }}
                                        > */}
                                            <div className="card__rate-data"></div>
                                        {/*</motion.div>
                                    </AnimatePresence>*/}
                                </div>
                            </div>

                            <div className="card__rate cart__rate--border-bttm-0">
                                <div className="card__rate-stats-container">
                                    <div className="card__rate-title">{liveBirthRateLabel}</div>
                                    <div className="card__rate-percentage card__rate-percentage--green">{eggCollectionBirthRate}</div>
                                </div>
                                <div className="card__rate-data-container">
                                    {/*<AnimatePresence>
                                        <motion.div
                                            style={{ overflow: "hidden" }}
                                            initial={{ width: 0 }}
                                            animate={{ width: eggCollectionBirthRate }}
                                            exit={{ width: 0 }}
                                            transition={{ duration: 1 }}
                                        >*/}
                                            <div className="card__rate-data card__rate-data--green"></div>
                                        {/*</motion.div>
                                    </AnimatePresence>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <Label headerTitle={embryoTransferMainLabel} helpText={embryoTransferHelpText} id={false} isLabel={false} rightAligned={true} />
                        <div className="card__data">
                            <div className="card__cycle">
                                <div className="card__cycle-title">{cyclesLabel}</div>
                                <div className="card__cycle-data">{embrioTransferCycles}</div>
                            </div>

                            <div className="card__rate">
                                <div className="card__rate-stats-container">
                                    <div className="card__rate-title">{pregnancyRateLabel}</div>
                                    <div className="card__rate-percentage">{embrioTransferPregnancyRate}</div>
                                </div>
                                <div className="card__rate-data-container">
                                    {/*<AnimatePresence>
                                        <motion.div
                                            style={{ overflow: "hidden" }}
                                            initial={{ width: 0 }}
                                            animate={{ width: embrioTransferPregnancyRate }}
                                            exit={{ width: 0 }}
                                            transition={{ duration: 1 }}
                                        >*/}
                                            <div className="card__rate-data"></div>
                                        {/*</motion.div>
                                    </AnimatePresence>*/}
                                </div>
                            </div>

                            <div className="card__rate cart__rate--border-bttm-0">
                                <div className="card__rate-stats-container">
                                    <div className="card__rate-title">{liveBirthRateLabel}</div>
                                    <div className="card__rate-percentage card__rate-percentage--green">{embrioTransferBirthRate}</div>
                                </div>
                                <div className="card__rate-data-container">
                                    {/*<AnimatePresence>
                                        <motion.div
                                            style={{ overflow: "hidden" }}
                                            initial={{ width: 0 }}
                                            animate={{ width: embrioTransferBirthRate }}
                                            exit={{ width: 0 }}
                                            transition={{ duration: 1 }}
                                        >*/}
                                            <div className="card__rate-data card__rate-data--green"></div>
                                        {/*</motion.div>
                                    </AnimatePresence>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
