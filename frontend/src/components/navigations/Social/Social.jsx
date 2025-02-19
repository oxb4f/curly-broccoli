import './Social.css';
import TelegramIcon from '@/assets/svgs/telegram.svg?react';
import InstagramIcon from '@/assets/svgs/instagram.svg?react';
import Navigation from '../../core/Navigation/Navigation';

const SocialNavigation = ({ social = {}, className = '' }) => {
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

  const navigationList = Object.keys(social).map((key) => ({
    name: key,
    icon: getProperIcon(key),
    href: social[key]
  }));

  return (
    <>
      {Boolean(navigationList.length) && (
        <Navigation list={navigationList} className={`social-navigation ${className}`} />
      )}
    </>
  );
};

export default SocialNavigation;
