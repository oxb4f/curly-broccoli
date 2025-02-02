import '../Form.css';

export default function FormItem({ isFragmented, children }) {
  return (
    <div className={`form__item ${isFragmented ? 'form__item__half-size' : ''}`}>{children}</div>
  );
}
