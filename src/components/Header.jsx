import { useAuthentication } from "../hooks/authentication";
import { useNavigate } from "react-router-dom";

function Header({ children }) {
  const [user, login, logout] = useAuthentication();
  const navigate = useNavigate();

  function onClickLogout(e) {
    logout();
    navigate("/");
  }
  return (
    <div className="flex h-20 items-center justify-between p-4 tracking-wider text-neutral-50">
      <h1 className="text-2xl ">{children}</h1>
      <div className="flex flex-col items-center justify-center  text-stone-50 "></div>

      {/* TODO Logout function and hover effect  */}
      <span
        onClick={onClickLogout}
        className="cursor-pointer text-xs transition duration-150 hover:text-[#ff9c82]"
      >
        Logout
      </span>
    </div>
  );
}

export default Header;
