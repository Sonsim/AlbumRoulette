import { useState } from "react";

export default function Dropdown({ data, heading }) {
  const [open, SetOpen] = useState(false);

  const handleOpen = () => {
    SetOpen(!open);
  };

  return (
    <div className="text-white">
      <button
        className="font-bold whitespace-nowraprelative "
        onClick={handleOpen}
      >
        <h1>{heading}</h1>
      </button>
      {open ? (
        <div className="overflow-auto ">
          <ul>{data}</ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
