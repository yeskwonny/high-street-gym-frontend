import Header from "../components/Header";
import Nav from "../components/Nav";
import * as Blogs from "../api/blog";
import { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/authentication";

//when blog is loading, loading spinner
function Blog() {
  const [user] = useAuthentication();

  const authenticationKey = user.authKey;

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    date: "",
    userId: "",
  });
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // get blog lists TODO: Get new blog list after upaloding ?
  useEffect(() => {
    if (authenticationKey) {
      Blogs.getAllBlogs(authenticationKey)
        .then((result) => {
          setBlogs(result.blogs); // Update the blogs state with fetched data
        })
        .catch((error) => console.error("Error fetching blogs:", error));
    }
  }, [authenticationKey, handleOnSubmit]);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    blogData.date = date;
    blogData.userId = user.id;

    try {
      const blogMessage = await Blogs.createBlog(blogData, authenticationKey);
      // setStatus에 await를 실행했을 떄의 결과로 업데이트 해주기

      setStatus("Yay! Successfully uploaded your blog ");
    } catch (error) {
      setStatus("Error creating blog:", error);
    }

    setBlogData({
      title: "",
      content: "",
      date: "",
      userId: "",
    });
  }

  function handleOnCancle(e) {
    e.preventDefault();
    setBlogData({
      title: "",
      content: "",
      date: "",
      userId: "",
    });
  }

  return (
    <div className="   h-screen overflow-y-scroll bg-slate-950">
      <Header>Blog</Header>
      <form
        className="form-control mx-auto w-full gap-1 px-3"
        onSubmit={handleOnSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleOnChange}
          value={blogData.title}
          className="input input-bordered input-sm mx-auto mt-3 w-full max-w-sm"
          required
          minLength={1}
        />
        <textarea
          placeholder="Content"
          name="content"
          onChange={handleOnChange}
          value={blogData.content}
          className="textarea textarea-bordered textarea-lg mx-auto w-full max-w-sm"
          required
          minLength={1}
        ></textarea>

        <div className="mx-auto mb-2 mt-1 flex gap-1">
          <div>
            <button
              className={
                "btn btn-xs m-2 rounded-md border-transparent bg-[#ff9c82] font-light tracking-wider"
              }
            >
              Upload
            </button>
          </div>
          <button
            onClick={handleOnCancle}
            className={
              "btn btn-xs m-2 rounded-md border-transparent bg-[#ff9c82] font-light tracking-wider"
            }
          >
            CLEAR
          </button>
        </div>
      </form>
      <span className="mb-1 ml-3 text-[0.8rem] tracking-wider text-[#ff9c82]">
        {error}
      </span>
      <span className="mb-1 ml-3 text-[0.8rem] tracking-wider text-[#ff9c82]">
        {status}
      </span>
      <div className=" flex max-h-full flex-col items-center justify-center gap-3 ">
        {blogs &&
          blogs.map((blog) => (
            <div
              key={blog.id}
              tabIndex={0}
              className="collapse collapse-arrow h-3/6 w-11/12  border border-base-300 bg-base-200"
            >
              <div className=" font-small collapse-title flex justify-between  text-[12px]">
                {blog.title}
                <div className="flex flex-col text-[10px]">
                  {blog.datetime
                    ? new Date(blog.datetime).toLocaleDateString()
                    : ""}
                  <span>
                    By {blog.fname} {blog.lname}
                  </span>
                </div>
              </div>

              <div className="collapse-content">
                <p>{blog.content}</p>
              </div>
            </div>
          ))}
      </div>

      <Nav />
    </div>
  );
}

export default Blog;
