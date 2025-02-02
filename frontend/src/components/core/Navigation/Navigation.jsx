import { NavLink } from 'react-router';
import './Navigation.css';

const Navigation = ({ list, to, children }) => {
  return (
    <nav className="navigation">
      {list ? (
        <ul className="navigation navigation__list">
          {list.map((item) => {
            return (
              <li key={item.name} className="navigation__item">
                <NavLink to={item.to} className="navigation__link link">
                  {<item.icon className="navigation__icon" />}
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : (
        <NavLink to={to} className="navigation__link link">
          {children}
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
