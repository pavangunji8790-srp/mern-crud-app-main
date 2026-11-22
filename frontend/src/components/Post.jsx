
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "/api/v1/posts";

function Post({ post, onDelete }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/update-post/${post._id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      const response = await fetch(`${API_URL}/${post._id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete post");
      }

      onDelete(post._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="post">
      <h3 className="post-title">{post.title}</h3>

      <p className="post-content">{post.content}</p>

      {error && <p className="error">{error}</p>}

      <div className="post-actions">
        <button onClick={handleEdit}>Edit</button>

        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default Post;
