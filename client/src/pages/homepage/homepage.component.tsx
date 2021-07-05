import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './homepage.module.scss';

import { CurrentUser } from '../../App';

import LessonsList from '../../components/lessons-list/lessons-list.component';
import { ILesson } from '../../components/lesson-link/lesson-link.component';

import BlueGreyButton from '../../core/blue-grey-button/blue-grey-button.component';

interface Props {
  currentUser: CurrentUser | null;
};

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
    if (!this.props.currentUser) return;

    try {
      const { data: lessons } = await axios
        .get('http://localhost:4000/api/lessons');

      this.setState({ lessons });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { currentUser } = this.props;
    const { lessons } = this.state;
    const latestLesson = lessons.length !== 0 ? lessons[0].id : '';

    return (
      <div className={styles.home}>
        <Link to={`/classroom/${latestLesson}`}>
          <BlueGreyButton className={styles.joinbtn}>
            Join Waiting Room
          </BlueGreyButton>
        </Link>
        <div className={styles.review}>
          <h2 className={styles.section}>Review Lessons</h2>
          <LessonsList lessons={lessons} />
        </div>
        {/* Admin Section */}
        <div>{currentUser?.role}</div>
      </div>
    );
  }
};

export default Homepage;
