import Link from "next/link";
import styles from "./card.module.css";
import Image from "next/image";

export default function Card({ item, key }: { item: Post; key: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {item.img && <Image src={item.img} alt="" />}
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{item.createdAt.substring(0, 10)}</span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>

        <p className={styles.desc}>{item.desc.substring(0, 60)}</p>
        <Link className={styles.link} href={`/posts/${item.slug}`}>
          Read more
        </Link>
      </div>
    </div>
  );
}
