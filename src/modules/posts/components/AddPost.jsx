import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AddPost = ({ isOpen, onSave, onClose, initialPost }) => {

  //State variables to store form field values

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [createdDate, setCreatedDate] = useState(() => new Date().toISOString());

  // useEffect to populate form fields when editing an existing post (initialPost is provided)
  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setBody(initialPost.body);
      setAuthor(initialPost.author);
      setCreatedDate(initialPost.createdDate);
    }
  }, [initialPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      id: String(new Date().getTime()),
      title,
      body,
      author,
      createdDate
    };

    
    onSave(postData);

    // Clear the form fields after submission
    
    setTitle("");
    setBody("");
    setAuthor("");
  };

  if (!isOpen) return null;

  return (
    <div
      id="add_post_modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto p-4"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow my-6">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">
            {initialPost ? 'Edit Post' : 'Add Post'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
            >
              <path
                d="M1 1l6 6m0 0l6 6M7 7l6-6m-6 6L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter post title"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block text-sm font-medium">
                Body
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
                placeholder="Enter post body"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter author name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="createdDate" className="block text-sm font-medium">
                Created Date
              </label>
              <input
                type="datetime-local"
                id="createdDate"
                value={new Date(createdDate).toISOString().slice(0, 16)}
                onChange={(e) =>
                  setCreatedDate(new Date(e.target.value).toISOString())
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border rounded-lg hover:bg-gray-100 hover:text-blue-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                {initialPost ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddPost.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialPost: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    createdDate: PropTypes.string,
  }),
};

export default AddPost;