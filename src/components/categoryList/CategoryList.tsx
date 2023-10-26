import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  // const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        <Link
          href={"/blog?cat=style"}
          className={`${styles.category} ${styles.style}`}>
          <Image
            src="/style.png"
            width={32}
            height={32}
            alt=""
            className={styles.image}
          />{" "}
          style
        </Link>
        <Link href={"/blog"} className={`${styles.category} ${styles.fashion}`}>
          <Image
            src="/fashion.png"
            width={32}
            height={32}
            alt=""
            className={styles.image}
          />{" "}
          fashion
        </Link>
        <Link href={"/blog"} className={`${styles.category} ${styles.food}`}>
          <Image
            src="/food.png"
            width={32}
            height={32}
            alt=""
            className={styles.image}
          />{" "}
          food
        </Link>
        <Link href={"/blog"} className={`${styles.category} ${styles.travel}`}>
          <Image
            src="/travel.png"
            width={32}
            height={32}
            alt=""
            className={styles.image}
          />{" "}
          travel
        </Link>
        <Link href={"/blog"} className={`${styles.category} ${styles.culture}`}>
          <Image
            src="/culture.png"
            width={32}
            height={32}
            alt=""
            className={styles.image}
          />{" "}
          culture
        </Link>
        {/*         
        {data?.map((item) => (
          <Link
            href="/blog?cat=style"
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}>
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))} */}
      </div>
    </div>
  );
};

export default CategoryList;
