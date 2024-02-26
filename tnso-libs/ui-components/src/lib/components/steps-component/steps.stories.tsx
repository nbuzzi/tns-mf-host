import { Meta } from '@storybook/react';
import { TNSOContainer } from '../../containers/container';
import { TNSOSteps } from './steps-component';

const meta = {
  component: TNSOSteps,
  title: 'Components/Steps',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSOSteps>;

export default meta;

export const Vertical = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
    }}
  >
    <TNSOSteps
      direction="vertical"
      progressDot
      current={1}
      items={[
        {
          title: 'Step 1',
          description: 'This is step 1',
        },
        {
          title: 'Step 2',
          description: (
            <>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
              <div> STEP 2</div>
            </>
          ),
        },
        {
          title: 'Step 3',
          disabled: true,
          description: 'This is step 3',
        },
      ]}
    />
  </TNSOContainer>
);
