import React from "react";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import PostComponent from "./PostComponent";

export interface Post {
  id: string;
  userId?: string;
  username: string;
  title: string;
  desc: string;
}

export const Main = () => {
  const postRef = collection(db, "posts");

  const [postList, setPostList] = useState<Post[] | null>(null);

  const getPost = async () => {
    const data = await getDocs(postRef);
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {postList?.map((post, key) => (
        <PostComponent key={key} post={post} />
      ))}
    </div>
  );
};
