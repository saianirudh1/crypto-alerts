import styles from '../styles/Spinner.module.css';

function Spinner() {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
