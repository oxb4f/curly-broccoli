import { NavLink } from 'react-router';

const NavigationLink = ({ children, ...props }) => {
  if (props.to) {
    return (
      <NavLink {...props} end>
        {children}
      </NavLink>
    );
  }

  if (props.onClick) {
    return <button {...props}>{children}</button>;
  }

  if (props.href) {
    return <a {...props}>{children}</a>;
  }

  return children;
};

export default NavigationLink;
