import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogState } from "../stores/blog.store";
import toast from "react-hot-toast";

const New = () => {
  const { addBlog } = useBlogState();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      addBlog({
        title: title,
        content: content,
        published: false,
      });
      toast.success("Post Created");
    }

      setTitle("");
      setContent("");
      navigate("/blog");
  };
  return (
    <div className="w-full h-101">
      <form
        onSubmit={handleSubmit}
        className="bg-white h-full flex flex-col justify-center rounded"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            type="content"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl cursor-pointer focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
