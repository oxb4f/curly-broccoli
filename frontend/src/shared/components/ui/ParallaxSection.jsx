import { useEffect, useRef } from 'react';

export default function ParallaxSection({
  imageUrl,
  speedMultiplier,
  children,
  as: Tag = 'div',
  className = ''
}) {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${offset * speedMultiplier}px)`;
      }
    };

    if (speedMultiplier !== 0) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speedMultiplier]);

  return (
    <Tag className={`relative flex justify-center items-center overflow-hidden ${className}`}>
      <div
        ref={parallaxRef}
        className={`absolute w-full h-screen blur-xs bg-cover bg-center`}
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      {children}
    </Tag>
  );
}
