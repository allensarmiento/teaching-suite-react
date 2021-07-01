import { LessonLink, ILesson } from '../lesson-link/lesson-link.component';
import styles from './lessons-list.module.scss';

interface Props {
  lessons: ILesson[];
}

export const LessonsList = ({ lessons }: Props) => {
  return (
    <div className={styles.list}>
      {lessons.map((lesson, index) => (
        <LessonLink
          key={lesson.id}
          lesson={lesson}
          number={index}
        />
      ))}
    </div>
  );
};
