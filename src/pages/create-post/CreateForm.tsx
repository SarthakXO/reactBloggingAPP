import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
interface CreatePostData {
  title: string;
  desc: string;
}

export const CreateForm = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Post needs to have a title")
      .min(5, "Title is too short, min 5 characters"),
    desc: yup
      .string()
      .required("Post needs to have a description")
      .min(10, "A post needs to have minimum 10 characters"),
  });

  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: CreatePostData) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    alert("You made a post!");
    navigate("/");
  };

  return (
    <div className="my-3">
      <div className="my-5">
        <form onSubmit={handleSubmit(onCreatePost)}>
          <label>Title</label>
          <div className="container d-flex justify-content-center ">
            <div className="form-group">
              <input
                type="text"
                className="form-control "
                id="exampleFormControlInput1"
                placeholder="title.."
                style={{ width: "350px" }}
                {...register("title")}
              />
              <p style={{ color: "red" }}>{errors.title?.message}</p>
            </div>
          </div>
          <div className="form-group container my-4">
            <label>Write your post below</label>
            <div className="mb-4">
              <textarea
                placeholder="whats on your mind"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={4}
                {...register("desc")}
              ></textarea>
              <p style={{ color: "red" }}>{errors.desc?.message}</p>
            </div>
            <input type="submit" className="btn btn-success my-5" />
          </div>
        </form>
      </div>
    </div>
  );
};
