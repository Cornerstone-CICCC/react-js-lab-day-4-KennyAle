import { Link } from "react-router-dom";
import { useBlogState } from "../stores/blog.store";

const Blog = () => {
  const { blogs } = useBlogState();

  return (
    <div className="flex flex-col p-4 w-full min-h-101">
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-2xl font-bold">Blog Entries</h1>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          to={"/blog/new"}
        >
          Create New Post
        </Link>
      </div>
      <ul className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <li className="flex justify-between " key={blog.id}>
            <p>{blog.title} - {blog.content} - {blog.published ? 'published' : 'not published'}</p>
            <div className="flex gap-2">
              <Link
                to={`/blog/${blog.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-xl"
              >
                See Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
