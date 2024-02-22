import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import usePrivateRoute from "../hooks/usePrivateRoute";
import { postData } from "../helpers/apis";
import LabeledInput from "@repo/ui/labeledInput";
import Form from "@repo/ui/form";
interface Blog {
  name: string;
  slug: string;
  content: string;
}

const AddBlog: React.FC = () => {
  usePrivateRoute();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState<Blog>({ name: "", slug: "", content: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postData("/blogs", blog, user.token);
      alert("Photo Added Successfully");
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
          type={"content"}
          value={blog?.content}
          name={"content"}
          handleChange={handleChange}
        />
      </Form>
    </div>
  );
};

export default AddBlog;
