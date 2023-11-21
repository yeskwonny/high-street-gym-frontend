import InputField from "./Input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Users from "../api/user.js";
import { useAuthentication } from "../hooks/authentication";

function Form({
  className,
  onSubmit,
  userId,
  isUpdate,
  status,
  isFormCreated,
}) {
  const navigate = useNavigate();
  const [user] = useAuthentication();
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    id: null,
    fname: "",
    lname: "",
    role: "Customer",
    address: "",
    phone: "",
    email: "",
    password: "",
    authenticationKey: null,
  });

  useEffect(() => {
    if (userId) {
      Users.getUserByID(userId, user.authKey).then((user) => {
        setFormData((prev) => ({
          ...prev,
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          address: user.address,
          phone: user.phone,
          email: user.email,
          role: user.role,
          password: user.password,
          authenticationKey: user.authKey,
        }));
      });
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // validation
    if (name === "fname" || name === "lname") {
      const pattern = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/.test(value);
      setErrors({
        ...errors,
        [name]: pattern ? "" : `Name cannot have .,/ and number`,
      });
    }

    if (name === "phone") {
      const pattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value);
      setErrors({
        ...errors,
        [name]: pattern ? "" : `Invalid phone number`,
      });
    }

    if (name === "email") {
      const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        value,
      );
      setErrors({
        ...errors,
        [name]: pattern ? "" : `Invalid Email`,
      });
    }
  };

  // why isFormdata is false, even though state is true.
  function clearForm() {
    if (isFormCreated && isFormCreated !== "error") {
      setFormData({
        fname: "",
        lname: "",
        address: "",
        role: "",
        phone: "",
        email: "",
        password: "",
      });
      //navigate login page only state=created
      setTimeout(() => {
        navigate("/");
      }, 400);
    }
  }
  // TODO handle onclick subit for update and create
  function handleOnsubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }
  useEffect(() => {
    clearForm();
  }, [isFormCreated]);

  return (
    <form onSubmit={handleOnsubmit} className={className}>
      <InputField
        type="text"
        label="First Name"
        id="fname"
        name="fname"
        value={formData.fname}
        onChange={handleChange}
        pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$"
        required
      />
      {errors.fname && (
        <span className=" text-[10px] text-[#ff9c82]">{errors.fname}</span>
      )}

      <InputField
        type="text"
        label="Last Name"
        id="lname"
        name="lname"
        value={formData.lname}
        onChange={handleChange}
        required
      />
      {errors.lname && (
        <span className="text-[9px] text-[#ff9c82]">{errors.lname}</span>
      )}
      {isUpdate && user.role === "trainer" ? (
        <select
          className="select  select-bordered  select-sm mt-4 w-full max-w-xs rounded"
          value={formData.role}
          onChange={(e) =>
            setFormData((existing) => {
              return { ...existing, role: e.target.value };
            })
          }
          // disabled={!allowEditRole}
        >
          <option disabled value="">
            Choose the role
          </option>
          <option value={user.role === "trainer"}>Trainer</option>
          <option value={user.role === "customer"}>Customer</option>
        </select>
      ) : null}

      <InputField
        type="text"
        label="Address"
        name="address"
        id="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <InputField
        type="tel"
        label="Phone"
        name="phone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
        pattern="^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
        required
      />
      {errors.phone && (
        <span className="text-[9px] text-[#ff9c82]">{errors.phone}</span>
      )}

      <InputField
        type="email"
        label="Email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
        required
      />
      {errors.email && (
        <span className="text-[9px] text-[#ff9c82]">{errors.email}</span>
      )}

      <InputField
        type="password"
        label="Password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <span className=" text-sm text-[#ff9c82]">{status}</span>
      <div className="mt-4 flex items-center justify-around gap-2">
        <div>
          <button className="btn btn-outline w-40 bg-[#ff9c82]" type="submit">
            {isUpdate ? "Update" : "Submit"}
          </button>
        </div>
        <button
          onClick={() => navigate("/")}
          className={isUpdate ? "btn btn-outline w-20 bg-[#ff9c82] " : "hidden"}
        >
          {isUpdate ? "Back" : "Login"}
        </button>
      </div>
    </form>
  );
}

export default Form;
