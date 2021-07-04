import styles from './text-content.module.scss';

interface Props {
  content: string | Array<string>;
}

const TextContent = ({ content }: Props) => {
  const text = typeof content === 'string' ? content : '';

  return (
    <p>{text}</p>
  );
};

export default TextContent;
