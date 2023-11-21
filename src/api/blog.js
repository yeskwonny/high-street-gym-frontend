import { API_URL } from "./api";

//Read blog
export async function getAllBlogs(authenticationKey) {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  const APIResponseObject = await response.json();
  return APIResponseObject;

  // return Promise.resolve(staticBlogs)
}
//Create blogs
export async function createBlog(blog, authenticationKey) {
  // staticBlogs.push(blog)
  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify({ blog }),
  });

  const APIResponseObject = await response.json();

  return APIResponseObject;
}
