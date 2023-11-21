function Select() {
  return (
    <div className="flex  flex-col gap-4">
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>
          Import file
        </option>
        <option>file</option>
        <option>file</option>
      </select>

      <input type="file" className="file-input w-full max-w-xs" />
    </div>
  );
}

export default Select;
