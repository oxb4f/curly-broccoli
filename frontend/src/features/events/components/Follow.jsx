import UserInlineCard from '@user/others/components/InlineCard';

const FollowEvent = ({ user, followedUser, className = '' }) => {
  console.log(user);

  return (
    <article className={`flex justify-center items-center gap-1.5 ${className}`}>
      <UserInlineCard user={user} className="h-full bg-pr-bg-main hover:bg-pr-bg-secondary" />
      <span> followed </span>
      <UserInlineCard
        user={followedUser}
        className="h-full bg-pr-bg-main hover:bg-pr-bg-secondary"
      />
    </article>
  );
};

export default FollowEvent;
