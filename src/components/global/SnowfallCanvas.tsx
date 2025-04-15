"use client";
import { useRef, useEffect, useState } from 'react';

export const SnowfallCanvas = () => {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakes: Snowflake[] = [];

  const NUM_SNOWFLAKES = 100;

  class Snowflake {
    x: number = 0;
    y: number = 0;
    radius: number = 0;
    speed: number = 0;
    wind: number = 0;

    constructor(width: number, height: number) {
      this.reset(width, height);
    }

    reset(width: number, height: number) {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.radius = Math.random() * 3 + 2;
      this.speed = Math.random() * 1 + 0.5;
      this.wind = Math.random() * 1 - 0.5;
    }

    update(width: number, height: number) {
      this.y += this.speed;
      this.x += this.wind;

      if (this.y > height || this.x < 0 || this.x > width) {
        this.reset(width, height);
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'oklch(91.7% 0.08 205.041)';
      ctx.fill();
    }
  }

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, [window.innerWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = size.width;
      canvas.height = size.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
      snowflakes.push(new Snowflake(canvas.width, canvas.height));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake) => {
        flake.update(canvas.width, canvas.height);
        flake.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
    />
  );
};

