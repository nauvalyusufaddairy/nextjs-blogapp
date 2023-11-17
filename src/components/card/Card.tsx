import Link from "next/link";
import styles from "./card.module.css";
import Image from "next/image";

export default function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/p1.jpeg" fill alt="" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>11.02.2023</span>
          <span className={styles.category}>culture</span>
        </div>
        <Link href={"/"}>
          <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
        </Link>

        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est
          illum minima delectus autem laboriosam consequuntur tempore repellat
          hic, ad nesciunt placeat rem neque, consequatur eos cum nostrum
          repudiandae totam!
        </p>
        <Link className={styles.link} href={"/"}>
          Read more
        </Link>
      </div>
    </div>
  );
}
