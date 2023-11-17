import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";
export default function Comments({ postSlug }: { postSlug: any }) {
  const status = "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comment</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea placeholder="write a comment..." className={styles.input} />

          <button className={styles.button}>send</button>
        </div>
      ) : (
        <Link href="/login">login to write a comment</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <div className={styles.userContainer}>
              <Image
                src={"/p1.jpeg"}
                width={50}
                height={50}
                alt=""
                className={styles.image}
              />
              <div className={styles.userInfo}>
                <span className={styles.username}>John Doe</span>
                <span className={styles.date}> 01.01.2023</span>
              </div>
            </div>

            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              aspernatur mollitia odio autem consequatur soluta perspiciatis
              reiciendis numquam dolor fuga, quae atque veritatis voluptatum qui
              quas, esse hic? Harum, necessitatibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
