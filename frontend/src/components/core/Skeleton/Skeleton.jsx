import './Skeleton.css';

const Skeleton = ({ type, height, width = '100%', style = {}, className = '' }) => {
  const typeClass = type ? `skeleton-${type}` : '';

  const styles = {
    width,
    height,
    ...style
  };

  return (
    <span className={`skeleton ${typeClass} ${className}`} style={styles}>
      {type === 'text' && '.'}
    </span>
  );
};

export default Skeleton;
