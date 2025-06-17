import React from 'react';
import colourVars from './Colours.demo.module.scss';
import Text from '../Text/Text';
import { ColourProps, ColourGroupProps } from './Colours.demo.types';

// Convert the color key to the color proper name.
const getColourName = (colour: string) => {
  const array = colour.split('-');
  array.shift();
  return `${array.join(' ').toLowerCase()}`;
};

/* Individual Colour Block */
const Colour = (props: ColourProps) => {
  const { colour } = props;

  return (
    <li
      style={{
        borderRadius: '5px',
        padding: '5px',
      }}
    >
      <span
        style={{
          backgroundColor: colourVars[colour],
          display: 'block',
          height: '90px',
          marginBottom: '8px',
          border: '1px solid lightgray',
        }}
      />
      <Text tag="p" variation="body-bold-medium">
        {getColourName(colour)}
      </Text>
      <Text tag="p" variation="body-medium">
        {colourVars[colour]}
      </Text>
    </li>
  );
};

// A component for displaying a group of colors.
const ColourGroup = (props: ColourGroupProps) => {
  const { group } = props;
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 175px))',
        gridGap: '13px',
        marginBottom: '24px',
        listStyle: 'none',
      }}
    >
      {group.map((colour) => {
        return <Colour colour={colour} key={colour} />;
      })}
    </ul>
  );
};

/* Filter colour array to only include a certain section */
const filterGroup = (filter: string) =>
  Object.keys(colourVars).filter((colour) => colour.indexOf(filter) === 0);

const ColourContainer = () => {
  return (
    <div style={{ padding: '20px' }}>
      <>
        <h3>Primary Colours</h3>
        <ColourGroup group={filterGroup('teal')} />
        <ColourGroup group={filterGroup('navy')} />
        <ColourGroup group={filterGroup('denim')} />
        <ColourGroup group={filterGroup('white')} />
      </>
      <>
        <h3>Secondary Colours</h3>
        <ColourGroup group={filterGroup('fern')} />
        <ColourGroup group={filterGroup('goldenrod')} />
        <ColourGroup group={filterGroup('tangerine')} />
        <ColourGroup group={filterGroup('orange')} />
        <ColourGroup group={filterGroup('red')} />
      </>
    </div>
  );
};

export default ColourContainer;
