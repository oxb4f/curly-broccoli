import './Textarea.css';

const Textarea = ({ className = '', ...props }) => {
  return <textarea className={`textarea ${className}`} {...props}></textarea>;
};

export default Textarea;
