"use client";
import Image from "next/image";
import styles from "./write.module.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Write() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }
  if (status === "loading") {
    return <div className={styles.loading}>loading...</div>;
  }

  const handleChange = async (file: File | undefined) => {
    const formData = new FormData();
    formData.set("file", file as Blob);
    const rafah = await fetch("http://localhost:3000/api/img_upload", {
      method: "POST",
      body: formData,
    });

    const url = await rafah.json();
    setImg(url.url);
  };
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: img,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  console.log("imaaaage", img);
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(r) => setTitle(r.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>{" "}
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src={"/plus.png"} alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="tr"
              onChange={(e) => handleChange(e.target.files?.[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="tr">
              <div className={styles.addbutton}>
                <Image src={"/image.png"} alt="" width={16} height={16} />
              </div>
            </label>

            <button className={styles.addbutton}>
              <Image src={"/external.png"} alt="" width={16} height={16} />
            </button>
            <button className={styles.addbutton}>
              <Image src={"/video.png"} alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your stories..."
        />
      </div>

      <button onClick={handleSubmit} className={styles.publish}>
        Publish
      </button>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import styles from "./writePage.module.css";
// import { useEffect, useState } from "react";
// import "react-quill/dist/quill.bubble.css";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { app } from "@/utils/firebase";
// import dynamic from "next/dynamic";

// const WritePage = () => {
//   const { status } = useSession();
//   const router = useRouter();
//   const ReactQuill = dynamic()

//   const [open, setOpen] = useState(false);
//   const [file, setFile] = useState(null);
//   const [media, setMedia] = useState("");
//   const [value, setValue] = useState("");
//   const [title, setTitle] = useState("");
//   const [catSlug, setCatSlug] = useState("");

//   useEffect(() => {
//     const storage = getStorage(app);
//     const upload = () => {
//       const name = new Date().getTime() + file.name;
//       const storageRef = ref(storage, name);

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {},
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setMedia(downloadURL);
//           });
//         }
//       );
//     };

//     file && upload();
//   }, [file]);

//   if (status === "loading") {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (status === "unauthenticated") {
//     router.push("/");
//   }

//   const slugify = (str) =>
//     str
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//   const handleSubmit = async () => {
//     const res = await fetch("/api/posts", {
//       method: "POST",
//       body: JSON.stringify({
//         title,
//         desc: value,
//         img: media,
//         slug: slugify(title),
//         catSlug: catSlug || "style", //If not selected, choose the general category
//       }),
//     });

//     if (res.status === 200) {
//       const data = await res.json();
//       router.push(`/posts/${data.slug}`);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <input
//         type="text"
//         placeholder="Title"
//         className={styles.input}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <select
//         className={styles.select}
//         onChange={(e) => setCatSlug(e.target.value)}>
//         <option value="style">style</option>
//         <option value="fashion">fashion</option>
//         <option value="food">food</option>
//         <option value="culture">culture</option>
//         <option value="travel">travel</option>
//         <option value="coding">coding</option>
//       </select>
//       <div className={styles.editor}>
//         <button className={styles.button} onClick={() => setOpen(!open)}>
//           <Image src="/plus.png" alt="" width={16} height={16} />
//         </button>
//         {open && (
//           <div className={styles.add}>
//             <input
//               type="file"
//               id="image"
//               onChange={(e) => setFile(e.target.files[0])}
//               style={{ display: "none" }}
//             />
//             <button className={styles.addButton}>
//               <label htmlFor="image">
//                 <Image src="/image.png" alt="" width={16} height={16} />
//               </label>
//             </button>
//             <button className={styles.addButton}>
//               <Image src="/external.png" alt="" width={16} height={16} />
//             </button>
//             <button className={styles.addButton}>
//               <Image src="/video.png" alt="" width={16} height={16} />
//             </button>
//           </div>
//         )}
//         <ReactQuill
//           className={styles.textArea}
//           theme="bubble"
//           value={value}
//           onChange={setValue}
//           placeholder="Tell your story..."
//         />
//       </div>
//       <button className={styles.publish} onClick={handleSubmit}>
//         Publish
//       </button>
//     </div>
//   );
// };

// export default WritePage;
