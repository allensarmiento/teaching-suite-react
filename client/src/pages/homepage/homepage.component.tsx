import axios from 'axios';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';

import styles from './homepage.module.scss';

import LessonsList from '../../components/lessons-list/lessons-list.component';
import { ILesson } from '../../components/lesson-link/lesson-link.component';

type PathParamsType = {};

type Props = RouteComponentProps<PathParamsType> & {};

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
    try {
      const { data } = await axios.get(
        'http://localhost:4000/api/auth/currentuser',
        { withCredentials: true },
      );

      if (!data.currentUser) {
        this.props.history.push('/sign-in');
        return;
      }

      const { data: lessons } = await axios
        .get('http://localhost:4000/api/lessons');

      this.setState({ lessons });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { lessons } = this.state;

    const latestLesson = lessons.length !== 0 ? lessons[0].id : '';

    return (
      <div className={styles.home}>
        <Link to={`/classroom/${latestLesson}`}>
          <button className={styles.join}>Join Waiting Room</button>
        </Link>
        <div className={styles.review}>
          <h2 className={styles.section}>Review Lessons</h2>
          <LessonsList lessons={lessons} />
        </div>
        {/* Admin Section */}
      </div>
    );
  }
};

export default withRouter(Homepage);
