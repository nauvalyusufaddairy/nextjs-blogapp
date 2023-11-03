import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import styles from "./cardlist.module.css";
import Image from "next/image";

export default async function Cardlist({ page }: { page: number }) {
  const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/posts?page=${page}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed");
    }

    return res.json();
  };
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Post</h1>
      <div className={styles.posts}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination />
    </div>
  );
}
