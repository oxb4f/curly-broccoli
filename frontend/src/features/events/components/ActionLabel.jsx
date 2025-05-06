import { ArrowTurnRightDownIcon } from '@heroicons/react/24/outline';

const EventActionLabel = ({ action, className = '' }) => {
  return (
    <span className={`pointer-events-none ${className}`}>
      {action === 'add' ? 'Added ' : action === 'read' ? 'Reading ' : ''}
      <ArrowTurnRightDownIcon className="inline-block size-4" />
    </span>
  );
};

export default EventActionLabel;
