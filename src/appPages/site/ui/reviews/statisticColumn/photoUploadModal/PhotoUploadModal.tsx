import React, { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import styles from './PhotoUploadModal.module.scss';

interface PhotoUploadModalProps {
  onClose: () => void;
  onSend: (files: File[]) => void; // Колбэк для передачи файлов
}

interface UploadBlock {
  id: number;
  size: string;
  file: File | null;
  preview: string | null;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({ onClose, onSend }) => {
  const [selectedBlock, setSelectedBlock] = useState<number>(2);
  const [uploadBlocks, setUploadBlocks] = useState<UploadBlock[]>([
    { id: 0, size: '15x20', file: null, preview: null },
    { id: 1, size: '15x20', file: null, preview: null },
    { id: 2, size: '15x20', file: null, preview: null }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadBlocks(blocks => blocks.map(block => 
          block.id === selectedBlock 
            ? { ...block, file, preview: reader.result as string }
            : block
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlockClick = (blockId: number) => {
    setSelectedBlock(blockId);
    fileInputRef.current?.click();
  };

  const handleSendClick = () => {
    const files = uploadBlocks
      .filter(block => block.file)
      .map(block => block.file) as File[];

    // Передаем файлы в родительский компонент
    onSend(files);

    // Закрываем модалку
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className={styles.title}>Here you can upload a photo</h2>
        
        <div className={styles.uploadContainer}>
          {uploadBlocks.map((block) => (
            <div
              key={block.id}
              className={`${styles.uploadBlock} ${selectedBlock === block.id ? styles.selected : ''}`}
              onClick={() => handleBlockClick(block.id)}
            >
              {block.preview ? (
                <div className={styles.previewContainer}>
                  <img src={block.preview} alt="Preview" className={styles.preview} />
                </div>
              ) : (
                <>
                  <Plus className={styles.uploadIcon} size={32} />
                  <span className={styles.uploadText}>Upload photo</span>
                  <span className={styles.sizeText}>{block.size}</span>
                </>
              )}
            </div>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.hiddenInput}
        />

        <button 
          className={styles.sendButton}
          onClick={handleSendClick}
          disabled={!uploadBlocks.some(block => block.file)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadModal;