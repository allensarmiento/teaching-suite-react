import {
  ClientConfig,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng';
import {
  createClient,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';
import { useEffect, useState } from 'react';

import { CurrentUser } from '../../App';

import CallControls from '../call-controls/call-controls.component';
import UserVideos from '../user-videos/user-videos.component';

const config: ClientConfig = { mode: 'rtc', codec: 'vp8' };
const appId = process.env.REACT_APP_AGORA_APP_ID || '';
export const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

interface Props {
  currentUser: CurrentUser | null;
  leaveCall: Function;
  channelName: string;
  token: string;
}

const VideoCall = ({ currentUser, leaveCall, channelName, token }: Props) => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [isPublishingVideo, setIsPublishingVideo] = useState(false);

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    const init = async (name: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subscribe success');
  
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }

        if (mediaType === 'video') {
          setUsers(prevUsers => ([...prevUsers, user]));
        }
      });
  
      client.on('user-unpublished', (user, type) => {
        console.log('unpublished', user, type);
  
        if (type === 'audio') {
          user.audioTrack?.stop();
        }

        if (type === 'video') {
          // TODO: Shouldn't just remove the users like this
          setUsers(prevUsers => prevUsers.filter(
            prevUser => prevUser.uid !== user.uid
          ));
        }
      });
  
      client.on('user-left', user => {
        console.log('leaving', user);
  
        setUsers(prevUsers => prevUsers.filter(
          prevUser => prevUser.uid !== user.uid
        ));
      });
  
      await client.join(
        appId,
        name,
        token,
        currentUser?.id,
      );
  
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
  
      setStart(true);
      setIsPublishingVideo(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks, token]);

  const leave = () => {
    setStart(false);
    leaveCall();
  };

  const changePublishVideo = (value: boolean) => {
    setIsPublishingVideo(value);
  };

  return (
    <>
      {ready && tracks && (
        <CallControls
          tracks={tracks}
          leaveCall={leave}
          changePublishVideo={changePublishVideo}
        />
      )}
      {start && tracks && (
        <UserVideos
          users={users}
          tracks={tracks}
          isPublishingVideo={isPublishingVideo}
        />
      )}
    </>
  );
};

export default VideoCall;
