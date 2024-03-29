import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Dropdown({ data, heading, chart, type }) {
  const [open, SetOpen] = useState(false);
  const [isChart, setIsChart] = useState();
  const option = {
    width: 400,
    height: 300,
  };
  const handleOpen = () => {
    SetOpen(!open);
  };
  useEffect(() => {
    if (chart) {
      setIsChart(true);
    } else {
      setIsChart(false);
    }
  });

  return (
    <div className="border-solid border-2 rounded-lg mb-6 bg-green-500 w-4/6 md:w-auto text-black ">
      <button
        className="font-bold whitespace-nowraprelative "
        onClick={handleOpen}
      >
        <h1 className="text-black hover:text-green-700">{heading}</h1>
      </button>
      {open ? (
        <div className="overflow-auto h-40">
          {isChart ? (
            <Chart chartType={type} data={data} options={option} />
          ) : (
            <ul>{data}</ul>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
