import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import styles from './ImageModal.module.scss';

interface Image {
  id: number;
  image: string;
}

interface ImageModalProps {
  images: Image[];
  selectedImage: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
}

export function ImageModal({
  images,
  selectedImage,
  onClose,
  onPrevious,
  onNext,
  onSelectImage
}: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (images && images[selectedImage]) {
      setIsLoading(true);
      setImageError(false);
      
      const img = new Image();
      img.src = images[selectedImage].image;
      
      img.onload = () => {
        setCurrentImageSrc(images[selectedImage].image);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setCurrentImageSrc("https://placehold.co/800x600/e0e0e0/969696?text=Image+Not+Available");
        setIsLoading(false);
        setImageError(true);
      };
    }
  }, [images, selectedImage]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/800x600/e0e0e0/969696?text=Image+Not+Available";
    target.alt = "Image not available";
    setImageError(true);
    
    if (styles.errorImage) {
      target.classList.add(styles.errorImage);
    }
  };

  // Обработчик для клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  return (
    <div 
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          <X size={24} />
        </button>

        {selectedImage > 0 && (
          <button
            onClick={onPrevious}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>
        )}
        
        {selectedImage < images.length - 1 && (
          <button
            onClick={onNext}
            className={`${styles.navButton} ${styles.navButtonRight}`}
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
        )}

        <div className={styles.mainImageContainer}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : images && images[selectedImage] ? (
            <img
              src={currentImageSrc}
              alt={`Full size image ${selectedImage + 1}`}
              className={`${styles.mainImage} ${imageError ? styles.errorImage : ''}`}
              onError={handleImageError}
            />
          ) : (
            <div className={styles.imageErrorContainer}>
              <ImageOff size={48} />
              <p>Изображение недоступно</p>
            </div>
          )}
        </div>

        <div className={styles.thumbnailsContainer}>
          <div className={styles.thumbnailsScroll}>
            <div className={styles.thumbnailsList}>
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`${styles.thumbnailItem} ${
                    index === selectedImage ? styles.selected : ''
                  }`}
                  onClick={() => onSelectImage(index)}
                >
                  <img
                    src={image.image}
                    alt={`Thumbnail ${index + 1}`}
                    className={styles.thumbnailImage}
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}