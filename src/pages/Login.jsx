import { FaStumbleuponCircle } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthentication } from "../hooks/authentication";

function Login() {
  const navigate = useNavigate();
  const [user, login, logout] = useAuthentication();
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({ email: "", password: "" });

  // validate form data ? using useForm or function?
  function isFormDataValid() {
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
    ) {
      setStatus("Invalid Email format.");
      return false;
    }
    login(formData.email, formData.password)
      .then((result) => {
        setStatus(result);
        setFormData({ email: "", password: "" });
        navigate("/timetable");
      })
      .catch((error) => {
        setStatus(error);
      });
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleonLoginSubmit(e) {
    e.preventDefault();
    setStatus("Logging in...");
    if (!isFormDataValid()) {
      return;
    }
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-center  overflow-y-auto bg-slate-950 px-1 text-neutral-100">
      <div className="flex  flex-col items-center justify-center gap-4 text-[#ff9c82]">
        <h1 className="text-4xl">HIGH STREET GYM </h1>
        <FaStumbleuponCircle size={60} />
      </div>

      <form
        className="mt-6 grid grid-cols-2 gap-4 p-1"
        onSubmit={handleonLoginSubmit}
      >
        <label className="grid items-center tracking-wider">Email</label>
        <input
          className=" bg-slate-100 text-slate-900"
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={formData.email}
        ></input>
        <label className="grid items-center tracking-wider">Password</label>
        <input
          className=" bg-slate-100 text-slate-900 "
          type="password"
          id="password"
          name="password"
          onChange={handleOnChange}
          value={formData.password}
        ></input>

        <button
          className=" col-span-2 mt-2 bg-stone-100 py-2 tracking-widest text-slate-900 ring-[#ff9c82]  hover:ring-2 sm:my-5"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="mb-1 text-[0.8rem] tracking-wider text-[#ff9c82]">
        {status}
      </div>

      <div className="  flex flex-row gap-6  text-sm">
        <p>Join us today</p>
        <span
          onClick={() => navigate("/signup")}
          className="duration-400  text cursor-pointer underline underline-offset-4 transition hover:text-[#ff9c82]"
        >
          Create Account
        </span>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
