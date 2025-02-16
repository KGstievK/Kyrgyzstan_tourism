import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ImageModal.module.scss'; // Импорт SCSS-модуля

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
  return (
    <div 
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modalContent}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          <X size={24} />
        </button>

        {/* Navigation buttons */}
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

        {/* Main Image */}
        <div className={styles.mainImageContainer}>
          <img
            src={images[selectedImage].image}
            alt={"image"}
            className={styles.mainImage}
          />
        </div>

        {/* Thumbnails */}
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
                    alt={"image"}
                    className={styles.thumbnailImage}
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
