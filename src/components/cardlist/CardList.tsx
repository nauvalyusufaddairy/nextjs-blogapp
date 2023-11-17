import Card from "../card/Card";
import Pagination from "../pagination/Pagination";
import styles from "./cardlist.module.css";
import Image from "next/image";

export default async function Cardlist({
  page,
  cat,
}: {
  page: string;
  cat: string;
}) {
  const { posts, count } = await getData(page, cat);
  const POST_PER_PAGE = 2;
  const pageInt = parseInt(page);
  console.log("=============================", count, pageInt);
  const hasPrev = POST_PER_PAGE * (pageInt - 1) > 0;
  const hasNext = POST_PER_PAGE * (pageInt - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Post</h1>
      <div className={styles.posts}>
        {posts.map((item: any) => (
          <Card key={item?._id} item={item} />
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
}
const getData = async (page: string, cat: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
