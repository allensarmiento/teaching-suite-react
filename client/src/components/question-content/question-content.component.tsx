import styles from './question-content.module.scss';

interface Props {
  content: string | Array<string>;
}

const QuestionContent = ({ content }: Props) => {
  const question = typeof content === 'string' ? content : '';

  return (
    <p>{question}</p>
  );
};

export default QuestionContent;
