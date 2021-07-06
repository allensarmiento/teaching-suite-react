import classnames from 'classnames';
import { ReactNode } from 'react';

import styles from './blue-grey-button.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const BlueGreyButton = ({ children, className, ...otherProps }: Props) => {
  return (
    <button
      className={classnames(
        className,
        styles.button,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default BlueGreyButton;
