import { Modal, ConfigProvider } from 'antd';
import { TNSOModalProps } from './modal-component.model';
import { dark, light } from './modal-theme';
import { useTheme } from '../../hooks/useTheme';
import TNSOButton from '../button-component/button-component';
import './modal-component.scss';
import { Variants } from '../button-component/button-component.model';

export function TNSOModal(props: TNSOModalProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);

  return (
    <ConfigProvider theme={theme}>
      <Modal {...props} centered={true} footer={null} closable={false}>
        {props.children}
        <div className="tnso-modal-buttons-container">
          <TNSOButton variant={Variants.Secondary} onClick={props.handleCancel}>
            {props.textCancelButton}
          </TNSOButton>
          <TNSOButton variant={Variants.Primary} onClick={props.handleAccept}>
            {props.textOkButton}
          </TNSOButton>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default TNSOModal;
