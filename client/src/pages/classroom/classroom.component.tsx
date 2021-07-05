import axios from 'axios';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import styles from './classroom.module.scss';

import Participants from '../../components/participants/participants.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import Slide, { ISlide } from '../../components/slide/slide.component';
import WaitingRoom from '../../components/waiting-room/waiting-room.component';
import VideoCall from '../../components/video-call/video-call.component';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  inRoom: boolean;
  accessToken: string;
  slides: ISlide[];
  currentSlide: number;
  currentItem: number;
  users: Array<any>;
  finished: boolean;
}

class Classroom extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inRoom: false,
      accessToken: '',
      slides: [],
      currentSlide: 1,
      currentItem: 1,
      users: [],
      finished: false,
    };
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

      this.setState({ slides, accessToken });
    } catch (err) {
      console.log(err);
    }
  }

  lastSlideNumber(slides: ISlide[]) {
    if (slides.length === 0) return -1;

    return slides[slides.length - 1].slide_number;
  }

  lastSlideItemNumber(slides: ISlide[]) {
    if (slides.length === 0) return -1;

    const lastSlideNumber = this.lastSlideNumber(slides);
    const lastSlide = slides
      .filter(slide => slide.slide_number === lastSlideNumber);
    
    if (lastSlide.length === 0) return -1;

    return slides[slides.length - 1].item_number;
  }

  handlePrev = () => {
    const { slides, currentSlide, currentItem } = this.state;

    let prevSlideNumber = currentSlide;
    let prevItemNumber = currentItem;

    if (prevItemNumber === 1) {
      prevSlideNumber -= 1;

      const prevSlides = slides
        .filter(slide => slide.slide_number === prevSlideNumber);
      prevItemNumber = this.lastSlideItemNumber(prevSlides);
    } else {
      prevItemNumber -= 1;
    }

    this.setState({
      currentSlide: prevSlideNumber,
      currentItem: prevItemNumber,
      finished: false,
    });
  };

  handleNext = () => {
    const { slides, currentSlide, currentItem } = this.state;

    let nextSlideNumber = currentSlide;
    let nextItemNumber = currentItem;

    const currentSlides = slides
      .filter(slide => slide.slide_number === currentSlide);

    if (nextItemNumber === this.lastSlideItemNumber(currentSlides)) {
      nextSlideNumber += 1;
      nextItemNumber = 1;
    } else {
      nextItemNumber += 1;
    }

    this.setState({
      currentSlide: nextSlideNumber,
      currentItem: nextItemNumber,
      finished: nextSlideNumber > this.lastSlideNumber(slides),
    });
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

    const { slides, currentSlide, currentItem, users, finished } = this.state;
    
    const lessonTitle = slides.length > 0 ? slides[0].title : '';
    const filteredSlides = slides
      .filter(slide => slide.slide_number === currentSlide);
    const filteredItems = filteredSlides
      .filter(item => item.item_number <= currentItem);

    return (
      <div className={styles.classroom}>
        <h1 className={styles.title}>{lessonTitle}</h1>
        <div className={styles.screen}>
          <div className={styles.container}>
            <Slide
              className={styles.slide}
              items={filteredItems}
              finished={finished}
            />
            <div>
              <button
                onClick={this.handlePrev}
                disabled={currentSlide === 1 && currentItem === 1}
              >
                Prev
              </button>
              <button
                onClick={this.handleNext}
                disabled={currentSlide > this.lastSlideNumber(slides)}
              >
                Next
              </button>
            </div>
            <Participants className={styles.participants} users={users}>
              <VideoCall
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
