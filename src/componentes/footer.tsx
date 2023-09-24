// Footer.js
import React from 'react';
import styles from '../app/page.module.css';

const Footer = () => {
    return (
        <div className={`footer_global ${styles.div_footer_global}`}>

            <div
                className='fixed_footer'
                style={{
                    width: '1920px',
                    height: '53px',
                    left: '-8px',
                    bottom: '0px',
                    position: 'absolute',
                    background: '#C7E3EF',
                }}> </div>
            <div
                className='Name_Bottom_right'
                style={{
                    width: '151px',
                    height: '53px',
                    left: '1780px',
                    bottom: '-11px',
                    position: 'absolute',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'black',
                    fontSize: '16px',
                    fontFamily: 'Leckerli One',
                    fontWeight: 400,
                    wordWrap: 'break-word',
                }}
            >
                By: FrancosCorp
            </div>
            <div className={`icons_social_media ${styles.icons_social_media}`}>
                <img
                    style={{ width: '37px', height: '37px' }}
                    src="https://via.placeholder.com/37x37"
                />
                <img
                    style={{ width: '37px', height: '37px' }}
                    src="https://via.placeholder.com/37x37"
                />
                <img
                    style={{ width: '37px', height: '37px' }}
                    src="https://via.placeholder.com/37x37"
                />
            </div>

        </div>
    );
};

export default Footer;
