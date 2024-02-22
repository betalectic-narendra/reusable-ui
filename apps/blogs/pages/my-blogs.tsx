import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import usePrivateRoute from "../hooks/usePrivateRoute";
import { getUserData, deleteData } from "../helpers/apis";
import EditBlogCard from "@repo/ui/editBlogCard";
function MyBlogs() {
  usePrivateRoute();
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const blogs = await getUserData(`/user-blogs`, user.token);
      setBlogs(blogs);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (uuid: string) => {
    await deleteData(`/blogs/${uuid}`, user.token);
    alert("Blog deleted successfully.");
    fetchBlogs();
  };

  return (
    <div>
      {blogs?.length > 0 &&
        blogs?.map((blog, index) => (
          <EditBlogCard
            key={index + blog?.name}
            blog={blog}
            handleDelete={() => handleDelete(blog?.uuid)}
          />
        ))}
    </div>
  );
}

export default MyBlogs;
