"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { gsap } from "gsap";

export interface HeroBackgroundRef {
  triggerGlitch: () => void;
}

const HeroBackground = forwardRef<HeroBackgroundRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const glitchRef = useRef({ active: false, offset: 0, intensity: 0, flash: 0 });

  useImperativeHandle(ref, () => ({
    triggerGlitch: () => {
      if (glitchRef.current.active) return;
      glitchRef.current.active = true;

      const tl = gsap.timeline({
        onComplete: () => {
          glitchRef.current.active = false;
          glitchRef.current.intensity = 0;
          glitchRef.current.flash = 0;
        }
      });

      // Sharp, aggressive trigger
      tl.to(glitchRef.current, { flash: 1, duration: 0.05, repeat: 1, yoyo: true })
        .to(glitchRef.current, { intensity: 1, duration: 0.1, repeat: 8, yoyo: true }, 0)
        .to(glitchRef.current, { offset: 40, duration: 0.05, repeat: 5, yoyo: true }, 0);
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Nodes and Data Streams
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
    }[] = [];
    const nodeCount = 35;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Digital Drifters
    const drifters: {
      x: number;
      y: number;
      text: string;
      opacity: number;
      speed: number;
      size: number;
      targetOpacity: number;
    }[] = [];
    const drifterCount = 10;
    const hexChars = "0123456789ABCDEF";

    const createDrifter = () => {
      let text = "0x";
      for (let i = 0; i < 4; i++) text += hexChars[Math.floor(Math.random() * hexChars.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        text,
        opacity: 0,
        targetOpacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.4 + 0.1,
        size: Math.floor(Math.random() * 8 + 8),
      };
    };

    for (let i = 0; i < drifterCount; i++) drifters.push(createDrifter());

    const animate = () => {
      const gState = glitchRef.current;
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Background Depth
      ctx.fillStyle = "#0a0a08";
      ctx.fillRect(0, 0, width, height);


      const signalPulse = 0.8 + Math.sin(Date.now() / 1500) * 0.2;

      const drawContent = (color: string, xOffset = 0, yOffset = 0) => {
        ctx.save();
        ctx.translate(xOffset, yOffset);

        const gridBaseOpacity = color === "base" ? 0.04 : 0.08;
        const gridOpacity = gridBaseOpacity * signalPulse;

        ctx.strokeStyle = color === "base" ? `rgba(0, 255, 136, ${gridOpacity})` : "transparent";
        if (gState.active && color !== "base") {
          ctx.strokeStyle = color === "red" ? `rgba(255, 68, 68, ${gridOpacity})` : `rgba(68, 255, 255, ${gridOpacity})`;
        }

        ctx.lineWidth = 1;
        const gridSize = 80;
        const parallaxX = (mouse.current.x - width / 2) * 0.01;
        const parallaxY = (mouse.current.y - height / 2) * 0.01;
        const baseColorPrefix = color === "base" ? "0, 255, 136" : (color === "red" ? "255, 68, 68" : "68, 255, 255");

        ctx.beginPath();
        for (let x = (parallaxX % gridSize); x < width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = (parallaxY % gridSize); y < height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        if (color === "base") {
          ctx.font = `10px Space Mono, monospace`;
          drifters.forEach((d, i) => {
            d.y -= d.speed;
            if (d.opacity < d.targetOpacity) d.opacity += 0.005;
            if (d.y < -20) {
              drifters[i] = createDrifter();
              drifters[i].y = height + 20;
            }
            const flicker = Math.random() > 0.98 ? 0 : 1;
            ctx.fillStyle = `rgba(${baseColorPrefix}, ${d.opacity * flicker * signalPulse})`;
            ctx.fillText(d.text, d.x, d.y);
          });
        }

        if (gState.active && Math.random() > 0.6) {
          ctx.fillStyle = `rgba(${baseColorPrefix}, ${0.05 * gState.intensity})`;
          for (let k = 0; k < 15; k++) {
            ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 200, 1);
          }
        }

        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += 0.02;

          if (node.x < -100) node.x = width + 100;
          if (node.x > width + 100) node.x = -100;
          if (node.y < -100) node.y = height + 100;
          if (node.y > height + 100) node.y = -100;

          const dx = node.x - mouse.current.x;
          const dy = node.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacityMult = dist < 300 ? (1 - dist / 300) : 0;

          if (dist < 300) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${baseColorPrefix}, ${0.1 * opacityMult * (0.8 + Math.random() * 0.4) * signalPulse})`;
            ctx.moveTo(node.x, node.y);
            const midX = node.x + (mouse.current.x - node.x) * (0.3 + Math.random() * 0.4);
            ctx.lineTo(midX, node.y);
            ctx.lineTo(midX, mouse.current.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }

          const flicker = (dist < 100 && Math.random() > 0.9) ? 0 : 1;
          const s = node.size * (1 + Math.sin(node.pulse) * 0.3);

          ctx.fillStyle = `rgba(${baseColorPrefix}, ${(0.2 + opacityMult * 0.5) * flicker * signalPulse})`;
          ctx.beginPath();
          ctx.rect(node.x - s / 2, node.y - s / 2, s, s);
          ctx.fill();

          if (dist < 150 && Math.sin(node.pulse) > 0.8) {
            ctx.fillRect(node.x + 10, node.y + 10, 2, 2);
          }
        });

        ctx.restore();
      };

      if (gState.active) {
        const vy = (Math.random() - 0.5) * gState.offset * 0.5;
        drawContent("red", gState.offset * gState.intensity, vy);
        drawContent("cyan", -gState.offset * gState.intensity, -vy);
        if (Math.random() > 0.4) drawContent("base");
      } else {
        drawContent("base");
      }

      const gradient = ctx.createRadialGradient(
        mouse.current.x,
        mouse.current.y,
        0,
        mouse.current.x,
        mouse.current.y,
        500
      );
      gradient.addColorStop(0, "rgba(0, 255, 136, 0.08)");
      gradient.addColorStop(0.5, "rgba(0, 255, 136, 0.02)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = "screen";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ filter: "contrast(1.1) brightness(1.1)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00FF88 2px, #00FF88 4px)",
          backgroundSize: "100% 4px"
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(10, 10, 8, 0.4) 100%)"
        }}
      />
    </div>
  );
});

HeroBackground.displayName = "HeroBackground";
export default HeroBackground;
