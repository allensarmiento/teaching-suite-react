import classnames from 'classnames';
import { ReactNode } from 'react';

import styles from './participants.module.scss';

import ParticipantVideo from '../participant-video/participant-video.component';

interface Props {
  children?: ReactNode;
  className?: string;
  users: Array<any>;
}

const Participants = ({ children, className, users }: Props) => {
  return (
    <div className={classnames(className, styles.participants)}>
      {/* {users.map((user, index) => (
        <ParticipantVideo key={index} />
      ))} */}
      {children}
    </div>
  );
};

export default Participants;
