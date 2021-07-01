import styles from './home-page.module.scss';
import { LessonsList } from '../lessons-list/lessons-list.component';

export const HomePage = () => {
  return (
    <div className={styles.home}>
      {/* JOIN SECTION */}
      <div className={styles.review}>
        <h2 className={styles.section}>Review Lessons</h2>
        <LessonsList
          lessons={[
            { id: 1, href: '/title-1' },
            { id: 2, href: '/title-2' },
            { id: 3, href: '/title-3' },
            { id: 4, href: '/title-4' },
            { id: 5, href: '/title-5' },
          ]}
        />
      </div>
      {/* Admin Section */}
    </div>
  );
};
