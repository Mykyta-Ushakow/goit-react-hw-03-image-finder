import React, { Component } from 'react';
import { ModalOverlay } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.key === 'Escape' || e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <ModalOverlay onClick={this.handleClose}>
        <div className="Modal">
          <img src={this.props.imageUrl} alt="Large version" />
        </div>
      </ModalOverlay>
    );
  }
}
