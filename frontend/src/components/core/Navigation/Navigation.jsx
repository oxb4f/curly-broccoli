import { NavLink } from 'react-router';
import './Navigation.css';

const Navigation = ({ item, list, className = '' }) => {
  const renderNavigationLink = (item) => {
    const commonClasses = 'navigation__link link';
    const iconElement = item.icon && <span className="navigation__icon">{item.icon}</span>;
    const textElement = item.text && <span className="navigation__text">{item.text}</span>;

    if (item.href) {
      return (
        <a href={item.href} className={commonClasses}>
          {iconElement}
          {textElement}
        </a>
      );
    }

    if (item.onClick) {
      return (
        <button onClick={item.onClick} className={commonClasses}>
          {iconElement}
          {textElement}
        </button>
      );
    }

    return (
      <NavLink to={item.to} className={commonClasses} end>
        {iconElement}
        {textElement}
      </NavLink>
    );
  };

  return (
    <nav className={`navigation ${className}`}>
      {list ? (
        <ul className="navigation__list">
          {list.map((item) => (
            <li key={item.name} className="navigation__item">
              {renderNavigationLink(item)}
            </li>
          ))}
        </ul>
      ) : (
        renderNavigationLink(item)

        // <NavLink to={to} className="navigation__link link">
        //   {children}
        // </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
