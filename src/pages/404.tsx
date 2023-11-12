// src/pages/404.tsx
import { useEffect } from 'react';
import { Button } from '../components/button';
import Link from 'next/link';

export default function Custom404() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let particlesArray: Particle[] = [];

    let mouseX: number;
    let mouseY: number;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(
        public x: number,
        public y: number,
        public size: number,
        public weight: number,
      ) {}

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.size -= 0.05;
        if (this.size < 0) {
          this.x = mouseX + (Math.random() * 20 - 10);
          this.y = mouseY + (Math.random() * 20 - 10);
          this.size = Math.random() * 2.5 + 1;
          this.weight = Math.random() * 2 - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.2;

        if (
          this.y > canvas.height - this.size &&
          this.y < canvas.height + this.size
        ) {
          this.weight *= -0.8;
        }
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.x;
      mouseY = event.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function init() {
      particlesArray = [];
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 5 + 1;
        const weight = Math.random() * 1 - 0.5;
        particlesArray.push(new Particle(x, y, size, weight));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-kick-slate text-white min-h-screen relative overflow-hidden">
      <canvas id="canvas" className="absolute top-0 left-0"></canvas>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
        <p className="text-xl mt-4 mb-8">
          We could not find the page you are looking for.
        </p>
        <Link href="/">
          <Button className="bg-kick-green text-black py-2 px-4 rounded-lg hover:bg-kick-light-green">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}