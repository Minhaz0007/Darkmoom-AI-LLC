import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const gap = 30;
      const rows = Math.ceil(height / gap);
      const cols = Math.ceil(width / gap);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)'; // Subtle Cyan Glow

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const x = col * gap;
          const baseY = row * gap;

          // Wave calculation
          // frequency: determines how tight the waves are
          // amplitude: how high/low they go
          // time: moves the wave
          const yOffset = Math.sin(x * 0.01 + time + row * 0.1) * 10;
          const y = baseY + yOffset;

          // Simple culling
          if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
};

export default BackgroundCanvas;
