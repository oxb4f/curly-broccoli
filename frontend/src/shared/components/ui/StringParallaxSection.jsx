import useIntersectionObserver from '@shared/hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';

export default function StringParallaxSection({
  imageUrl,
  speedMultiplier,
  children,
  visiblePercentageBoundaries: boundries = 50,
  tensionSensivity = 0.4,
  as: Tag = 'div',
  className = ''
}) {
  const [enabled, setEnabled] = useState(false);
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef(null);
  const timeoutRef = useRef(null);

  const ref = useIntersectionObserver({
    deps: [speedMultiplier],
    onEnter: () => {
      setEnabled(true);
    },
    onLeave: () => {
      setOffset(0);
      setEnabled(false);
    },
    rootMargin: '500px 0px 500px 0px'
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (enabled) {
        const currentY = window.scrollY;
        const deltaY = currentY - lastScrollY;
        lastScrollY = currentY;

        const newOffset = Math.max(Math.min(deltaY * tensionSensivity, boundries), -boundries);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setOffset(0), 100);

        setOffset(newOffset);
      }
    };

    if (speedMultiplier !== 0) window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);

  return (
    <Tag ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        ref={parallaxRef}
        style={{
          backgroundImage: `url(${imageUrl})`,
          '--parallax-offset': `${offset}%`,
          '--parallax-transition-duration': `${1 / speedMultiplier}s`
        }}
        className={`absolute w-full bg-cover bg-center translate-y-(--parallax-offset) transition-transform duration-(--parallax-transition-duration) ease-out transform-gpu blur-[2px] -z-10 ${
          speedMultiplier === 0 ? 'h-full scale-105' : 'h-screen'
        }`}
      />
      {children}
    </Tag>
  );
}
