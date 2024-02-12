import React from 'react';

type NavProps = {
  params: {
    [key: string]: string;
  };
};

const MainNavigationfaultComponent = (props: NavProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Empty Nav</span>
    </div>
  </div>
);

export const Default = (props: NavProps): JSX.Element => {
  return <MainNavigationfaultComponent {...props} />;
};
