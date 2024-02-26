import { Meta } from '@storybook/react';
import { TNSOContainer } from '../../containers/container';
import { TNSOModal } from './modal-component';
import TNSOButton from '../button-component/button-component';
import React from 'react';

const meta = {
  component: TNSOModal,
  title: 'Components/Modal',
  tags: ['autodocs'],
} satisfies Meta<typeof TNSOModal>;

export default meta;

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <TNSOContainer
      className="dark-theme"
      style={{
        backgroundColor: '#0F0F1A',
        height: '100vh',
        width: '90%',
      }}
    >
      <TNSOButton
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Modal
      </TNSOButton>
      <TNSOModal
        open={open}
        theme='light'
        textCancelButton="Cancel"
        textOkButton="Accept"
        handleCancel={() => setOpen(false)}
        handleAccept={() => setOpen(false)}
        title="Do you want delete this file?"
      >
        <p>This is a simple demo</p>
        <p>Some content...</p>
      </TNSOModal>
    </TNSOContainer>
  );
};
