import { Modal } from 'react-native';

import { ModalBody, Overlay } from './styles';

export default function CustomModal({ children, visible, onClose,presentationStyle }) {
  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}
      presentationStyle={presentationStyle}
      
    >
      <ModalBody>
        {children}
      </ModalBody>
      
    </Modal>
  );
}