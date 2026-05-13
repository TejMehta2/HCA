import { useContext } from 'react';
import { FertilityCalculatorContext } from '../context/FertilityCalculatorContext';
import Label from './Label';

export default function Births() {
    const {
        singleton,
        singletonRate,
        twins,
        twinsRate,
        triplets,
        tripletsRate,
        pregnancyLoss,
        pregnancyLossRate,
        liveBirthsPerEmbryoTransferred,
        birthsMainLabel,
        birthsHelpText,
        singletonLabel,
        twinsLabel,
        tripletsLabel,
        pregnancyLossLabel,
        liveBirthsEmbryTransfLabel
    } = useContext(FertilityCalculatorContext);

    return (
        <div className="births">

            <Label headerTitle={birthsMainLabel} helpText={birthsHelpText} id={false} isLabel={false} rightAligned={false} />
            <div className="births__stats">
                <div className="births__stats-column">
                    <div className="births__stats-column-title">{singletonLabel}</div>
                    <div className="births__stats-column-results">
                        <span className="births__stats-column-results-number">
                            {singleton}
                        </span>
                        <span className="births__stats-column-results-percentage">
                            {singletonRate}
                        </span>
                    </div>
                </div>
                <div className="births__stats-column">
                    <div className="births__stats-column-title">{twinsLabel}</div>
                    <div className="births__stats-column-results">
                        <span className="births__stats-column-results-number">
                            {twins}
                        </span>
                        <span className="births__stats-column-results-percentage">
                            {twinsRate}
                        </span>
                    </div>
                </div>
                <div className="births__stats-column">
                    <div className="births__stats-column-title">{tripletsLabel}</div>
                    <div className="births__stats-column-results">
                        <span className="births__stats-column-results-number">
                            {triplets}
                        </span>
                        <span className="births__stats-column-results-percentage">
                            {tripletsRate}
                        </span>
                    </div>
                </div>
                <div className="births__stats-column">
                    <div className="births__stats-column-title">{pregnancyLossLabel}</div>
                    <div className="births__stats-column-results">
                        <span className="births__stats-column-results-number">
                            {pregnancyLoss}
                        </span>
                        <span className="births__stats-column-results-percentage">
                            {pregnancyLossRate}
                        </span>
                    </div>
                </div>
            </div>
            <div className="births__embryo-transf">
                <span className="births__embryo-transf-label">
                    {liveBirthsEmbryTransfLabel}
                </span>
                <span className="births__embryo-transf-result">
                    {liveBirthsPerEmbryoTransferred}
                </span>
            </div>
        </div>
    )
}
