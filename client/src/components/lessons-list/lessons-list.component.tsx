import styles from './lessons-list.module.scss';

import LessonLink, { ILesson } from '../lesson-link/lesson-link.component';

interface Props {
  lessons: ILesson[];
}

const LessonsList = ({ lessons }: Props) => {
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

export default LessonsList;
