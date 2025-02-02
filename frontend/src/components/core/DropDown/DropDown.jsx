import './DropDown.css';
import { useState } from 'react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const DropDown = ({ openingDirection, children }) => {
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
    <div className={`${isHidden ? 'drop-down__hidden' : ''} drop-down`}>
      <button className="drop-down__hide-button" onClick={changeVisibility}>
        <HidingButtonIcon className="drop-down__hide-icon" />
      </button>
      {children}
    </div>
  );
};

export default DropDown;
