import React, { Component } from 'react';
import { GalletyItem } from './ImageGalleryItem.styled';
import { ModalImg } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleImageClick = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;

    return (
      <GalletyItem data-img={largeImageURL} onClick={this.handleImageClick}>
        <img src={webformatURL} alt={tags} />
        {isModalOpen && (
          <ModalImg
            imageUrl={largeImageURL}
            tags={tags}
            isOpen={isModalOpen}
            onClose={this.handleImageClick}
          />
        )}
      </GalletyItem>
    );
  }
}
