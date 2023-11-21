import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api/api";
import { useAuthentication } from "../hooks/authentication";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Button from "../components/Button";
import { FaFileArrowUp, FaRegCircleQuestion } from "react-icons/fa6";

function Import() {
  const [user] = useAuthentication();
  const [option, setOption] = useState("");
  const [fileName, setFileName]=useState("")
  const [statusMessage, setStatusMessage] = useState("");

  const uploadInputRef = useRef(null);

  // trainer
  function uploadFile() {
    const file = uploadInputRef.current.files[0];
    const formData = new FormData();
    formData.append("xml-file", file);

    if (option === "trainer-upload") {
      fetch(`${API_URL}/users/upload/xml`, {
        method: "POST",
        headers: {
          "X-AUTH-KEY": user.authKey,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((APIResponse) => {
          if (
            APIResponse.status === 200 &&
            APIResponse.results === "trainer-upload"
          ) {
            setStatusMessage(APIResponse.message);
          } else if (APIResponse.status === 400) {
            setStatusMessage(APIResponse.message);
          }
        })
        .catch((error) => {
          setStatusMessage("Upload failed - " + error);
        });
    } else if (option === "class-upload") {
      fetch(`${API_URL}/classes/upload/xml`, {
        method: "POST",
        headers: {
          "X-AUTH-KEY": user.authKey,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((APIResponse) => {
          if (
            APIResponse.status === 200 &&
            APIResponse.results === "class-upload"
          ) {
            setStatusMessage(APIResponse.message);
          } else if (APIResponse.status === 400) {
            setStatusMessage(APIResponse.message);
          }
        })
        .catch((error) => {
          setStatusMessage("Upload failed - " + error);
        });
    }
  }

  // function uploadFile(endpoint) {
  //   const file = uploadInputRef.current.files[0];
  //   const formData = new FormData();
  //   formData.append("xml-file", file);

  //   fetch(API_URL + endpoint, {
  //     method: "POST",
  //     headers: {
  //       "X-AUTH-KEY": user.authKey,
  //     },
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((APIResponse) => {
  //       setStatusMessage(`${fileName} / ${APIResponse.message}`);
  //       setFileName(APIResponse.results);
  //       // clear the selected file
  //       uploadInputRef.current.value = null;
  //       // Notify of successful upload
  //       // setStatusMessage(`${fileName} successfully uploaded!`);
  //     })
  //     .catch((error) => {
  //       setStatusMessage("Upload failed - " + error);
  //     });
  // }

  function handleOnChange(e) {
    console.log(e.target.value);
    setOption(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    uploadFile();
  }

  return (
    <div className=" flex h-screen flex-col overflow-y-auto bg-slate-950">
      <Header>Import file</Header>
      <div className="flex h-full flex-col items-center  gap-[30px] ">
        <span>
          <FaFileArrowUp className="mb-6 text-[5rem]" />
        </span>
        <div className="flex items-center justify-center text-center text-stone-50">
          <Link to="/importlist">
            <div className="justify-centertransition ml-1 flex items-center duration-150 hover:text-[#ff9c82]">
              <div className="pl-3">
                <FaRegCircleQuestion />
              </div>

              <p className="ml-1 text-[0.9rem]">
                Please check the trainer/ class list before uploading your file.
              </p>
            </div>
          </Link>
        </div>
        <form
          className="flex flex-col gap-4  text-[0.8rem]"
          onSubmit={handleOnSubmit}
        >
          <select
            onChange={(e) => handleOnChange(e)}
            value={option}
            className="select select-bordered w-full max-w-xs"
            required
          >
            <option disabled value="">
              Import file
            </option>
            <option value="class-upload">class-upload.xml</option>
            <option value="trainer-upload">trainer-upload.xml</option>
          </select>

          <input
            type="file"
            required
            className="file-input w-full max-w-xs"
            ref={uploadInputRef}
            onChange={(e) => {
              setFileName(e.target.files[0].name);
            }}
          />

          <div className="flex justify-around">
            <Button
              className="  w-30 btn btn-outline  bg-[#ff9c82] py-2  text-slate-900  "
              type="submit"
            >
              Upload
            </Button>
            <Button
              className=" w-30 btn  btn-outline  bg-[#ff9c82]  py-2  text-slate-900"
              type="submit"
              onClick={(e) => {
                {
                  e.preventDefault();
                  setOption("");
                  setFileName("");
                  setStatusMessage("");
                  uploadInputRef.current.value = "";
                }
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
        <span className="text-[#ff9c82]">{statusMessage}</span>
      </div>

      <Nav />
    </div>
  );
}

export default Import;
