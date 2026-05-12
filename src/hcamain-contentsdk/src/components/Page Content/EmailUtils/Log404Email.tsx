'use client';

import axios from 'axios';
import { type JSX, useEffect } from 'react';

interface ILogEmailFields {
  profileType: string;
  freeText: string;
}

/**
 * Rendered in case we need to email for the 404
 */
const Log404Email = (): JSX.Element => {
  useEffect(() => {
    postData(`user landed on 404 page from ${window.location.pathname}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

const postData = async (freeText: string) => {
  const dataToSend: ILogEmailFields = {
    profileType: '404Report',
    freeText: freeText,
  };
  axios.post(`https:/api/formAPI/PostLogEmail`, dataToSend).catch((error) => {
    console.error(error);
  });
};

export default Log404Email;
