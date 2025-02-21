import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import TopBar from '../components/Topbar';
import '../css/landing.css';
import Features from '../components/Features';

const Landing = () => {
    const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextImage();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const triggerFade = (callback) => {
        setFade(false);
        setTimeout(() => {
            callback();
            setFade(true);
        }, 500);
    };

    const handleNextImage = () => {
        triggerFade(() =>
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        );
    };

    const handlePreviousImage = () => {
        triggerFade(() =>
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            )
        );
    };

    return (
        <div className="landing-page">
            <Header />
            <TopBar />

            {/* Slideshow Section */}
            <div
                className="slideshow-container"
                style={{
                    position: 'relative',
                    height: '500px',
                    overflow: 'hidden',
                    marginTop: '20px',
                    borderBottom: '2px solid #ccc',
                }}
            >
                <div
                    className={`slideshow ${fade ? 'fade-in' : 'fade-out'}`}
                    style={{
                        backgroundImage: `url(${images[currentImageIndex]})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: '100%',
                        transition: 'opacity 0.5s ease',
                    }}
                />
                <button
                    className="arrow left-arrow"
                    onClick={handlePreviousImage}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                    }}
                >
                    &#8678;
                </button>
                <button
                    className="arrow right-arrow"
                    onClick={handleNextImage}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        border: 'none',
                        padding: '8px',
                        cursor: 'pointer',
                    }}
                >
                    &#8680;
                </button>
            </div>

            <Features />
        </div>
    );
};

export default Landing;
