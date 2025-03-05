import React from 'react';
import scss from './Hotel_map.module.scss';

const Hotel_map = () => {
  return (
      <div className={scss.mapWrapper}>
        {/* Вставьте iframe или компонент карты Google с маркерами */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d78.12345678901234!3d12.345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIwJzQ1LjYiTiA3OMKwMDcnNDEuNiJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          // allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
  );
};

export default Hotel_map;