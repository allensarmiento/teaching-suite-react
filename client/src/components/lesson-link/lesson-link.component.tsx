import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import styles from './lesson-link.module.scss';

export interface ILesson {
  id: number;
  title: string;
}

interface Props {
  lesson: ILesson;
  number: number;
}

const LessonLink = ({ lesson, number }: Props) => {
  const lessonLinkColor = (isMostRecent: boolean) => {
    return isMostRecent ? 'success' : 'secondary';
  };

  return (
    <Link to={`/review/${lesson.id}`} className={styles.link}>
      <Alert
        className={styles.lesson}
        variant={lessonLinkColor(number === 0)}
      >
        {lesson.title}
      </Alert>
    </Link>
  );
};

export default LessonLink;
