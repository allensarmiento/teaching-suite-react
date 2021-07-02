import classnames from 'classnames';

import styles from './participants.module.scss';

import ParticipantVideo from '../participant-video/participant-video.component';

interface Props {
  className?: string;
  users: Array<any>;
}

const Participants = ({ className, users }: Props) => {
  return (
    <div className={classnames(className, styles.participants)}>
      {users.map((user, index) => (
        <ParticipantVideo key={index} />
      ))}
    </div>
  );
};

export default Participants;
