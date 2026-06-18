'use client';

import { useEffect } from 'react';

const FORM_INSTANCE_UID_SELECTOR = 'input[name="HiddenFormInstanceUID"]';
const GENERATED_UID_ATTRIBUTE = 'data-hca-generated-form-instance-uid';

const updateFormInstanceUids = () => {
  document
    .querySelectorAll<HTMLInputElement>(FORM_INSTANCE_UID_SELECTOR)
    .forEach((input) => {
      if (input.getAttribute(GENERATED_UID_ATTRIBUTE) === 'true') {
        return;
      }

      const instanceUid = crypto?.randomUUID?.()

      input.value = instanceUid;
      input.setAttribute('value', instanceUid);
      input.setAttribute(GENERATED_UID_ATTRIBUTE, 'true');
    });
};

const FormInstanceUidObserver = () => {
  useEffect(() => { 

    const observer = new MutationObserver(updateFormInstanceUids);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default FormInstanceUidObserver;
