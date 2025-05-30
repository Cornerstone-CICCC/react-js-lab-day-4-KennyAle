import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul className="bg-gray-800 text-white flex justify-between">
      <li className="p-4 text-2xl font-bold">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="p-4 text-2xl font-bold">
        <Link to={"/blog"}>Blog Listing</Link>
      </li>
    </ul>
  );
};

export default Header;
