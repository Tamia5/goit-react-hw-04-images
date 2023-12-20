import React, { Component } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const customStyles = {
  content: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};

const ImagModal = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

Modal.setAppElement('#root');

export class ModalImg extends Component {
  render() {
    const { imageUrl, tags, isOpen, onClose } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <ImagModal src={imageUrl} alt={tags}></ImagModal>
      </Modal>
    );
  }
}
