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
  
  // Проверка наличия изображений
  const hasImages = images && images.length > 0;
  
  // Функция для обработки ошибок загрузки изображений
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400/e0e0e0/969696?text=Image+Not+Found";
    target.alt = "Image not available";
  };
    
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
  }, [selectedImage, images.length]);

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
      {!hasImages ? (
        <div className={styles.noImagesContainer || ""}>
          <div className={styles.noImagesContent || ""}>
            <MdPhotoCamera size={50} color="#888" />
            <h3>Изображения отсутствуют</h3>
            <p>В данном разделе пока нет загруженных изображений</p>
          </div>
        </div>
      ) : (
        <>
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
                alt={`Image ${img.id}`}
                className={styles.image}
                loading="lazy"
                onClick={() => setSelectedImage(images.findIndex(el => el.id === img.id))}
                onError={handleImageError}
              />
            </div>
          ))}
          {images.length > 0 && (
            <button onClick={() => setSelectedImage(0)} className={styles.showImages}>
              <MdPhotoCamera color='#fff' /> Show all ({images.length})
            </button>
          )}
          {/* Группы по 4 маленьких изображения */}
          {smallImageGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.smallGroup}>
              {group.map((img,i) => (
                <div key={img.id} className={styles.smallImageWrapper}>
                  <img
                    src={img.image}
                    alt={`Image ${img.id}`}
                    className={styles.image}
                    loading="lazy"
                    onClick={() => {
                      setSelectedImage(images.findIndex(el => el.id === img.id))
                      console.log("item " + (groupIndex + i + 1));
                      console.log("item mini " + i);
                    }}
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GalleryImages;