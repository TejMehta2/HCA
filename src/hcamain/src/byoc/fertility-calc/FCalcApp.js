/*import './App.scss';
import ComponentsContainer from './components/ComponentsContainer';

function App() {

  return (
    <div className="App">
      <ComponentsContainer />
    </div>
  );
}

export default App;
*/
'use client';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { useEffect, useState } from 'react';
//import './App.scss';
import ComponentsContainer from './components/ComponentsContainer';
import useSWR from 'swr';

function FCalcApp() {
  return (
    <div>
        <ComponentsContainer suppressHydrationWarning/>
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
    /*
  group: 'IVF-Pricing-App-Parameters',
  required: ['firstName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    telephone: {
      type: 'number',
      title: 'Telephone',
      minLength: 10,
    },
    bold: {
      type: 'boolean',
      title: 'Show text in bold weight',
    },
  },
  ui: {
    firstName: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:placeholder': 'Write your first name',
    },
    bold: {
      'ui:widget': 'radio',
    },
  },
*/
});

