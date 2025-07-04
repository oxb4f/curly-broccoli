import TelegramIcon from '@app/assets/svgs/telegram.svg?react';
import InstagramIcon from '@app/assets/svgs/instagram.svg?react';
import Navigation from '../navigation/Navigation';
import Skeleton from './Skeleton';

const Social = ({ social, isLoading, className = '' }) => {
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

  const navigation = {
    items: Object.keys(social ?? {}).map((key) => ({
      name: key,
      linkProps: {
        href: social[key],
        children: getProperIcon(key)
      }
    })),
    props: {
      className: 'flex flex-wrap gap-3'
    },
    linksClasses: 'block size-7 text-center transition-transform hover:scale-110'
  };

  return (
    <>
      {isLoading ? (
        <Skeleton type="rounded" height="1.75rem" className={className} />
      ) : (
        Boolean(navigation.items.length) && (
          <Navigation list={navigation} className={`stroke-pr-main ${className}`} />
        )
      )}
    </>
  );
};

export default Social;
