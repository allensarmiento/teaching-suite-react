import classnames from 'classnames';
import Jumbotron from 'react-bootstrap/Jumbotron';

import styles from './slide.module.scss';

import ImageContent from '../image-content/image-content.component';
import QuestionContent from '../question-content/question-content.component';

export interface ISlideItem {
  content: string | Array<string>;
  component: 'ImageContent' | 'QuestionContent';
}

export interface ISlide {
  number: number;
  title: string;
  items: ISlideItem[];
  showInReview: boolean;
}

interface Props {
  className?: string;
  items: ISlideItem[];
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
