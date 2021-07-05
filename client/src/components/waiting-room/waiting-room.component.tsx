import styles from './waiting-room.module.scss';

interface Props {
  onClick: Function;
}

const WaitingRoom = ({ onClick }: Props) => {
  return (
    <div className={styles.waiting}>
      <h2 className={styles.heading}>You are in the waiting room</h2>
      <button className={styles.button} onClick={() => onClick()}>
        Join Room
      </button>
    </div>
  );
};

export default WaitingRoom;
