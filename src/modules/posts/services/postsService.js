import apiClient from "../../../api/apiClient";

export const getPosts = () => apiClient.get("/posts");
export const getPostById = (id) => apiClient.get(`/posts/${id}`);
export const createPost = (data) => apiClient.post("/posts", data);
export const updatePost = (id, data) => apiClient.put(`/posts/${id}`, data);
export const deletePost = (id) => apiClient.delete(`/posts/${id}`);

