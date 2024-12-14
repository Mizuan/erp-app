import PropTypes from "prop-types";

const PostDetail = ({ post }) => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">{post.title}</h1>
    <p>{post.body}</p>
  </div>
);

PostDetail.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostDetail;
