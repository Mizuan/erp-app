import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostCard = ({ post }) => (
  <div className="p-4 border rounded shadow">
    <Link to={`/posts/${post.id}`} className="text-lg font-bold text-blue-500 hover:underline">
      {post.title}
    </Link>
    <p className="text-sm text-gray-600">By {post.author}</p>
    <p className="text-sm text-gray-500">
      {new Date(post.createdDate).toLocaleDateString()} - {new Date(post.createdDate).toLocaleTimeString()}
    </p>
    <p className="mt-2">{post.body}</p>
  </div>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
