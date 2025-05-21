import UserCard from './Card';

const UserList = ({ users = [], className = '' }) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]
        ${className}`}
    >
      {users.map((user) => (
        <li
          key={user.id}
          className="relative h-20 md:h-60 rounded-3xl ring-1 ring-pr-border overflow-hidden"
        >
          <UserCard user={user} className="size-full rounded-[inherit] " />
        </li>
      ))}
    </ul>
  );
};

export default UserList;
