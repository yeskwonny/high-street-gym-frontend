import { Link } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import {
  FaFileArrowUp,
  FaRegCalendarCheck,
  FaComments,
  FaList,
  FaUser,
} from "react-icons/fa6";

function Nav() {
  const [user] = useAuthentication();

  const userRole = user.role;

  return (
    <nav className=" fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-evenly  border-t bg-slate-950 py-2 text-2xl text-stone-50">
      <Link to="/timetable">
        <FaRegCalendarCheck className="transition duration-150 hover:text-[#ff9c82]" />
      </Link>
      <Link to="/bookinglist">
        <FaList className="transition duration-150 hover:text-[#ff9c82]" />
      </Link>
      <Link to="/blog">
        <FaComments className="transition duration-150 hover:text-[#ff9c82]" />
      </Link>

      {userRole === "trainer" ? (
        <Link to="/import">
          <FaFileArrowUp className="transition duration-150 hover:text-[#ff9c82]" />
        </Link>
      ) : null}

      <Link to="/profile">
        <FaUser className="transition duration-150 hover:text-[#ff9c82]" />
      </Link>
    </nav>
  );
}

export default Nav;
