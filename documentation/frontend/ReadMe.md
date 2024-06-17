# Front end summary

The goal of this document is to provide a general overview of the atypical technologies and feature on the HCA re-platform site (hcamain)

Most of the links here are the actual relevant code, but there are usually Markdown files in the same directory to provide additional documentation.

## Redirects
We handle some regex based redirects and rewrites in [NextJS config](../../src//hcamain/next.config.js)

But we also have some redirects which are fetched from an API at request time. These are handled in [middleware](../../src//hcamain/src//middleware.ts). Since this happens on demand, it means there is likely a small performant hit on response time when loading a redirected page.

### Docs: 
https://nextjs.org/docs/pages/api-reference/next-config-js/redirects
https://nextjs.org/docs/pages/building-your-application/routing/redirecting#nextresponseredirect-in-middleware

## Geo-location

We determine the user's location approximately using Vercel edge geo-location in [middleware](../../src//hcamain/src//middleware.ts).

We set a cookie in the middleware function which is accessible on the client side. This is consumed in the various search components around the site, as part of the [useSearchForm hook](../../src/component-library/hooks/useSearchForm/useSearchForm.tsx).

```
// Apply near param from geolocation middleware cookie
if (typeof window !== 'undefined') {
  const regex = new RegExp(/near=([\w\s]+)(?=;|$)/gm);
  const near = regex.exec(document?.cookie)?.[1];
  if (near?.length) {
    combinedParams.push(['near', near]);
  }
}
```

We access the cookie value and append it to the parameter list of our API call to fetch results dynamically.

### Docs: 
https://edge-functions-geolocation.vercel.sh/

## Search components

The site has several search components, not to be confused with "generic/yext search" which is the main site search.

The search components all use the [useSearchForm hook](../../src/component-library/hooks/useSearchForm/useSearchForm.tsx) to fetch data dynamically client-side.

The data is rendered as cards, or in the case of `LocationsSearch` as an [interactive google maps instance with pins representing each location](../../src/component-library/components/LocationMap/LocationMap.tsx)..

The API is the integration layer, which acts as a wrapper/proxy around Yext. 

Search templates:
- [LocationsSearch](../../src/hcamain/src/components/LocationsSearch/LocationsSearch.tsx)
- [ServiceLinesSearch](../../src/hcamain/src/components/ServiceLinesSearch/ServiceLinesSearch.tsx)
- [BlogSearch](../../src/hcamain/src/components/BlogSearch/BlogSearch.tsx)
- [TreatmentsSearch](../../src/hcamain/src/components/TreatmentsSearch/TreatmentsSearch.tsx)
- [TreatmentsSearch](../../src/hcamain/src/components/TreatmentsSearch/TreatmentsSearch.tsx)
- [TestAndScansSearch](../../src/hcamain/src/components/TestAndScansSearch/TestAndScansSearch.tsx)
- [PatientStoriesSearch](../../src/hcamain/src/components/PatientStoriesSearch/PatientStoriesSearch.tsx)

## Dynamic components

These are similar to search components, in that they fetch data from the integration layer. But it this case there is no user interaction. The CMS config defines the parameters of the API call. So we are able to make the calls in `getStaticProps`

These use the same APIs as the searches, except DoctorCards, which is not Yext but Doctify. So the query structure is different.

Dynamic templates:
- [BlogRelatedArticles](../../src/hcamain/src/components/BlogRelatedArticles/BlogRelatedArticles.tsx)
- [DoctorCards](../../src/hcamain/src/components/DoctorCards/DoctorCards.tsx)
- [LocationCards](../../src/hcamain/src/components/LocationCards/LocationCards.tsx)
- [PatientStoriesCards](../../src/hcamain/src/components/PatientStoriesCards/PatientStoriesCards.tsx)

Note that these templates export `getStaticProps`. This is a sitecore feature which allows you to export it in templates other than pages.

## Integration layer proxy

Most of the API calls to 3rd party APIs are gathered and exposed as endpoints in the integration layer.

The integration layer is IP restricted, so we can only access it from the Next server, and not client-side.

In order to access the integration layer APIs client-side, we have create a [proxy in NextJS API routes](../../src/hcamain/src/pages/api/api-layer/[...slug].ts)

We rewrite requests to to the API layer by using the env variable `NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH`.

The rewrite is defined in [NextJS config](../../src//hcamain/next.config.js)

## Payment form

[The payment form](../../src//hcamain/src/components/PaymentForm/PaymentForm.tsx) is a custom React form which consumed generates form fields based on data from the CMS.

This data includes validation logic. There are two types of validation data from the CMS unconditional and conditional.

The unconditional validation applies in all cases. The condition validation applies only if the checkbox for "different billing address to patient address" is selected. 

The validation is applied using Zod. But we don't use a form library since it is a fairly simple form.

## Sitecore Form builder styling

Site core has a form builder. Essentially this means the CMS user can create a form in e.g. Sitecore Pages editor, and it will render all the fields with configurable validation and submission logic.

It comes with styles out of the box, in the form of `<style>` tags which are added to the page.

In order to add our own custom styles, we disable these style tags after the page loads using intersection observer in the [site layout template](../../src/hcamain/src/Layout.tsx).

We then import a [global stylesheet](../../src/component-library/globals/_forms.module.scss) containing our style overrides.

As of time of writing, there is dispute about the long term maintainability of this approach. Sitecore have pushed an update since our first round of styles were signed off and tested. 

The changes were significant and broke our styles on the international telephone field. Sitecore have confirmed that they may push breaking changes at any time, and it is impossible to prevent them from affecting the live site...

This means we may have to strip back the styles from the original designs for form builder forms, and instead just apply custom fonts and colours. This would mitigate the risk of users being impacted breaking changes on the live site. But this is a discussion which needs to be had out with the correct stakeholders etc.

## Generic search
The [generic search](../../src/component-library/yext/YextSearch/YextSearch.tsx) is a custom implementation of [Yext React Search UI](https://hitchhikers.yext.com/docs/search/searchbar-react-component/). We use many of the OOB React components and either override their styles, or copy/paste the source code and modify it to meet our needs (e.g. for [Pagination](https://github.com/yext/search-ui-react/blob/main/src/components/Pagination.tsx))

The SearchBar and results make API calls directly to Yext servers using the Yext search SDK. It is not connected in any way to the integration layer or the Search components mentioned earlier.

This search also has an [interactive google maps instance](../../src/component-library/yext/YextResultSectionLocations/YextResultSectionLocations.adaptor.tsx).

## Image optimisation & cropping
The CMS has some capacity to crop and resize images in the DAM. But in order to improve client-side performance, we also resize images.

We use the NextJS Image component, but we abstract it so that we can default to the CMSable JSS Image component if the user is in the CMS editor.

The [abstraction component](../../src/hcamain/src/jss-abstractions/NextJssImage/NextJssImage.tsx) is used directly in many hcamain templates.

## ISR limit
The [main catch all page route](../../src/hcamain/src/pages/[[...path]].tsx) has ISR enabled (et exports getStaticProps and getStaticPaths). This means the pages are built statically then rebuild on demand at a configurable interval.

In order to reduce build times on this massive website, we limit the number of pages which have ISR enabled via the env variable `STATIC_BUILD_LIMIT`.

The logic to consume this variable is found in the getStaticPaths function of the template.

Note that this limit does not affect consultant finder, since it has its own catch-all page templates.

### Docs
- https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
- https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths


## isExperienceEditor
Many of the site templates reference this property `isExperienceEditor` in order to determine if the template is being rendered in the CMS editor, or to a user.

This allows us to switch between user optimised content e.g. Next Image components, or editable field component which contain extra metadata.

```
const { sitecoreContext } = useSitecoreContext();
const isExperienceEditor = sitecoreContext.pageEditing;
```

## Custom tracking GTM
There is limited custom tracking for GA4 implemented in the site. There is a Google Tag Manager snippet in the [scripts](../../src/hcamain/src/Scripts.tsx) template.

The tracking calls themselves are made via the hook [useCustomTracking](../../src/component-library/hooks/useCustomTracking/useCustomTracking.ts)

Essentially we add specific data attributed to elements in order to trigger the event listener to fire a dataLayer push on clicks which bubble to the body.

## useI18n
This tool is not just for translation but for getting values from a shared config.

We basically use it when we want the CMS to have one set of fields to result on multiple components.

There is a dictionary in config somewhere, generated by sitecore with the CMS values mapped to these strings

And this `t()` function of `useI18n` takes the key string and returns that value.

It's nice because we don't have to drill props, since the values are accessible via a [context provider](../../src/hcamain/src/pages/_app.tsx)

E.g. here the close button text is taken from useI18n.

```
const CloseButton = () => {
  const { t } = useI18n();
  return (
    <div className={close}>
      <TextLink>
        <button type="button" onClick={() => ref?.current?.close()}>
          <span>{t('close') || 'Close'}</span>
          <Icons iconName="iconCross" />
        </button>
      </TextLink>
    </div>
  );
};
```

### Docs

https://react.i18next.com/