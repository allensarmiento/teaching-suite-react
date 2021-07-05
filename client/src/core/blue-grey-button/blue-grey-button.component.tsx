import classnames from 'classnames';
import { ReactNode } from 'react';

import styles from './blue-grey-button.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const BlueGreyButton = ({ children, className }: Props) => {
  return (
    <button className={classnames(
      className,
      styles.button,
    )}>
      {children}
    </button>
  );
};

export default BlueGreyButton;
