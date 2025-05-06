import { mergeCn } from '@shared/utils';
import { memo } from 'react';

const FormButton = memo(
  ({ button, isDisabled }) => {
    const commonProps = {
      ...button,
      className: mergeCn(
        `w-full h-10 px-2 rounded-md placeholder:opacity-0 cursor-pointer font-bold bg-pr-main text-pr-bg-main 
        enabled:hover:bg-pr-main-soft enabled:active:bg-pr-main-mute`,
        button?.className ?? ''
      )
    };

    if (button.type === 'submit')
      return (
        <button {...commonProps} disabled={isDisabled}>
          {button.children}
        </button>
      );

    return <button {...commonProps}>{button.children}</button>;
  },
  (prevProps, nextProps) => {
    return prevProps.isDisabled === nextProps.isDisabled;
  }
);

FormButton.displayName = 'FormButton';

export default FormButton;
