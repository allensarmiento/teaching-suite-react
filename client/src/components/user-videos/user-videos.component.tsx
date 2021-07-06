import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { AgoraVideoPlayer } from 'agora-rtc-react';

import styles from './user-videos.module.scss';

interface Props {
  isPublishingVideo: boolean;
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const UserVideos = ({ isPublishingVideo, users, tracks }: Props) => {
  return (
    <>
      {isPublishingVideo ? (
        <AgoraVideoPlayer
          className={styles.video}
          videoTrack={tracks[1]}
        />
      ) : <div className={styles.video} />}
      {users.length > 0 && (
        users.map(user => {
          if (user.videoTrack) {
            return (
              <AgoraVideoPlayer
                key={user.uid}
                className={styles.video}
                videoTrack={user.videoTrack}
              />
            );
          } else {
            return <div className={styles.video} />;
          }
        })
      )}
    </>
  );
};

export default UserVideos;
