import axios from 'axios';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

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
  socket: Socket | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      inRoom: false,
      accessToken: '',
      slides: [],
      users: [],
    };

    this.slideController = new SlideController();
    this.socket = null;
  }

  initializeSocket() {
    this.socket = io('http://localhost:4000', {
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      this.socket?.emit('user-connected', this.props.currentUser);
    });

    this.socket.on('update-slides', ({
      slides,
      currentSlide,
      currentItem,
    }: {
      slides: ISlide[];
      currentSlide: number;
      currentItem: number;
    }) => {
      if (this.props.currentUser?.role !== 'teacher') {
        this.slideController.setSlides(slides);
        this.slideController.setCurrentSlide(currentSlide);
        this.slideController.setCurrentItem(currentItem);
        this.forceUpdate();
      }
    });
  }

  async componentDidMount() {
    await this.initializeSocket();
    const { id } = this.props.match.params;
    
    if (!id) return;

    try {
      const { data: slides } = await axios
        .get(
          `http://localhost:4000/api/lessons/${id}`,
          { withCredentials: true },
        );

      const { data: accessToken } = await axios
        .post(
          'http://localhost:4000/api/video-call/access-token',
          { channelName: 'video' },
          { withCredentials: true },
        );

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
    this.socket?.emit('slide-button-clicked', {
      slides: this.slideController.slides,
      currentSlide: this.slideController.currentSlide,
      currentItem: this.slideController.currentItem,
    });
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
            {this.props.currentUser?.role === 'teacher' && (
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
            )}
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
