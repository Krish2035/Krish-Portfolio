import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './BackgroundVideo.css';

const BackgroundVideo = ({ videoSrc }) => {
  const defaultVideo = videoSrc || '/Krish-video.mp4';
  const videoRef = useRef(null);

  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(defaultVideo);
  const [isMuted, setIsMuted] = useState(true);

  // Attempt initial audio playback; if browser policy blocks it, fall back to muted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // Browser prevented unmuted autoplay; mute to allow visual playback
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }
  }, [currentSrc]);

  // Global interaction listener: unmutes as soon as user clicks, taps, or touches anywhere
  useEffect(() => {
    const enableAudio = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        setIsMuted(false);
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener('click', enableAudio, { passive: true });
    window.addEventListener('touchstart', enableAudio, { passive: true });
    window.addEventListener('pointerdown', enableAudio, { passive: true });
    window.addEventListener('keydown', enableAudio, { passive: true });

    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
      window.removeEventListener('pointerdown', enableAudio);
      window.removeEventListener('keydown', enableAudio);
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
      }
      setIsMuted(nextMuted);
    }
  };

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
        src={currentSrc}
        onEnded={handleVideoEnded}
        onTimeUpdate={() => {
          if (videoRef.current && videoRef.current.duration > 0 && !hasPlayedOnce) {
            if (videoRef.current.duration - videoRef.current.currentTime <= 0.3) {
              handleVideoEnded();
            }
          }
        }}
        onError={() => {
          console.log('Video error fallback to /Krish-video.mp4');
          if (currentSrc !== '/Krish-video.mp4') {
            setCurrentSrc('/Krish-video.mp4');
          }
        }}
      />

      {/* Floating Sound Toggle Button */}
      {showVideo && (
        <button
          type="button"
          onClick={toggleSound}
          className={`sound-toggle-btn ${isMuted ? 'muted' : 'unmuted'}`}
          title={isMuted ? 'Click to Unmute Voice' : 'Click to Mute Voice'}
        >
          {isMuted ? (
            <>
              <VolumeX size={16} />
              <span>Tap to Unmute</span>
            </>
          ) : (
            <>
              <Volume2 size={16} />
              <span>Voice ON</span>
            </>
          )}
        </button>
      )}

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
