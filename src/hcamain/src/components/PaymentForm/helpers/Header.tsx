import Icons from '@component-library/foundation/Icons/Icons';
import Text from '@component-library/foundation/Text/Text';
import FormProgressBar from '@component-library/site-components/FormProgressBar/FormProgressBar';

const Header = ({
  stage = 'Patient Details',
}: {
  stage?: 'Patient Details' | 'Confirmation' | 'Payment';
}) => (
  <>
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
