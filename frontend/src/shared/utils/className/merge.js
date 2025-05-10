import { twMerge } from 'tailwind-merge';

const mergeCn = (...classNames) => {
  return twMerge(...classNames);
};

export default mergeCn;
