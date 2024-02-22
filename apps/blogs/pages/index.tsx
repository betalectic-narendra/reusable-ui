import React, { useContext, useEffect, useState } from "react";
import { getData } from "../helpers/apis";
interface Blog {}
import CardCard from "@repo/ui/card";
function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetchData = async () => {
    try {
      const data = await getData("/blogs");
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {blogs &&
        blogs?.map((blog, index) => (
          <CardCard key={index + blog?.name} blog={blog}></CardCard>
        ))}
    </div>
  );
}

export default Page;
