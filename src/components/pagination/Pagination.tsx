"use client";
import { useRouter } from "next/navigation";
import styles from "./pagination.module.css";

export default function Pagination({
  page,
  hasPrev,
  hasNext,
}: {
  page: string;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const router = useRouter();
  const pageInt = parseInt(page);
  return (
    <div className={styles.container}>
      <button
        disabled={hasPrev}
        onClick={() => router.push(`?page=${pageInt - 1}`)}
        className={styles.button}>
        Prev
      </button>
      <button
        disabled={hasNext}
        onClick={() => router.push(`?page=${pageInt + 1}`)}
        className={styles.button}>
        Next
      </button>
    </div>
  );
}
