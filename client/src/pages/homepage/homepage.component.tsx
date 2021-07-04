import axios from 'axios';
import { Component } from 'react';

import styles from './homepage.module.scss';

import LessonsList from '../../components/lessons-list/lessons-list.component';
import { ILesson } from '../../components/lesson-link/lesson-link.component';

interface Props {};

interface State {
  lessons: ILesson[];
};

class Homepage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lessons: [],
    };
  }

  async componentDidMount() {
    const { data: lessons } = await axios
      .get('http://localhost:4000/api/lessons');

    this.setState({ lessons });
  }

  render() {
    const { lessons } = this.state;

    return (
      <div className={styles.home}>
        {/* JOIN SECTION */}
        <div className={styles.review}>
          <h2 className={styles.section}>Review Lessons</h2>
          <LessonsList lessons={lessons} />
        </div>
        {/* Admin Section */}
      </div>
    );
  }
};

export default Homepage;
