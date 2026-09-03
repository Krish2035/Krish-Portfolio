import React, { useState, useRef, useEffect } from 'react';
import krishVideo from '../assets/Krish-video.mp4';
import './BackgroundVideo.css';

const BackgroundVideo = ({ videoSrc }) => {
  const defaultVideo = videoSrc || krishVideo || '/Krish-video.mp4';
  const videoRef = useRef(null);

  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(defaultVideo);

  // Unmute audio automatically on first user interaction (click/touch/keydown)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(err => {
          console.log('Audio autoplay waiting for user interaction:', err);
        });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Strict scroll lock: prevents wheel, touch, and scrollbar until 1st video playback finishes
  useEffect(() => {
    const preventScroll = (e) => {
      if (!hasPlayedOnce) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    if (!hasPlayedOnce) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [hasPlayedOnce]);

  // Video visibility & pause control based on scroll position (when scrolling is unlocked)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowVideo(false);
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      } else {
        setShowVideo(true);
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(err => console.log('Resume playback:', err));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Triggered when intro video completes 1st playback
  const handleVideoEnded = () => {
    console.log('Intro video completed 1st full playback. Unlocking scroll down feature.');
    setHasPlayedOnce(true);
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }
  };

  // Safety fallback: auto-unlock scroll after 7 seconds if video fails/buffers on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasPlayedOnce) {
        console.log('Safety unlock triggered after timeout');
        handleVideoEnded();
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [hasPlayedOnce]);

  return (
    <div className="bg-video-wrapper">
      {/* 100% Clear HD Background Video */}
      <video
        ref={videoRef}
        className={`bg-video-element ${!showVideo ? 'video-hidden' : ''}`}
        autoPlay
        playsInline
        muted
        src={currentSrc}
        onEnded={handleVideoEnded}
        onTimeUpdate={() => {
          // Backup check: unlock scroll if video reaches final 0.3s of first play
          if (videoRef.current && videoRef.current.duration > 0 && !hasPlayedOnce) {
            if (videoRef.current.duration - videoRef.current.currentTime <= 0.3) {
              handleVideoEnded();
            }
          }
        }}
        onError={() => {
          console.log('Using fallback video source /Krish-video.mp4');
          setCurrentSrc('/Krish-video.mp4');
        }}
      />

      {/* Visual Scroll Lock Banner / Indicator */}
      {!hasPlayedOnce && (
        <div className="scroll-lock-badge">
          <span className="lock-dot"></span>
          <span>Intro Video Playing</span>
          <button
            type="button"
            onClick={handleVideoEnded}
            className="skip-intro-btn"
            title="Skip intro and unlock scroll"
          >
            Skip ✕
          </button>
        </div>
      )}

      {hasPlayedOnce && showVideo && (
        <div className="scroll-unlocked-badge">
          <span>Scroll Down to Explore Portfolio ↓</span>
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;
