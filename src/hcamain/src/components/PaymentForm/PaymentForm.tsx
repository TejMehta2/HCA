import React from 'react';

// Define props interface
interface Props {
  name: string;
}

// Define functional component
const Default: React.FC<Props> = ({ name }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
};

export default Default;
