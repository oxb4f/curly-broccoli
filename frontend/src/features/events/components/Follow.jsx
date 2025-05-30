import UserInlineCard from '@user/others/components/InlineCard';

const FollowEvent = ({ user, followedUser, className = '' }) => {
  return (
    <article className={`flex justify-center items-center gap-1.5 ${className}`}>
      <UserInlineCard
        user={user}
        className="max-w-1/3 h-full bg-pr-bg-main hover:bg-pr-bg-secondary"
      />
      <span> followed </span>
      <UserInlineCard
        user={followedUser}
        className="max-w-1/3 h-full bg-pr-bg-main hover:bg-pr-bg-secondary"
      />
    </article>
  );
};

export default FollowEvent;
