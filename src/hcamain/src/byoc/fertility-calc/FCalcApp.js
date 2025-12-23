'use client';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { useEffect, useState } from 'react';
//import './App.scss';
import ComponentsContainer from './components/ComponentsContainer';
import FertilityCalculatorContextProvider from './context/FertilityCalculatorContext';
import useSWR from 'swr';

// globals for script utils - scripts won't work with npm and nextjs loading, have to do this work around
let parse = undefined;
let motion = undefined;
let AnimatePresence = undefined;

function FCalcApp() {

  function loadScriptSync(url, id) {
    if (!document.getElementById(id)) {
      // Download the script text synchronously:
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, false); // false means synchronous
      xhr.send(null);
      // Execute it synchronously:
      const script = document.createElement('script');
      script.setAttribute("id", id);
      script.textContent = xhr.responseText;
      document.head.append(script);
    }
  }

  // Sequential execution
  loadScriptSync("https://unpkg.com/react@18/umd/react.production.min.js", "reactScript");
  loadScriptSync("https://unpkg.com/html-react-parser@latest/dist/html-react-parser.min.js", "reactParserScript");
  loadScriptSync("https://unpkg.com/framer-motion@12.23.26/dist/framer-motion.dev.js", "framerMotionScript");
  console.log('loaded scripts');

  parse = window.HTMLReactParser;
  motion = window.Motion;
  AnimatePresence = window.Motion.AnimatePresence;
  console.log('getting return parse', parse);
  if (!AnimatePresence) {
    return (false);
  }
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
