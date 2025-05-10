import { mergeCn } from '@shared/utils';
import UserInlineCard from './InlineCard';

const UserInlineList = ({ users = [], className = '', itemsClassName = '' }) => {
  return (
    <ul className={`w-full grid grid-cols-1 gap-2 ${className}`}>
      {users.map((user) => (
        <li
          key={user.id}
          className={mergeCn('relative h-14 w-full overflow-hidden', itemsClassName)}
        >
          <UserInlineCard user={user} className="size-full rounded-[inherit]" />
        </li>
      ))}
    </ul>
  );
};

export default UserInlineList;
