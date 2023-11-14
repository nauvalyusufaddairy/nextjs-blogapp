import Link from "next/link";
import styles from "./card.module.css";
import Image from "next/image";

export default function Card({ key, item }: { key: string; item: Post }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={item.img ?? ""} fill alt="" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{item.createdAt}</span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={"/"}>
          <h1>{item.title}</h1>
        </Link>

        <p className={styles.desc}>{item.desc}</p>
        <Link className={styles.link} href={"/"}>
          Read more
        </Link>
      </div>
    </div>
  );
}
