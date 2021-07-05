interface Props {
  content: Array<string>;
}

const QuestionContent = ({ content }: Props) => {
  return (
    <>
    {content.map((question, index) => (
      <p key={index}>{question}</p>
    ))}
    </>
  );
};

export default QuestionContent;
