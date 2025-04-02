import NavigationLink from './Link/Link';

const Navigation = ({ list, className = '' }) => {
  return (
    <nav className={className}>
      <ul {...list.args}>
        {list.items.map((item) => (
          <li key={item.name}>
            {
              <NavigationLink
                element={item.element}
                icon={item.icon}
                text={item.text}
                {...item.args}
              />
            }
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
