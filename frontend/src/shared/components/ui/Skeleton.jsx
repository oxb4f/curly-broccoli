const Skeleton = ({ type, height, width = '100%', style = {}, className = '' }) => {
  const typeClasses =
    type === 'text'
      ? 'rounded-sm text-transparent stroke-current'
      : type === 'rounded'
      ? 'rounded-md'
      : type === 'button'
      ? 'rounded-2xl'
      : type === 'circular'
      ? 'rounded-full'
      : '';

  const styles = {
    width,
    height,
    ...style
  };

  return (
    <span
      className={`relative block bg-pr-bg-tertiary overflow-hidden
        after:animate-shimmer after:absolute after:block after:inset-0 after:bg-gradient-to-r after:from-transparent after:from-0% after:via-pr-text-darker after:via-85% after:to-transparent after:to-100% 
        ${typeClasses} ${className}`}
      style={styles}
    >
      {type === 'text' && '.'}
    </span>
  );
};

export default Skeleton;
