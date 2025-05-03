import { useState } from 'react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const DropDown = ({ openingDirection, visibleSlot, children, arrowSize = '5', className = '' }) => {
  const [isHidden, setIsHidden] = useState(true);

  const getArrows = (direction) => {
    switch (direction) {
      case 'top':
        return [ChevronUpIcon, ChevronDownIcon];
      case 'right':
        return [ChevronRightIcon, ChevronLeftIcon];
      case 'bottom':
        return [ChevronDownIcon, ChevronUpIcon];
      case 'left':
        return [ChevronLeftIcon, ChevronRightIcon];
      default:
        throw new Error('Incorrect direction');
    }
  };

  const [openArrow, closeArrow] = getArrows(openingDirection);

  const HidingButtonIcon = isHidden ? openArrow : closeArrow;

  const changeVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className={`w-full grid ${
        isHidden ? 'grid-rows-hide' : 'grid-rows-show'
      } transition-[grid-template-rows] overflow-hidden ${className}`}
    >
      <div className="pt-2">
        <button className="w-full flex justify-center" onClick={changeVisibility}>
          <HidingButtonIcon className={`size-${arrowSize}`} />
        </button>
        {visibleSlot}
      </div>
      {children}
    </div>
  );
};

export default DropDown;
