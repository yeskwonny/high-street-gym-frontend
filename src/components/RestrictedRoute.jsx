import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";

import Button from "./Button";
import { FaRegHand } from "react-icons/fa6";
export function RestrictedRoute({ allowedRoles = [], children }) {
  const [user, login, logout] = useAuthentication();
  const navigate = useNavigate();

  const userIsAuthorised = user && allowedRoles.includes(user.role);
  return userIsAuthorised ? (
    children
  ) : (
    <div className=" flex h-screen flex-col items-center justify-center overflow-y-auto bg-slate-950">
      <span className="mb-3 text-[4rem] text-zinc-500">
        <FaRegHand />
      </span>
      <h1 className="text-[#ffff]">Unauthorized!</h1>

      <p className="text-center text-[#ffff]">
        We couldn't validated your credentials.
        <br />
        Please contact to help desk.
      </p>
      <Button
        className="w-30 btn btn-outline mt-4 bg-[#ff9c82]  text-black hover:bg-slate-50 "
        onClick={() => navigate(-1)}
      >
        Take me back
      </Button>
    </div>
  );
}
