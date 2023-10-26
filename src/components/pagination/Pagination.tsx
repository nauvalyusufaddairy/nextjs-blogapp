import styles from "./pagination.module.css";

export default function Pagination() {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Prev</button>
      <button className={styles.button}>Next</button>
    </div>
  );
}
