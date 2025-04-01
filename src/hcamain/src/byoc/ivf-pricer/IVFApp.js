'use client';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { useEffect, useState } from 'react';
//import './IVFApp.scss';
import IvfCalculator from './components/IvfCalculator';
import IvfCalculatorContextProvider from './context/IvfCalculatorContext';
import useSWR from 'swr';

function IVFApp() {
  return (
    <div>
      <div className="ivf-calculator">
        <IvfCalculatorContextProvider suppressHydrationWarning>
          <IvfCalculator/>
        </IvfCalculatorContextProvider>
      </div>
    </div>
  );
}

export default IVFApp;

FEAAS.registerComponent(IVFApp, {
  name: 'IVF-Pricing-App',
  title: 'IVF Pricing Calculator',
  description: 'IVF pricing calculator app for Lister fertility',
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

