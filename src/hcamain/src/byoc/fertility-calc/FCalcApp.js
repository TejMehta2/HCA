'use client';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { useEffect, useState } from 'react';
//import './App.scss';
import ComponentsContainer from './components/ComponentsContainer';
import FertilityCalculatorContextProvider from './context/FertilityCalculatorContext';
import useSWR from 'swr';

function FCalcApp() {
  return (
    <div>
      <div className="fertility-calculator">
        <FertilityCalculatorContextProvider suppressHydrationWarning>
          <ComponentsContainer />
        </FertilityCalculatorContextProvider>
      </div>
    </div>
  );
}

export default FCalcApp;

FEAAS.registerComponent(FCalcApp, {
  name: 'Fertility-Calculator-App',
  title: 'Fertility Calculator',
  description: 'Fertility calculator for Lister fertility',
  thumbnail:
    'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg', ///static/legacy/assets/images/ivfcalcprecalc.jpg
});
