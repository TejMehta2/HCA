import findClosestAttribute from './findClosestAttribute';

// This function enables us to add two custom tracking attributes to any element.
// When present, if the element or a child element (usually button or anchor) receives a click event which bubbled to the document, then we use the value of that attribute for the dataLayer tracking event.
// E.g. if we add `navigationType='breadcrumbDesktop` to the outer wrapper element of the breadcrumb component. Then any links nested inside will use this attribute when the dataLayer event is triggered.

const handleClickEvents = (clickEvent: MouseEvent) => {
  try {
    const target = clickEvent.target as HTMLAnchorElement | HTMLButtonElement;

    // format the submission data
    window.dataLayer = window.dataLayer || [];
    const data = {
      event: findClosestAttribute('data-event', target),
      navigationType: findClosestAttribute('data-navigation-type', target),
    };
    // escape when not a valid event
    if (!data.event || !data.navigationType) return;
    window.dataLayer.push(data);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }
};

export default handleClickEvents;
