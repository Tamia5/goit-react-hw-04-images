import { GalletyItem } from './ImageGalleryItem.styled';
import { ModalImg } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  return (
    <GalletyItem data-img={largeImageURL} onClick={handleImageClick}>
      <img src={webformatURL} alt={tags} />
      {isModalOpen && (
        <ModalImg
          imageUrl={largeImageURL}
          tags={tags}
          isOpen={isModalOpen}
          onClose={handleImageClick}
        />
      )}
    </GalletyItem>
  );
};
