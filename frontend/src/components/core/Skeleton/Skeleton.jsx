import './Skeleton.css';

const Skeleton = ({ type, width, height, className = '' }) => {
  const typeClass = type ? `skeleton-${type}` : '';

  const styles = {
    width,
    height
  };

  return <div className={`skeleton ${typeClass} ${className}`} style={styles}></div>;
};

export default Skeleton;
