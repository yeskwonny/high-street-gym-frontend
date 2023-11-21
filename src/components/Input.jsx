const InputField = ({ value, label, name, type, onChange, id }) => {
  return (
    <div>
      <label className="label p-0  text-stone-50" htmlFor={id}>
        <span className="label-text  text-stone-50">{label}</span>
      </label>

      <input
        type={type}
        value={value}
        name={name}
        className="input input-bordered input-sm w-full  max-w-sm rounded  ring-[#ff9c82] focus:ring-1 "
        onChange={onChange}
        id={id}
      ></input>
    </div>
  );
};

export default InputField;
