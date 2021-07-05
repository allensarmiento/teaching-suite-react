interface Props {
  content: Array<string>;
}

const TextContent = ({ content }: Props) => {
  return (
    <>
      {content.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </>
  );
};

export default TextContent;
