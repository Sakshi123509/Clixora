import React, { useState, useEffect } from 'react';

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Intelligence Core...');

  const dynamicMessages = [
    'Initializing Intelligence Core...',
    'Analyzing Contrast Matrices...',
    'Parsing Color Psychology Vectors...',
    'Calculating Click-Through Predictions...',
    'Finalizing Workspace Sandbox...'
  ];

  useEffect(() => {
    // 1. Percentage counter simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    // 2. Cycling status logs
    const textInterval = setInterval(() => {
      const randomMsg = dynamicMessages[Math.floor(Math.random() * dynamicMessages.length)];
      setStatusText(randomMsg);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  // 3. Complete and switch routes
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onLoadingComplete]);

  // --- PLAIN PINKISH-LAVENDER FULLPAGE THEME ---
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f5e6fc', // Beautiful uniform pinkish-lavender base
    backgroundImage: `
      radial-gradient(circle at 10% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%)
    `,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    inset: 0,
    zIndex: 99999,
    overflow: 'hidden',
    fontFamily: '"Segoe UI", Roboto, system-ui, sans-serif'
  };

  // Borderless, transparent content wrapper replacing the box structure
  const contentWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'min(450px, 90%)',
    textAlign: 'center',
    position: 'relative',
    padding: '2rem',
    animation: 'clixoraAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
  };

  return (
    <div style={containerStyle}>
      {/* Native CSS Injection block */}
      <style>{`
        @keyframes clixoraSpinCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes clixoraSpinCCW {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes clixoraPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes clixoraAppear {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* Subtle Technical Background Mesh */
        .light-mesh-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(147, 51, 234, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.015) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
      `}</style>

      {/* Grid Layer */}
      <div className="light-mesh-grid" />

      <div style={contentWrapperStyle}>
        
        {/* Futuristic Minimal Spinner */}
        <div style={{ position: 'relative', width: '90px', height: '90px', marginBottom: '2.5rem' }}>
          <div style={{
            position: 'absolute', inset: 0,
            border: '3px solid transparent', borderTopColor: '#a855f7', borderBottomColor: '#06b6d4',
            borderRadius: '50%', animation: 'clixoraSpinCW 1.8s linear infinite'
          }} />
          <div style={{
            position: 'absolute', inset: '10px',
            border: '2px solid transparent', borderLeftColor: '#db2777', borderRightColor: '#a855f7',
            borderRadius: '50%', animation: 'clixoraSpinCCW 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: '#a855f7', fontSize: '1.4rem', animation: 'clixoraPulse 1.5s ease-in-out infinite'
          }}>✦</div>
        </div>

        {/* Brand Header with high contrast Charcoal Ink */}
        <h1 style={{ color: '#1e1b4b', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '3px', margin: '0 0 0.7rem 0' }}>
          CLIXORA <span style={{ background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
        </h1>
<div>
        {/* Tagline */}
        <p style={{ color: '#4f46e5', marginTop:'24px',fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 2rem 0' }}>
          AI Thumbnail Generator & Analyzer
        </p>
</div>
        {/* Console Log Tracker */}
        <div style={{ color: '#4338ca', fontSize: '0.9rem', fontWeight: '500', height: '24px', marginBottom: '2rem', opacity: 0.85 }}>
          {statusText}
        </div>

        {/* Premium Clean Loading Bar */}
        <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.8rem', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #a855f7 0%, #db2777 50%, #06b6d4 100%)',
            boxShadow: '0 2px 10px rgba(168, 85, 247, 0.3)',
            transition: 'width 0.04s linear'
          }} />
        </div>

        {/* Percentage Output */}
        <div style={{ color: '#4f46e5', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.5px' }}>
          {progress}%
        </div>

      </div>
    </div>
  );
}