import { Component } from 'react';

import styles from './classroom.module.scss';

import LessonData from './lesson.data';

import Participants from '../../components/participants/participants.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import Slide, { ISlide } from '../../components/slide/slide.component';

interface Props {}

interface State {
  slides: Array<ISlide>;
  currentSlide: number;
  users: Array<any>;
}

class Classroom extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      slides: LessonData,
      currentSlide: 0,
      users: [
        { name: 'Test 1' },
        { name: 'Test 2' },
        { name: 'Test 3' }
      ],
    };
  }

  handleNextSlide = () => {}

  render() {
    const { slides, currentSlide, users } = this.state;

    return (
      <div className={styles.classroom}>
        <h1 className={styles.title}>Lesson Number 1</h1>
        <div className={styles.screen}>
          <div className={styles.container}>
            <Slide
              className={styles.slide}
              items={slides[currentSlide].items}
            />
            <Participants className={styles.participants} users={users} />
          </div>
          <Sidebar />
        </div>
      </div>
    );
  }
};

export default Classroom;
