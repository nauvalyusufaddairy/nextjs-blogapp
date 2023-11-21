import CategoryList from "@/components/categoryList/CategoryList";
import Featured from "@/components/featured/Featured";
import styles from "./home.module.css";
import Link from "next/link";
import Cardlist from "@/components/cardlist/CardList";
import Menu from "@/components/menu/Menu";

export default function Home({ searchParams }: { searchParams: any }) {
  const page = searchParams.page ?? "1";

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <Cardlist page={page} cat="" />
        <Menu />
      </div>
    </div>
  );
}
