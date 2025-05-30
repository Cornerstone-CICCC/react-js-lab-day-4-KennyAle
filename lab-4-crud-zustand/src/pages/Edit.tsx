import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { useBlogState } from "../stores/blog.store";
import toast from "react-hot-toast";

const Edit = () => {
  const { readBlog, editBlog } = useBlogState();
  const { id } = useParams<string>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const post = readBlog(id);
      setTitle(post.title);
      setContent(post.content);
      setIsPublished(post.published);
    }
  }, [id]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const newBlog = {
      title: title,
      content: content,
      published: isPublished,
    };
    editBlog(id, newBlog);
    toast.success('Post Saved')
      navigate("/blog");
  };

  return (
    <div className="w-full h-100 flex flex-col gap-4 py-4">
      <h2 className="font-bold text-xl text-center">Edit Post</h2>
      <form onSubmit={handleSubmit} className="bg-white h-full flex flex-col">
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
          />
        </div>
        <div className="mb-6">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 text-sm">Published</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline rounded-xl cursor-pointer"
            type="submit"
          >
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
