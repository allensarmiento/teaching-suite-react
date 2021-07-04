import classnames from 'classnames';
import Jumbotron from 'react-bootstrap/Jumbotron';

import styles from './slide.module.scss';

import ImageContent from '../image-content/image-content.component';
import QuestionContent from '../question-content/question-content.component';
import TextContent from '../text-content/text-content.component';

export interface ISlide {
  title: string;
  slide_number: number;
  show_review: boolean;
  item_number: number;
  content: string | string[];
  component: 'ImageContent' | 'QuestionContent' | 'TextContent';
}

interface Props {
  className?: string;
  items: ISlide[];
  finished: boolean;
}

const Slide = ({ className, items, finished }: Props) => {
  const components = {
    ImageContent,
    QuestionContent,
    TextContent,
  };

  return (
    <Jumbotron className={classnames(className, styles.slide)} fluid>
      <div className={styles.content}>
        {!finished ? (
          items.map((item, index) => {
            const TagName = components[item.component] || 'TextContent';
            return <TagName key={index} content={item.content} />
          })
        ) : (
          <TextContent content="End of lesson" />
        )}
      </div>
    </Jumbotron>
  );
};

export default Slide;
