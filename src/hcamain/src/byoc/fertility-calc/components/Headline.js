import { useContext } from 'react';
import { FertilityCalculatorContext } from '../context/FertilityCalculatorContext';

export default function Headline() {
    const { headlineTitle, headerSubtitle } = useContext(FertilityCalculatorContext);
    return (
        <div className="headline">
            <h2>{headlineTitle}</h2>
            <p>{headerSubtitle}</p>
        </div>
    )
}