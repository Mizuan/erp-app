import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPostById, updatePost, deletePost } from "../services/postsService";
import { Pencil, Trash2 } from "lucide-react";
import AddPost from "../components/AddPost";

const PostDetailPage = () => {
  // Extract the post ID from the route parameters
  const { id } = useParams();
  const navigate = useNavigate();
  // state variables
  const [post, setPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch post details.");
      }
    };
    fetchPost();
  }, [id]);

   // Function to handle post updates
  const handleUpdate = async (updatedPost) => {
    try {
      const response = await updatePost(id, updatedPost);
      setPost(response.data);
      setIsEditMode(false);
      toast.success("Post updated successfully!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update the post.");
    }
  };
  // Function to handle post deletion
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this post?")) {
        await deletePost(id);
        navigate("/", { 
          state: { message: "Post deleted successfully!" }
        });
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to delete the post.");
    }
  };
  

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!post) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditMode(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit post"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete post"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">By</span>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Posted on</span>
              <time dateTime={post.createdDate}>
                {new Date(post.createdDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.body}</p>
          </div>
        </div>
      </div>

      {isEditMode && (
        <AddPost
          isOpen={isEditMode}
          onSave={handleUpdate}
          onClose={() => setIsEditMode(false)}
          initialPost={post}
        />
      )}
    </div>
  );
};

export default PostDetailPage;
