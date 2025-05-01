import NavigationLink from './Link';

const Navigation = ({ list, className = '' }) => {
  return (
    <nav className={className}>
      <ul {...list.props}>
        {list.items.map((item) => (
          <li key={item.name} className={list.itemsClasses} {...item.props}>
            {<NavigationLink className={list.linksClasses} {...item.linkProps} />}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
