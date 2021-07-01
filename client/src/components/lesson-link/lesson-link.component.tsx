import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import styles from './lesson-link.module.scss';

export interface ILesson {
  id: number;
  href: string;
}

interface Props {
  lesson: ILesson;
  number: number;
}

export const LessonLink = ({ lesson, number }: Props) => {
  const lessonLinkColor = (isMostRecent: boolean) => {
    return isMostRecent ? 'success' : 'secondary';
  };

  return (
    <Link to={lesson.href} className={styles.link}>
      <Alert
        className={styles.lesson}
        variant={lessonLinkColor(number === 0)}
      >
        Review Lesson {number + 1}
      </Alert>
    </Link>
  );
};
