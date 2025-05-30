import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Blog } from "../types/blog.types";
import { useBlogState } from "../stores/blog.store";
import toast from "react-hot-toast";

const Details = () => {
  const { deleteBlog, readBlog } = useBlogState();
  const { id } = useParams<string>();
  const [postInfo, setPostInfo] = useState<Blog>();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteBlog(id);
    navigate("/blog");
    toast.success('Post Deleted')
  };

  useEffect(() => {
    if (id) {
      const post = readBlog(id);
      setPostInfo(post);
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-2 p-4 w-full min-h-101">
      <h1 className="text-2xl font-bold mb-4">{postInfo?.title}</h1>
      <p className="mb-4">{postInfo?.content}</p>
      <p className="text-gray-500">
        {postInfo?.published ? "Published" : "Not Published"}
      </p>
      <Link
        to={`/blog/edit/${postInfo?.id}`}
        className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-xl"
      >
        Edit
      </Link>
      <button
        onClick={() => (postInfo?.id ? handleDelete(postInfo.id) : null)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-xl cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default Details;
