import React from 'react';
import Link from 'next/link';
interface Blog{
}

interface BlogProps {
  blog:Blog,
  handleDelete: (uuid: string) => void;
}

const EditBlogCard: React.FC<BlogProps> = ({ blog, handleDelete }) => {
  return (
    <div
      className="mb-8 border-b border-gray-300 py-4 flex items-center"
    >
      <img
        className="w-24 h-24 object-cover rounded-full mr-4"
        src={blog?.slug}
        alt={blog?.name}
      />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">{blog?.name}</h2>
        <div className="flex mt-2">
          <Link
            href={`/edit/${blog?.uuid}`}
            className="text-blue-500 mr-4 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(blog?.uuid)}
            className="bg-red-500 text-white rounded px-3 py-1 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlogCard;
