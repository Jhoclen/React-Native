import { Modal } from 'react-native';

import { ModalBody, Overlay } from './styles';

export default function CustomModal({ children, visible, onClose }) {
  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalBody>
        {children}
      </ModalBody>
      
    </Modal>
  );
}