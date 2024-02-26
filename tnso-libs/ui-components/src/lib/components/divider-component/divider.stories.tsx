import { Meta } from '@storybook/react';
import { TNSOContainer } from '../../containers/container';
import { TNSODivider } from './divider-component';
import TNSOCard from '../card-component/card-component';
import { TypesDivider } from './divider-component.model';

const meta = {
  component: TNSODivider,
  title: 'Components/Divider',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSODivider>;

export default meta;

export const Horizontal = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <p>Some Content...</p>
    <TNSODivider plain type={TypesDivider.horizontal} />
    <p>Some Content...</p>
  </TNSOContainer>
);

export const Vertical = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <p>Some Content...</p>
    <TNSODivider plain type={TypesDivider.vertical} />
    <p>Some Content...</p>
  </TNSOContainer>
);
