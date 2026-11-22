
import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post";

const API_URL = import.meta.env.VITE_API_URL || "/api/v1/posts";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to retrieve posts");
      }

      const result = await response.json();
      setPosts(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = (deletedId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post._id !== deletedId)
    );
  };

  return (
    <div className="container">
      <Header />

      <h2>Blog Posts</h2>

      {loading && <p>Loading posts...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p>No posts available. Create your first post!</p>
      )}

      <div className="posts-container">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
