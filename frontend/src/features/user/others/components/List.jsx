import UserCard from './Card';

const UserList = ({ users = [], className = '' }) => {
  return (
    <ul
      className={`w-full grid grid-cols-1 gap-4
        xs:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]
        ${className}`}
    >
      {users.map((user) => (
        <li
          key={user.id}
          className="relative h-24 md:h-60 border-1 border-pr-border rounded-3xl overflow-hidden"
        >
          <UserCard user={user} className="size-full " />
        </li>
      ))}
    </ul>
  );
};

export default UserList;
