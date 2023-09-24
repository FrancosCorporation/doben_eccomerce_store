"use client"
import React, { useState } from 'react';
import styles from './produto.module.css';

interface ProductProps {
  title: string;
  price: number;
  discountedPrice: number;
  imageUrls: string[];
}

const Product: React.FC<ProductProps> = ({ title, price, discountedPrice, imageUrls }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleClickOnDot = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleZoomClick = () => {
    setIsZoomed(!isZoomed);
    setIsImageVisible(!isZoomed);
  };

  const handleCloseClick = () => {
    setIsZoomed(false);
    setIsImageVisible(true);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', margin: '25px' }}>
      <div
        style={{
          width: '232px',
          height: '298px',
          left: '0px',
          top: '0px',
          position: 'relative',
          opacity: 0.25,
          background: 'linear-gradient(245deg, #C7E3EF 66%, #ED7160 98%)',
          boxShadow: '15px 15px 6px rgba(0, 0, 0, 0.25)',
          borderRadius: '25px',
          border: '0.50px black solid',
        }}
      >{isImageVisible && (
        <img
          src={imageUrls[currentImageIndex]}
          alt={title}
          style={{
            width: '232px',
            height: '212px',
            position: 'absolute',
            borderTopLeftRadius: '25px',
            borderTopRightRadius: '25px',
            border: '0.50px black solid',
            cursor: 'pointer',
          }}
        />
      )}</div>
      <div
        style={{
          width: '116px',
          height: '18px',
          left: '58px',
          top: '276px',
          position: 'absolute',
        }}
      >
        <div
          style={{
            width: '116px',
            height: '18px',
            left: '0px',
            top: '0px',
            position: 'absolute',
            background: '#0B0F1C',
            boxShadow: '7px 2px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '50px',
          }}
        ></div>
        <div
          style={{
            width: '19px',
            height: '10px',
            left: '49px',
            top: '4px',
            position: 'absolute',
            color: 'white',
            fontSize: '8px',
            fontFamily: 'Inter',
            fontWeight: 400,
            wordWrap: 'break-word',
          }}
        >
          ADD
        </div>
      </div>
      <div
        style={{
          width: '232px',
          height: '223px',
          left: '0px',
          top: '0px',
          position: 'absolute',
          
        }}
      >
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              left: `${99 + index * 13}px`,
              top: '215px',
              position: 'absolute',
              background: 'white',
              borderRadius: '9999px',
              border: '0.50px black solid',
              cursor: 'pointer',
            }}
            onClick={() => handleClickOnDot(index)}
          ></div>
        ))}

        <div className={isZoomed ? `${styles.zoomedContainer}` : ''}>
          {isZoomed ? (
            <div className={styles.zoomedCloseButton} onClick={handleCloseClick}>X</div>
          ) : null}
          <img
            style={{
              width: isZoomed ? '768px' : '232px',
              height: isZoomed ? '689px' : '212px',
              margin: 'auto', // Centraliza horizontal e verticalmente
              position: 'relative', // Garante que a imagem esteja contida dentro do contêiner
              borderTopLeftRadius: isZoomed ? '0px' : '25px',
              borderTopRightRadius: isZoomed ? '0px' : '25px',
              border: isZoomed ? '0px' : '0.50px black solid',
              cursor: 'pointer',
            }}
            src={imageUrls[currentImageIndex]}
            alt={title}
            onClick={handleZoomClick}
            className={isZoomed ? styles.zoomedImage : ''}
          />
        </div>
      </div>
      <div
        style={{
          width: '134px',
          height: '21px',
          left: '94px',
          top: '250px',
          position: 'absolute',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'end'
        }}
      >
        <div
          style={{
            color: 'black',
            fontSize: '13px',
            fontFamily: 'Lexend Deca',
            fontWeight: 700,
            wordWrap: 'break-word',
          }}
        >
          A partir:
        </div>
        <div
          style={{
            color: '#125F92',
            fontSize: '16px',
            fontFamily: 'Lily Script One',
            fontWeight: 400,
            wordWrap: 'break-word',
            marginLeft: '7px'
          }}
        >
          R$ {price.toFixed(2)}
        </div>
      </div>
      <div
        style={{
          width: '67px',
          height: '18px',
          left: '40px',
          top: '244px',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: '#F60808',
            fontSize: '10px',
            fontFamily: 'Bodoni Moda',
            fontStyle: 'italic',
            fontWeight: 700,
            textDecoration: 'line-through',
            wordWrap: 'break-word',
          }}
        >
          De: {discountedPrice.toFixed(2)}
        </div>
      </div>
      <div
        style={{
          width: '132px',
          height: '20px',
          left: '7px',
          top: '228px',
          position: 'absolute',
          color: 'black',
          fontSize: '13px',
          fontFamily: 'Leckerli One',
          fontWeight: 400,
          wordWrap: 'break-word',
          textAlign: 'center',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default Product;
