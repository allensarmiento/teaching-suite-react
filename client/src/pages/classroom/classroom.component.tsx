import axios from 'axios';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import styles from './classroom.module.scss';

import Participants from '../../components/participants/participants.component';
import Slide from '../../components/slide/slide.component';
import WaitingRoom from '../../components/waiting-room/waiting-room.component';
import VideoCall from '../../components/video-call/video-call.component';

import { CurrentUser } from '../../App';

import { SlideController, ISlide } from '../../models/slide-controller';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: CurrentUser | null;
}

interface State {
  inRoom: boolean;
  accessToken: string;
  slides: ISlide[];
  users: Array<any>;
}

class Classroom extends Component<Props, State> {
  slideController: SlideController;

  constructor(props: Props) {
    super(props);

    this.state = {
      inRoom: false,
      accessToken: '',
      slides: [],
      users: [],
    };

    this.slideController = new SlideController();
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    
    if (!id) return;

    try {
      const { data: slides } = await axios
        .get(`http://localhost:4000/api/lessons/${id}`);

      const { data: accessToken } = await axios
        .post('http://localhost:4000/api/video-call/access-token', {
          channelName: 'video',
        });

      this.setState({ slides, accessToken }, () => {
        this.slideController.setSlides(this.state.slides);
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleSlideDirection = (direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      this.slideController.slideForward();
    } else {
      this.slideController.slideBackward();
    }
    this.forceUpdate();
  }

  leaveCall = () => {
    this.setState({ inRoom: false });
  }

  render() {
    const { accessToken, inRoom } = this.state;

    if (!accessToken) {
      return <div>Loading...</div>
    }

    if (!inRoom) {
      return (
        <WaitingRoom onClick={() => this.setState({ inRoom: true })} />
      );
    }

    const { currentUser } = this.props;
    const { slides, users } = this.state;
    
    const lessonTitle = slides.length > 0 ? slides[0].title : '';

    return (
      <div className={styles.classroom}>
        <h1 className={styles.title}>{lessonTitle}</h1>
        <div className={styles.screen}>
          <div className={styles.container}>
            <Slide
              className={styles.slide}
              items={this.slideController.currentItems}
              finished={this.slideController.finished}
            />
            <div>
              <button
                onClick={() => this.handleSlideDirection('backward')}
                disabled={this.slideController.prevDisabled}
              >
                Prev
              </button>
              <button
                onClick={() => this.handleSlideDirection('forward')}
                disabled={this.slideController.nextDisabled}
              >
                Next
              </button>
            </div>
            <Participants className={styles.participants} users={users}>
              <VideoCall
                currentUser={currentUser}
                leaveCall={this.leaveCall}
                channelName="video"
                token={accessToken}
              />
            </Participants>
          </div>
          {/* <Sidebar /> */}
        </div>
      </div>
    );
  }
};

export default Classroom;
