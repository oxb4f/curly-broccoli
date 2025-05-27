import { mergeCn } from '@shared/utils';
import { FunnelIcon } from '@heroicons/react/24/outline';

const FilterButton = ({ onClick, className = '' }) => {
  return (
    <button
      type="button"
      className={mergeCn('text-pr-main transition-transform hover:scale-105', className)}
      onClick={onClick}
    >
      <FunnelIcon />
    </button>
  );
};

export default FilterButton;
