import axios from 'axios';
import { ILogEmailFields } from 'lib/consultant-finder/API_HCA';
import { useEffect } from 'react';

/**
 * Rendered in case we need to email for the 404
 */
const Log404Email = (): JSX.Element => {
  useEffect(() => {
    console.log('in use effect');
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
  console.log('postData dataToSend', dataToSend);
  axios
    .post(`https:/api/formAPI/PostLogEmail`, dataToSend)
    .then((resp) => {
      console.log(resp?.data);
      /*
    setErrorData(false);
    setLoadingData(false);
    setInsurers(resp?.data?.insurers || []);
    setPractices(resp?.data?.practices || []);
    setConsulantName(
      `${resp?.data?.title} ${resp?.data?.firstName} ${resp?.data?.lastName}`
    );
    // top specialty
    const topSpecialty = resp?.data?.keywords?.filter(
      (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
    );
    setTopSpecialty(topSpecialty[0]?.name || '');*/
    })
    .catch((error) => {
      /*
    setErrorData(true);
    setLoadingData(false);*/
      console.log(error);
    });

  //await PostLogEmail(dataToSend);

  /*const res = */ //await submitLogEmail(dataToSend);
  //console.log('postData res', res);
};

export default Log404Email;
