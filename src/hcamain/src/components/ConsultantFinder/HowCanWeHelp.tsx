// import { middlewareCF } from '../../middleware';

import Link from 'next/link';

import {
  Field,
  // GetServerSideComponentProps,
  // GetStaticComponentProps,
  useComponentProps,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

// const URL =
//   'https://api.doctify.com/api/hca/search?sortType=nearest&search=Dermatology&keywordId=2924&lat=51.5072178&lon=-0.1275862&distance=700&limit=12';

type ComponentData = {
  rendering: ComponentRendering;
  fields: {
    Title: Field<string>;
    SessionizeURL: Field<string>;
  };
};

const CdpPageView = (props: ComponentData) => {
  const externalData = useComponentProps<string>(props.rendering.uid);
  // You can use the searchData in your component
  console.log('searchData: ', externalData);
  console.log('post', props.rendering);

  // const test = middlewareCF();

  return (
    <>
      <h1>How can we help you?</h1>
      <Link href="/Finder/Step-Payment?test=Andy">Next</Link>
    </>
  );
};

// export const getStaticProps: GetStaticComponentProps = async (
//   rendering,
//   layoutData,
//   context
// ) => {
//   const post = await fetch(URL).then(
//     (res) => `${res.json()}, ${JSON.stringify(context)}`
//   );
//   return post;
// };

// export const getServerSideProps: GetServerSideComponentProps = async (
//   _rendering,
//   _layoutData
// ) => {
//   const post = await fetch(URL).then((res) => res.json());
//   return post;
// };

export default CdpPageView;
