
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Welcome to my blog</h1>
      <Link className="create-button" to="/create-post">
        Create Post
      </Link>
    </header>
  );
}

export default Header;
