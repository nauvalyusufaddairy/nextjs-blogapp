"use client";
import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
export default function Comments({ postSlug }: { postSlug: any }) {
  const session = useSession();
  const [desc, setDesc] = useState("");

  const fetcher = async (url: string) => {
    const res = await fetch(url);

    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data?.message);
      return error;
    }
    return data;
  };
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  console.log("ieu data", data, "ieu session", session.data);

  const handleDesc = async (data: string, postSlug: string) => {
    await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comment</h1>
      {session.status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />

          <button
            onClick={() => handleDesc(desc, postSlug)}
            className={styles.button}>
            send
          </button>
        </div>
      ) : (
        <Link href="/login">login to write a comment</Link>
      )}
      {isLoading ? (
        <h3>is loading</h3>
      ) : (
        data.map((item: any) => (
          <div className={styles.comments}>
            <div className={styles.comment}>
              <div className={styles.user}>
                <div className={styles.userContainer}>
                  {item.user.image && (
                    <Image
                      src={item.user.image}
                      width={50}
                      height={50}
                      alt=""
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item?.user.name}</span>
                    <span className={styles.date}>
                      {item.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>

                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
