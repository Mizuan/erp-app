import { useEffect, useState } from "react";
import { getPosts, createPost } from "../services/postsService";
import PostCard from "../components/PostCard";
import AddPost from "../components/AddPost";
import { Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostsIndex = () => {

  const [posts, setPosts] = useState([]);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     // Fetch posts when the component is mounted
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getPosts();
        setPosts(response.data);
      } catch (err) {
        setError("Failed to load posts");
        console.error("Error fetching posts:", err);
        toast.error("Failed to load posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);


   // Function to handle adding a new post
  const handleAddPost = async (newPost) => {
    try {
      const response = await createPost(newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setIsAddPostOpen(false);
      toast.success("Post added successfully!");
    } catch (err) {
      console.error("Error adding post:", err);
      setError("Failed to add post");
      toast.error("Failed to add post");
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <button
          onClick={() => setIsAddPostOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Post
        </button>
      </div>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No posts available. Create your first post!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

       {/* AddPost modal */}
      <AddPost
        isOpen={isAddPostOpen}
        onSave={handleAddPost}
        onClose={() => setIsAddPostOpen(false)}
      />
    </div>
  );
};

export default PostsIndex;