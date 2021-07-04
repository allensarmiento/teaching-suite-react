import axios from 'axios';
import { Component } from 'react';

import styles from './classroom.module.scss';

import Participants from '../../components/participants/participants.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import Slide, { ISlide } from '../../components/slide/slide.component';

interface Props {}

interface State {
  slides: ISlide[];
  currentSlide: number;
  users: Array<any>;
  finished: boolean;
}

class Classroom extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      slides: [],
      currentSlide: 1,
      users: [],
      finished: false,
    };
  }

  async componentDidMount() {
    try {
      const { data: slides } = await axios
        .get('http://localhost:4000/api/lessons/1');
      this.setState({ slides });
    } catch (err) {
      console.log(err);
    }
  }

  lastSlideNumber(slides: ISlide[]) {
    if (slides.length === 0) return -1;

    return slides[slides.length - 1].slide_number;
  }

  handlePrevSlide = () => {
    this.setState(prevState => ({
      currentSlide: prevState.currentSlide - 1,
      finished: false,
    }));
  };

  handleNextSlide = () => {
    this.setState(prevState => ({
      currentSlide: prevState.currentSlide + 1,
      finished: prevState.currentSlide + 1 > this
        .lastSlideNumber(prevState.slides),
    }));
  }

  render() {
    const { slides, currentSlide, users } = this.state;
    
    const lessonTitle = slides.length > 0 ? slides[0].title : '';
    const filteredSlides = slides
      .filter(slide => slide.slide_number === currentSlide);

    return (
      <div className={styles.classroom}>
        <h1 className={styles.title}>{lessonTitle}</h1>
        <div className={styles.screen}>
          <div className={styles.container}>
            <Slide
              className={styles.slide}
              // TODO: Display 'end of slides' if end
              items={filteredSlides}
            />
            <div>
              <button
                onClick={this.handlePrevSlide}
                disabled={currentSlide === 1}
              >
                Prev Slide
              </button>
              <button
                onClick={this.handleNextSlide}
                disabled={currentSlide > this.lastSlideNumber(slides)}
              >
                Next Slide
              </button>
            </div>
            <Participants className={styles.participants} users={users} />
          </div>
          {/* <Sidebar /> */}
        </div>
      </div>
    );
  }
};

export default Classroom;
