import useIntersectionObserver from '@shared/hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';

export default function StringParallaxSection({
  imageUrl,
  slowdownMultiplier,
  children,
  visiblePercentageBoundaries: boundries = 50,
  as: Tag = 'div',
  className = ''
}) {
  const [enabled, setEnabled] = useState(false);
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef(null);
  const timeoutRef = useRef(null);

  const ref = useIntersectionObserver(
    () => {
      setEnabled(true);
    },
    [slowdownMultiplier],
    () => {
      setOffset(0);
      setEnabled(false);
    },
    '500px 0px 500px 0px'
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (enabled) {
        const currentY = window.scrollY;
        const deltaY = currentY - lastScrollY;
        lastScrollY = currentY;

        const newOffset = Math.max(Math.min(deltaY * 5, boundries), -boundries);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setOffset(0), 100);

        setOffset(newOffset);
      }
    };

    if (slowdownMultiplier !== 0) window.addEventListener('scroll', handleScroll);
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
          '--element-offset': `${offset}%`,
          transitionDuration: `${1000 * slowdownMultiplier}ms`
        }}
        className={`absolute w-full blur-xs bg-cover bg-center transition-transform ease-out translate-y-[var(--element-offset)] ${
          slowdownMultiplier === 0 ? 'h-full scale-105' : 'h-screen'
        }`}
      />
      {children}
    </Tag>
  );
}
