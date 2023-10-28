import Cardlist from "@/components/cardlist/CardList";
import styles from "./blogPage.module.css";
import Menu from "@/components/menu/Menu";
export default function BlogPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Style Blog</h1>
      <div className={styles.content}>
        <Cardlist />
        <Menu />
      </div>
    </div>
  );
}
