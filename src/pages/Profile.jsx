import Header from "../components/Header";
import Nav from "../components/Nav";
import Form from "../components/Form";
import { useAuthentication } from "../hooks/authentication";
import { useState } from "react";
import * as Users from "../api/user";

function Profile() {
  //TODO Get logged in user
  const [user] = useAuthentication();
  const [status, setStatus] = useState("");
  const [isFormUpdated, setIsFormUpdated] = useState(false);
  const userRole = user.role;
  async function getFormdata(formData) {
    // console.log(`${formData} from profile api authkey ${user.authKey}`);
    const updatedResult = await Users.updateUser(formData, user.authKey);
    setStatus(updatedResult.message);
    if (updatedResult.status == 200) {
      setIsFormUpdated(true);
      console.log(isFormUpdated);
    } else {
      setIsFormUpdated(false);
    }
  }

  return (
    <div className=" h-screen  bg-slate-950">
      <Header>Profile</Header>

      <Form
        isUpdate={true}
        userId={user.id}
        className={"form-control mx-auto  w-full max-w-xs  "}
        onSubmit={getFormdata}
        userRole={user.role}
        user={user}
        status={status}
        isFormUpdated={isFormUpdated}
      />
      <Nav />
    </div>
  );
}

export default Profile;
