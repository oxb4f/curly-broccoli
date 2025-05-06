import { twMerge } from 'tailwind-merge';

const mergeCn = (defaultClassName, newClassName) => {
  return twMerge(defaultClassName, newClassName);
};

export default mergeCn;
