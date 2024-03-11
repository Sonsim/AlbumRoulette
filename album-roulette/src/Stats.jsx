import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Stats({ data, heard, Genres }) {
  const scored = [];
  const genreCount = [];
  const [numberHeard, setNumberHeard] = useState(0);
  const [numberRemaining, setNumberRemaing] = useState(0);

  useEffect(() => {
    let count = 0;
    data.map((album) => {
      if (album.Is_Heard) {
        count++;
      }
    });
    setNumberHeard(count);
  });
  useEffect(() => {
    let count = data.length - numberHeard;
    setNumberRemaing(count);
  });
  const GetCount = () => {
    Genres.map((genre) => {
      if (genre.counter > 0) {
        genreCount.push(genre);
      }
    });
  };
  const GetScrored = () => {
    heard.map((album) => {
      if (album.Score != null) {
        scored.push(album);
      }
    });
  };
  GetScrored();
  GetCount();
  const GenreList = genreCount.map((genre) => (
    <li key={genre.genre}>
      {genre.genre} Albums Heard: {genre.counter}
    </li>
  ));
  const scoredList = scored.map((score) => (
    <li key={score.Title}>
      Album: {score.Title} Score: {score.Score}
    </li>
  ));
  return (
    <div className="flex flex-row bg-black h-dvh">
      <div className="flex flex-col ml-5 w-2/4">
        <h1 className="font-bold text-2xl text-white">Your stats</h1>
        <div className="w-1/3 text-white">
          <ul>
            <li>Total albums heard: {numberHeard}</li>
            <li>Albums remaining: {numberRemaining}</li>
          </ul>
        </div>
        <Dropdown
          data={GenreList}
          heading={"Number of albums heard in each genre"}
        />
        <Dropdown data={scoredList} heading={"Score of each album"} />
      </div>
      <div>
        <div className="flex flex-col text-white">
          <h1 className="font-bold text-2xl">Global stats</h1>
          <ul>
            Most Heard:
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
