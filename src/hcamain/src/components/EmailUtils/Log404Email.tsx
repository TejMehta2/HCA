import axios from 'axios';
import { ILogEmailFields } from 'lib/consultant-finder/API_HCA';
import { useEffect } from 'react';

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
