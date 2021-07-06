import {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import classnames from 'classnames';
import { useState } from 'react';

import { useClient } from '../video-call/video-call.component';

import styles from './call-controls.module.scss';

interface Props {
  changePublishVideo: Function;
  leaveCall: Function;
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const CallControls = ({ changePublishVideo, leaveCall, tracks }: Props) => {
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const client = useClient();

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);

      setTrackState(prevTrackState => ({
        ...prevTrackState,
        audio: !prevTrackState.audio,
      }));
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);

      setTrackState(prevTrackState => ({
        ...prevTrackState,
        video: !prevTrackState.video,
      }));
      changePublishVideo(!trackState.video);
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    leaveCall();
  };

  return (
    <div className={styles.controls}>
      <p
        className={classnames(
          styles.control,
          trackState.audio ? styles.on : ''
        )}
        onClick={() => mute('audio')}
      >
        {trackState.audio ? 'Mute Audio' : 'Unmute Audio'}
      </p>
      <p
        className={classnames(
          styles.control,
          trackState.video ? styles.on : ''
        )}
        onClick={() => mute('video')}
      >
        {trackState.video ? 'Mute Video' : 'Unmute Video'}
      </p>
      <p className={styles.control} onClick={leaveChannel}>Leave</p>
    </div>
  );
};

export default CallControls;
