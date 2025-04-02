import TelegramIcon from '@/assets/svgs/telegram.svg?react';
import InstagramIcon from '@/assets/svgs/instagram.svg?react';
import Navigation from '../Navigation/Navigation';

const Social = ({ social = {}, className = '' }) => {
  const getProperIcon = (socialName) => {
    switch (socialName.toLowerCase()) {
      case 'telegram':
        return <TelegramIcon />;
      case 'instagram':
        return <InstagramIcon />;
      default:
        return null;
    }
  };

  const navigationList = {
    items: Object.keys(social).map((key) => ({
      name: key,
      icon: getProperIcon(key),
      args: {
        href: social[key],
        className: 'size-7'
      }
    })),
    args: {
      className: 'flex flex-wrap gap-3'
    }
  };

  return (
    <>
      {Boolean(navigationList.items.length) && (
        <Navigation list={navigationList} className={`stroke-pr-main ${className}`} />
      )}
    </>
  );
};

export default Social;
