import { ILogEmailFields, submitLogEmail } from 'lib/consultant-finder/API_HCA';
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
  return (
    <>
      <div style={{ padding: 10 }}>
        <h1>EMAIL</h1>
      </div>
    </>
  );
};

const postData = async (freeText: string) => {
  const dataToSend: ILogEmailFields = {
    profileType: '404Report',
    freeText: freeText,
  };
  //console.log('postData dataToSend', dataToSend);
  /*const res = */ await submitLogEmail(dataToSend);
  //console.log('postData res', res);
};

export default Log404Email;
