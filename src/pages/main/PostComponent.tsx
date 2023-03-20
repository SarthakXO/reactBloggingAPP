import React, { useEffect, useState } from "react";
import { Post } from "./Main";
import { db } from "../../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

interface Props {
  post: Post;
}

interface Like {
  likeId: string;
  userId: string;
}

const PostComponent = (props: Props) => {
  const { post } = props;

  const [likes, setLikes] = useState<Like[] | null>(null);

  const [user] = useAuthState(auth);

  const likesRef = collection(db, "likes");

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch {
      console.log("error");
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDelteData = await getDocs(likeToDeleteQuery);

      const likeId = likeToDelteData.docs[0].id;

      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch {
      console.log("error");
    }
  };

  const userLiked = likes?.find((like) => like.userId === user?.uid);

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div
      className="container my-5 mt-5"
      style={{
        border: "dotted beige 1px",
        borderRadius: "20px",
        maxWidth: "30vw",
      }}
    >
      <div className="my-3">
        <h2>{post.title}</h2>
      </div>
      <div style={{ color: "cyan" }}>
        <h3>{post.desc}</h3>
      </div>
      <div>
        <h4>@{post.username}</h4>
        <button
          className="btn btn-primary mb-3"
          onClick={userLiked ? removeLike : addLike}
        >
          {userLiked ? <> &#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p> Likes:{likes?.length} </p>}
      </div>
    </div>
  );
};

export default PostComponent;
