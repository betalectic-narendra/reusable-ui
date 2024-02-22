import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import usePrivateRoute from "../../hooks/usePrivateRoute";
import { AuthContext } from "../../context/AuthContext";
import { getUserData, putData } from "../../helpers/apis";
import LabeledInput from "@repo/ui/labeledInput";
import Form from "@repo/ui/form";
interface Blog {}
function EditBlog() {
  //redirect to /login page if user is not logged in
  usePrivateRoute();
  const {
    query: { uuid },
  } = useRouter();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState<Blog>({});
  const fetchBlog = async () => {
    try {
      const blog = await getUserData(`/blogs/${uuid}`, user.token);
      setBlog(blog);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await putData(`/blogs/${uuid}`, blog, user.token);
      alert("Blog updated Successfully");
      setBlog(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  return (
    <div className="flex items-center justify-center">
      <img
        alt={blog?.name}
        src={blog?.slug}
        className="h-48 w-48 object-cover"
      />

      <Form onSubmit={handleSubmit}>
        <LabeledInput
          label={"Slug Url"}
          type={"text"}
          value={blog?.slug}
          name={"slug"}
          handleChange={handleChange}
        />
        <LabeledInput
          label={"Name"}
          type={"text"}
          value={blog?.name}
          name={"name"}
          handleChange={handleChange}
        />
        <LabeledInput
          label={"Content"}
          type={"text"}
          value={blog?.content}
          name={"content"}
          handleChange={handleChange}
        />
      </Form>
    </div>
  );
}

export default EditBlog;
