import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Form from "../components/Form";
import HeaderIntro from "../components/HeaderIntro";
import * as Users from "../api/user";

function Signup() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [isFormCreated, setIsFormCreated] = useState("error");
  // check with Jasper. why state is not updated properly?
  async function updateFormdata(formData) {
    const createdResult = await Users.registerUser(formData);
    if (createdResult.status === 200) {
      setStatus(createdResult.message);
      setIsFormCreated("created");
    } else {
      setIsFormCreated("error");
      setStatus(createdResult.message);
    }
  }

  return (
    <div className=" relative flex h-screen flex-col items-center justify-center overflow-y-auto bg-slate-950">
      <HeaderIntro paragraph={"Join today and be member of H.S.G!"} />
      <Form
        className={" mt-6  w-full max-w-xs rounded-none"}
        onSubmit={updateFormdata}
        status={status}
        isFormCreated={isFormCreated}
      />

      <Footer />
    </div>
  );
}

export default Signup;
