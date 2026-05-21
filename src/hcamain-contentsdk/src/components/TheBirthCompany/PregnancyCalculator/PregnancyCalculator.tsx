import React, { useState } from 'react';

import TextField from '@component-library/core-components/TextField/TextField';
import Button from '@component-library/core-components/Button/Button';
import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import RichText from '@component-library/core-components/RichText/RichText';
import FormContainer from 'src/jss-abstractions/FormContainer/FormContainer';
import {
  useSitecoreContext,
  RichText as JssRichText,
  Text as JssText,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAText?: { jsonValue?: Field<string> };
      lastMenstrualPeriodFieldLabel?: { jsonValue?: Field<string> };
    };
  };
}

type PregnancyCalculatorProps = {
  params?: Params;
  fields?: Fields;
};

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

const PregnancyCalculatorDefaultComponent = (
  props: PregnancyCalculatorProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Pregnancy Calculator. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: PregnancyCalculatorProps): JSX.Element => {
  const [lmp, setLmp] = useState<string>('');
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <PregnancyCalculatorDefaultComponent {...props} />;
  }

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
  let daysSinceLmp: number | null = null;
  let infoMessage: string | null = null;

  if (lmp) {
    lmpDate = new Date(lmp);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - lmpDate.getTime();
    daysSinceLmp = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Check if LMP is in the future.
    if (daysSinceLmp < 0) {
      infoMessage =
        'Your LMP date is from the future. Please enter a date from the past (at least 35 days ago).';
    } else if (daysSinceLmp < 35) {
      const daysLeft = 35 - daysSinceLmp;
      infoMessage = `It's too early to say you're pregnant. Please wait another ${daysLeft} day${
        daysLeft === 1 ? '' : 's'
      } for a reliable calculation.`;
      //  Check if over 43 weeks (301 days)
    } else if (daysSinceLmp > 301) {
      infoMessage =
        'The date entered is over 43 weeks ago, which is beyond the normal pregnancy duration. Please check the date and try again.';
    } else {
      // Calculate milestones based on the assumption of a 28-day cycle.
      estimatedDueDate = addDays(lmpDate, 280); // LMP + 280 days (40 weeks)
      conceptionDate = addDays(lmpDate, 14); // Approximately 14 days after LMP
      pregnancyTestDate = addDays(lmpDate, 35); // About 35 days after LMP
      fetalHeartbeatDate = addDays(lmpDate, 49); // Around 7 weeks (49 days)
      firstMovementDate = addDays(lmpDate, 126); // Approximately 18 weeks (126 days)
      endOfFirstTrimester = addDays(lmpDate, 84); // Around 12 weeks (84 days)
      endOfSecondTrimester = addDays(lmpDate, 189); // Around 27 weeks (189 days)
      gestationalAgeWeeks = Math.floor(daysSinceLmp / 7);
    }
  }

  const updateResults = () => {
    const lmpInputDate = (document.getElementById('lmp') as HTMLInputElement)
      .value;

    setLmp(lmpInputDate);
  };

  return (
    <Themes theme="A-HCA-White">
      <form onSubmit={(e) => e.preventDefault()}>
        <FormContainer
          heading={
            <>
              {props.fields?.data?.item?.heading?.jsonValue && (
                <Text tag="p" variation="subheading-2">
                  <JssText
                    field={props.fields?.data?.item?.heading?.jsonValue}
                  />
                </Text>
              )}
              {props.fields?.data?.item?.title?.jsonValue && (
                <Text tag="h1" variation="display-1">
                  <JssText field={props.fields?.data?.item?.title?.jsonValue} />
                </Text>
              )}
            </>
          }
          copy={
            <>
              {props?.fields?.data?.item?.text?.jsonValue && (
                <RichText>
                  <JssRichText
                    tag="span"
                    field={props.fields.data.item.text.jsonValue}
                  />
                </RichText>
              )}
            </>
          }
        >
          <TextField
            id={'lmp'}
            label={
              props?.fields?.data?.item?.lastMenstrualPeriodFieldLabel
                ?.jsonValue?.value ||
              'When did your last menstrual period start?'
            }
            name={'lmp'}
            type={'date'}
            required={true}
            errorMessage={'Please provide your LMP date.'}
          />
          <Button variation="full-dark" size="large">
            <button onClick={updateResults}>
              {isExperienceEditor ||
              props.fields.data?.item?.cTAText?.jsonValue?.value ? (
                <JssText
                  field={props.fields.data?.item?.cTAText?.jsonValue}
                ></JssText>
              ) : (
                'Calculate'
              )}
            </button>
          </Button>

          {lmp && infoMessage && (
            <Text tag="p" variation="body-large">
              {infoMessage}
            </Text>
          )}
          {lmp && lmpDate && !infoMessage && (
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
