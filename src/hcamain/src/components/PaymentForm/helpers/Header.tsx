import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';
import Text from '@component-library/foundation/Text/Text';
import FormProgressBar from '@component-library/site-components/FormProgressBar/FormProgressBar';
import PaymentFormHeader from '@component-library/site-components/PaymentFormHeader/PaymentFormHeader';

const Header = ({
  stage = 'Patient Details',
}: {
  stage?: 'Patient Details' | 'Confirmation' | 'Payment';
}) => (
  <>
    <PaymentFormHeader
      paymentsText="Secure Online Payments"
      contactText="Any questions?"
      phoneNumber={{
        icon: <Icons iconName="iconPhone" />,
        text: '03332 223 133',
        number: '03332223133',
      }}
      openingHours={{
        icon: <Icons iconName="iconClock" />,
        text: 'Mon-Fri 9am - 5:30pm',
      }}
      close={
        <TextLink>
          <a href="/">
            <span>Close</span>
            <Icons iconName="iconCross" />
          </a>
        </TextLink>
      }
    />
    <FormProgressBar
      pages={[
        {
          pageControl: (
            <div>
              <Icons iconName="iconInfo" />
              <Text variation="body-medium-extra-large">Patient Details</Text>
            </div>
          ),
          stage: stage === 'Patient Details' ? 'active' : 'inactive',
        },
        {
          pageControl: (
            <div>
              <Icons iconName="iconCreditCard" />
              <Text variation="body-bold-extra-large">Payment</Text>
            </div>
          ),
          stage: stage === 'Payment' ? 'active' : 'inactive',
        },
        {
          pageControl: (
            <div>
              <Icons iconName="iconCheckCircle" />
              <Text variation="body-medium-extra-large">Confirmation</Text>
            </div>
          ),
          stage: stage === 'Confirmation' ? 'active' : 'inactive',
        },
      ]}
    />
  </>
);
export default Header;
