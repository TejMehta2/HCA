import React, { useState } from 'react';

import TextField from '@component-library/core-components/TextField/TextField';
import Button from '@component-library/core-components/Button/Button';
import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import RichText from '@component-library/core-components/RichText/RichText';
import FormContainer from 'src/jss-abstractions/FormContainer/FormContainer';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';
import Link from 'next/link';

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const PregnancyCalculator: React.FC = () => {
  const [lmp, setLmp] = useState<string>('');

  // Variables to hold calculated dates.
  let lmpDate: Date | null = null;
  let estimatedDueDate: Date | null = null;
  let conceptionDate: Date | null = null;
  let pregnancyTestDate: Date | null = null;
  let fetalHeartbeatDate: Date | null = null;
  let firstMovementDate: Date | null = null;
  let endOfFirstTrimester: Date | null = null;
  let endOfSecondTrimester: Date | null = null;
  let gestationalAgeWeeks: number | null = null;

  if (lmp) {
    lmpDate = new Date(lmp);

    // Estimated Due Date using Naegele’s Rule: LMP + 280 days (40 weeks)
    estimatedDueDate = addDays(lmpDate, 280);

    // Approximate Conception Date: LMP + 14 days
    conceptionDate = addDays(lmpDate, 14);

    // Reliable Positive Pregnancy Test: around 5 weeks from LMP (LMP + 35 days)
    pregnancyTestDate = addDays(lmpDate, 35);

    // Fetal Heartbeat Detection Date: around 7 weeks from LMP (can vary with ultrasound method)
    fetalHeartbeatDate = addDays(lmpDate, 7 * 7); // 49 days

    // First Fetal Movement (Quickening): typically around 18 weeks from LMP
    firstMovementDate = addDays(lmpDate, 18 * 7); // 126 days

    // End of First Trimester: around 12 weeks from LMP
    endOfFirstTrimester = addDays(lmpDate, 12 * 7);

    // End of Second Trimester: around 27 weeks from LMP
    endOfSecondTrimester = addDays(lmpDate, 27 * 7);

    // Calculate gestational age based on current date
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - lmpDate.getTime();
    gestationalAgeWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
  }

  const updateResults = () => {
    const lmpInputDate = (document.getElementById('lmp') as HTMLInputElement)
      .value;

    setLmp(lmpInputDate);
  };

  return (
    <Themes theme="A-HCA-White">
      <Breadcrumbs>
        <TextLink>
          <a href="/">
            <Icons iconName="iconHome"></Icons>
            <span className="sr-only">{'Home'}</span>
          </a>
        </TextLink>
        <TextLink>
          <Link href={`${'/tools'}`}>{'Tools'}</Link>
        </TextLink>

        <span>{'Pregnancy calculator'}</span>
      </Breadcrumbs>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormContainer
          heading={
            <>
              <Text tag="p" variation="subheading-2">
                The Birth Company
              </Text>
              <Text tag="h1" variation="display-1">
                Pregnancy Calculator
              </Text>
            </>
          }
          copy={
            <RichText>
              <p>
                The Birth Company, in partnership with The Portland Hospital, is
                a leading clinic specialising in obstetric, fertility, and
                gynaecological ultrasound. Led by Managing Director Kate
                Richardson, we have clinics in Wimpole Street, London, and
                Alderley Edge, Cheshire.
              </p>
            </RichText>
          }
        >
          <TextField
            id={'lmp'}
            label={'When did your last menstrual period start?'}
            name={'lmp'}
            type={'date'}
            required={true}
            errorMessage={'Please enter a date'}
          />
          <Button variation="full-dark" size="large">
            <button onClick={updateResults}>Calculate</button>
          </Button>

          {lmp && lmpDate && (
            <div>
              <Text tag="p" variation="body-large">
                Your last menstrual period started on{' '}
                <strong>{formatDate(lmpDate)}</strong>
              </Text>
              <Text tag="p" variation="body-large">
                Congratulations! Your baby is estimated to arrive on{' '}
                <strong>
                  {estimatedDueDate && formatDate(estimatedDueDate)}
                </strong>
              </Text>
              <Text tag="p" variation="body-large">
                Conception occurred around{' '}
                <strong>{conceptionDate && formatDate(conceptionDate)}</strong>{' '}
                and a reliable positive pregnancy test can be done around{' '}
                <strong>
                  {pregnancyTestDate && formatDate(pregnancyTestDate)}
                </strong>
              </Text>

              <br />
              <Text tag="p" variation="body-large">
                Useful information based on your LMP
              </Text>
              <Text tag="p" variation="body-large">
                Based on your LMP, today you are{' '}
                <strong>{gestationalAgeWeeks} weeks pregnant!</strong>
              </Text>
              <Text tag="p" variation="body-large">
                Your baby&apos;s heart will start beating{' '}
                <strong>
                  {fetalHeartbeatDate && formatDate(fetalHeartbeatDate)}
                </strong>
              </Text>
              <Text tag="p" variation="body-large">
                Your baby&apos;s first move can be felt around{' '}
                <strong>
                  {firstMovementDate && formatDate(firstMovementDate)}
                </strong>
              </Text>
              <Text tag="p" variation="body-large">
                End of first trimester is around{' '}
                <strong>
                  {endOfFirstTrimester && formatDate(endOfFirstTrimester)}
                </strong>
              </Text>
              <Text tag="p" variation="body-large">
                End of second trimester is around{' '}
                <strong>
                  {endOfSecondTrimester && formatDate(endOfSecondTrimester)}
                </strong>
              </Text>
            </div>
          )}
        </FormContainer>
      </form>
    </Themes>
  );
};

export default PregnancyCalculator;
