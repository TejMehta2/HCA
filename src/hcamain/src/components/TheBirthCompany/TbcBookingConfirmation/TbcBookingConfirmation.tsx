import React from 'react';
import {
  Text as JssText,
  Link as JssLink,
  RichText as JssRichText,
  useSitecoreContext,
  useComponentProps,
  GetServerSideComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useSearchParams } from 'next/navigation';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import PaymentSummary from '@component-library/site-components/PaymentSummary/PaymentSummary';
import ConfirmationSummary from '@component-library/components/ConfirmationSummary/ConfirmationSummary';
import HeaderText from '@component-library/site-components/HeaderText/HeaderText';
import RichText from '@component-library/core-components/RichText/RichText';
import {
  TbcBookingConfirmationProps,
  TransactionStatusResponse,
} from './TbcBookingConfirmation.types';
import FormContainer from 'src/jss-abstractions/FormContainer/FormContainer';
import NeedHelp from '@component-library/consultant-finder/NeedHelp/NeedHelp';
import CFAside from '@component-library/consultant-finder/CFAside/CFAside';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;

const TbcBookingConfirmationDefaultComponent = (
  props: TbcBookingConfirmationProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Tbc Booking Confirmation please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: TbcBookingConfirmationProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const transactionStatus = useComponentProps<TransactionStatusResponse>(
    props.rendering?.uid
  );

  const searchParams = useSearchParams();
  const paramErrors = searchParams.get('error');

  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <TbcBookingConfirmationDefaultComponent {...props} />;
  }

  if (transactionStatus?.status !== 'Successful' || paramErrors) {
    return (
      <HeaderText
        fullHeight={false}
        title={
          <Text
            variation={props.params?.HeadingSize || 'display-3'}
            tag={props.params?.HeadingTag || 'h2'}
          >
            <JssText field={props.fields?.ErrorTitle} />
          </Text>
        }
        error={<JssText field={props.fields?.ErrorMessage} />}
        description={
          <RichText>
            <JssRichText field={props.fields?.ErrorText} />
          </RichText>
        }
        cta={
          isExperienceEditor ? (
            <JssLink field={props.fields?.ErrorCTALink}></JssLink>
          ) : props.fields.ErrorCTALink?.value.href &&
            props.fields?.ErrorCTALink ? (
            <Button size={'large'} variation={'full'}>
              <JssLink
                href={`${props.fields.ErrorCTALink?.value.href}${
                  props.retryQuerystring || ''
                }`}
                field={props.fields?.ErrorCTALink}
              >
                {props?.fields?.ErrorCTAIcon && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props.fields?.ErrorCTAIcon?.fields?.SvgMarkup?.value ||
                        '',
                    }}
                  />
                )}
                {props?.fields?.ErrorCTALink?.value?.text && (
                  <JssRichText
                    field={{
                      value: props.fields?.ErrorCTALink?.value?.text,
                    }}
                  />
                )}
              </JssLink>
            </Button>
          ) : (
            <></>
          )
        }
      />
    );
  }

  const date = new Date(props.appointmentDateTime);

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDateTime = new Intl.DateTimeFormat(
    'en-GB',
    dateTimeOptions
  ).format(date);

  const [formattedDate, formattedTime] = formattedDateTime.split(', ');

  const options = [
    {
      title: 'Scan',
      text: props.serviceName,
    },
    {
      title: 'Date',
      text: formattedDate,
    },
    {
      title: 'Time',
      text: formattedTime.toLowerCase().replace(/\s/g, ''),
    },
    {
      title: 'Type',
      text: props.type,
    },
    {
      title: 'Location',
      text: props.location,
    },
  ];

  if (props.extras) {
    options.splice(1, 0, {
      title: 'Extras',
      text: props.extras,
    });
  }

  return (
    <>
      <FormContainer
        heading={<></>}
        copy={
          <PaymentSummary
            isFlex={true}
            heading={
              <Text
                variation={props.params?.HeadingSize || 'display-4'}
                tag={props.params?.HeadingTag || 'h2'}
              >
                <JssText field={props.fields?.Title} />
              </Text>
            }
            bodyText={
              <RichText>
                <JssRichText field={props.fields?.Text} />
              </RichText>
            }
            summary={
              <ConfirmationSummary
                title={<JssText field={props.fields?.SummaryTitle} />}
                optionalItems={options}
                noSpacing={true}
              />
            }
          />
        }
        aside={
          <CFAside>
            <NeedHelp
              headline={
                //props?.fields?.LiveBookingFormContactBoxHeadline?.value ||
                'Need help?'
              }
              subheadline={
                //props?.fields?.LiveBookingFormContactBoxPhone0Label?.value ||
                'General enquiries'
              }
              workingHoursHeadline={
                //props?.fields?.LiveBookingFormContactBoxOpeningHoursLabel?.value ||
                'Opening hours'
              }
              workingHours={
                //props?.fields?.LiveBookingFormContactBoxOpeningHoursDays?.value ||
                'Mon – Fri'
              }
              workingHoursTime={
                //props?.fields?.LiveBookingFormContactBoxOpeningHoursTime?.value ||
                '8am – 6pm'
              }
              phoneNumber={
                //props?.fields?.LiveBookingFormContactBoxPhone0Phone?.value ||
                '020 3797 7236'
              }
            />
          </CFAside>
        }
      >
        <>
          <div>
            <Text tag="h3" variation="body-bold-extra-large">
              Next steps
            </Text>
            <RichText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse.
            </RichText>
          </div>
          <div>
            <Text tag="h3" variation="body-bold-extra-large">
              How to amend your booking
            </Text>
            <RichText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse.
            </RichText>
          </div>
          <Button variation="full-dark" size="large">
            <a href="/">Go to Homepage</a>
          </Button>
        </>
      </FormContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideComponentProps = async (
  _,
  layoutData,
  context
) => {
  const { query } = context;
  console.log(layoutData);
  let response;
  const transactionId = `transactionId=${query['transaction_id']}`;
  const site = `site=${layoutData.sitecore.context.site?.name}`;
  const itemPath = `itemPath=${layoutData.sitecore.context.itemPath}`;

  try {
    response = await fetch(
      `${SERVER_API_URL}/tbcbooking/transactionstatus/hca/payment/1/en?${transactionId}&${site}&${itemPath}`
    );
    const transactionStatus = await response.json();
    return transactionStatus?.response;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.log(await response?.text?.());
    return;
  }
};
