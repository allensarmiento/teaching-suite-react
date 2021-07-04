import classnames from 'classnames';
import Jumbotron from 'react-bootstrap/Jumbotron';

import styles from './slide.module.scss';

import ImageContent from '../image-content/image-content.component';
import QuestionContent from '../question-content/question-content.component';

export interface ISlide {
  title: string;
  slide_number: number;
  show_review: boolean;
  item_number: number;
  content: string | string[];
  component: 'ImageContent' | 'QuestionContent';
}

interface Props {
  className?: string;
  items: ISlide[];
}

const Slide = ({ className, items }: Props) => {
  const components = {
    ImageContent,
    QuestionContent
  };

  return (
    <Jumbotron className={classnames(className, styles.slide)} fluid>
      <div className={styles.content}>
        {items.map((item, index) => {
          const TagName = components[item.component] || 'TextContent';
          return <TagName key={index} content={item.content} />
        })}
      </div>
    </Jumbotron>
  );
};

export default Slide;
