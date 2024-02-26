import { Meta } from '@storybook/react';
import TNSOActionButton from './action-button-component';
import TNSOContainer from '../../../containers/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faAsterisk } from '@fortawesome/free-solid-svg-icons';

const meta = {
  component: TNSOActionButton,
  title: 'Components/ActionButton',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSOActionButton>;

export default meta;

const data = [
  {
    text: 'Item 1',
    icon: <FontAwesomeIcon icon={faCompass} />,
    disabled: false,
    onClick: () => {
      console.log('Item 1 clicked');
    },
    onChange: () => {
      console.log('Item 1 changed');
    },
  },
  {
    text: 'Item 2',
    icon: <FontAwesomeIcon icon={faAsterisk} />,
    disabled: true,
    onClick: async () => {
      console.log('Item 2 clicked');
    },
    onChange: () => {
      console.log('Item 2 changed');
    },
  },
  {
    text: 'Item 3',
    icon: <FontAwesomeIcon icon={faCompass} />,
    disabled: false,
    onClick: async () => {
      console.log('Item 2 clicked');
    },
    onChange: () => {
      console.log('Item 2 changed');
    },
  }

];

export const WithIcons = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: '#0F0F1A',
      height: '100vh',
      width: '90%',
    }}
  >
    <TNSOActionButton
      actionsButtons={data}
    />
  </TNSOContainer>
);
