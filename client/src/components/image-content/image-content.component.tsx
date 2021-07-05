import styles from './image-content.module.scss';

interface Props {
  content: Array<string>;
}

const ImageContent = ({ content }: Props) => {
  return (
    <>
      {content.map((image, index) => (
        <div key={index} className={styles.container}>
          <img className={styles.image} src={image} alt='' />
        </div>
      ))}
    </>
  );
};

export default ImageContent;
