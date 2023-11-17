import Menu from "../../../components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "../../../components/comments/Comments";

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }: { params: any }) => {
  const { slug } = params;

  const data = await getData(slug);
  console.log("ieu data========", data);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.post.title}</h1>
          <div className={styles.user}>
            {data?.post?.user?.image && (
              <div className={styles.userImageContainer}>
                <img
                  src={data.post.user.image}
                  alt=""
                  style={{ backgroundSize: "fill" }}
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.post.user?.name}</span>
              <span className={styles.date}>
                {data?.post?.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data?.post.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            // dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
