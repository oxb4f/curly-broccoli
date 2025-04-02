import { NavLink } from 'react-router';

const NavigationLink = ({ element, icon: Icon, text, ...args }) => {
  const innerElement = <div>{element || (Icon ? <Icon /> : text || null)}</div>;

  if (args.href) {
    return <a {...args}>{innerElement}</a>;
  }

  if (args.onClick) {
    return <button {...args}>{innerElement}</button>;
  }

  if (args.to) {
    return (
      <NavLink {...args} end>
        {innerElement}
      </NavLink>
    );
  }

  return innerElement;
};

export default NavigationLink;
