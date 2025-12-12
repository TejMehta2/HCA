import * as FEAAS from '@sitecore-feaas/clientside/react';
/**
 * Below are Sitecore default BYOC components. Included components will be available in Pages and Components apps out of the
 * box for convenience. It is advised to comment out unused components when application is ready for production
 * to reduce javascript bundle size.
 */

// SitecoreForm component displays forms created in XM Forms as individual components to be embedded into Pages.
// Sitecore Forms for Sitecore XP are still available separately via @sitecore-jss-forms package
import '@sitecore/components/form';

/**
 * End of built-in JSS imports
 * You can import your own client component below
 * @example
 * import './MyClientComponent';
 * @example
 * import 'src/otherFolder/MyOtherComponent';
 */

// An important boilerplate component that prevents BYOC components from being optimized away and allows then. Should be kept in this file.
const ClientsideComponent = (props: FEAAS.ExternalComponentProps) =>
  FEAAS.ExternalComponent(props);
/**
 * Clientside BYOC component will be rendered in the browser, so that external components:
 * - Can have access to DOM apis, including network requests
 * - Use clientside react hooks like useEffect.
 * - Be implemented as web components.
 */
export default ClientsideComponent;

/**
 * Add imports to BYOC components that you would like to be rendered on server below.
 * Clientside components are used for user interactivity.
 * https://github.com/Sitecore/feaas-nextjs-example
 */

// Clientside-only component
//import './ExampleClientsideComponent';

// Component that can be rendered both on client and server
//import './ExampleHybridComponent';

// Component that has separate implementation for clientside
//import './ExampleSwappedComponent.client';

// Serverside component that contains another clientside component
//import './ExampleAugmentedComponent';

/************* HCA ********************/
// root of the IVF pricing calculator app
import './ivf-pricer/IVFApp';
// root of the fertility calculator app
import './fertility-calc/FCalcApp';
/************* End HCA ********************/
