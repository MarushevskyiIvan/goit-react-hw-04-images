import { ItemModal } from 'components/modal/ItemModal';
import { useState } from 'react';
import { ImageGalleryImage, ImageGalleryLi } from './ImageGallery.styled';

export const ImageGalleryItem = ({
  images: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(prevState => !prevState);
  };

  return (
    <>
      <ImageGalleryLi onClick={toggleModal}>
        <ImageGalleryImage src={webformatURL} alt={tags} />
      </ImageGalleryLi>
      <ItemModal
        isOpen={isModalOpen}
        isClose={toggleModal}
        image={largeImageURL}
        alt={tags}
      />
    </>
  );
};
