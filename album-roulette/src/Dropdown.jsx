import { useState } from "react";

export default function Dropdown({ data, heading }) {
  const [open, SetOpen] = useState(true);
  const handleOpen = () => {
    SetOpen(!open);
  };

  return (
    <div className="border-solid border-2 rounded-lg mb-6 bg-purple-950 text-white">
      <button
        className="font-bold whitespace-nowraprelative "
        onClick={handleOpen}
      >
        <h1 className="text-green-500 hover:text-green-700">{heading}</h1>
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
