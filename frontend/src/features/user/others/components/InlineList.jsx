import UserInlineCard from './InlineCard';

const UserInlineList = ({ users = [], className = '' }) => {
  return (
    <ul className={`w-full grid grid-cols-1 gap-2 ${className}`}>
      {users.map((user) => (
        <li
          key={user.id}
          className="relative h-14 w-full rounded-3xl overflow-hidden hover:backdrop-blur-sm"
        >
          <UserInlineCard user={user} className="size-full rounded-[inherit]" />
        </li>
      ))}
    </ul>
  );
};

export default UserInlineList;
