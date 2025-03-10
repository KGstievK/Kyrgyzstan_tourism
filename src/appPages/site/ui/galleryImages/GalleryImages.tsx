import React, { useCallback, useEffect, useState } from 'react';
import styles from './GalleryImages.module.scss';
import { ImageModal } from '../imageModal/ImageModal';
import { MdPhotoCamera } from 'react-icons/md';


interface ImageGridProps {
  images: {
    id: number;
    image: string;
  }[];
}

const GalleryImages: React.FC<ImageGridProps> = ({ images }) => {
  const largeImages = images.slice(0, 2);
  const smallImages = images.slice(2);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  images.forEach((el,i) => console.log(i))
  
    
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch (e.key) {
      case 'Escape':
        setSelectedImage(null);
        break;
      case 'ArrowLeft':
        if (selectedImage > 0) {
          setSelectedImage(selectedImage - 1);
        }
        break;
      case 'ArrowRight':
        if (selectedImage < images.length - 1) {
          setSelectedImage(selectedImage + 1);
        }
        break;
    }
  }, [selectedImage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  // Группируем маленькие изображения по 4
  const smallImageGroups = [];
  for (let i = 0; i < smallImages.length; i += 4) {
    smallImageGroups.push(smallImages.slice(i, i + 4));
  }

  return (
    <div className={styles.imageGrid}>
      {/* Крупные изображения */}
      {selectedImage !== null && (
        <ImageModal
          images={images || []}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelectImage={setSelectedImage}
        />
      )}
      {largeImages.map((img,i) => (
        <div key={img.id} className={`${styles.imageWrapper} ${styles.large}`}>
          <img
            src={img.image}
            alt={`Kitchen ${img.id}`}
            className={styles.image}
            loading="lazy"
            onClick={() => setSelectedImage(images.findIndex(el => el.id === img.id))}
          />
        </div>
      ))}
        <button onClick={() => setSelectedImage(0)} className={styles.showImages}><MdPhotoCamera color='#fff' /> Show all ({images.length})</button>
      {/* Группы по 4 маленьких изображения */}
      {smallImageGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.smallGroup}>
          {group.map((img,i) => (
            <div key={img.id} className={styles.smallImageWrapper}>
              <img
                src={img.image}
                alt={`Kitchen ${img.id}`}
                className={styles.image}
                loading="lazy"
                onClick={() => {
                  setSelectedImage(images.findIndex(el => el.id === img.id))
                  console.log("item " + (groupIndex++ + i));
                  console.log("item mini " + (i));

                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GalleryImages;