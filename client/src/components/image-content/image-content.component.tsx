import styles from './image-content.module.scss';

interface Props {
  content: string | Array<string>;
}

const ImageContent = ({ content }: Props) => {
  const src = typeof content === 'string' ? content : '';

  return (
    <div className={styles.container}>
      <img className={styles.image} src={src} />
    </div>
  );
};

export default ImageContent;
