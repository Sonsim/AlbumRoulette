import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Stats({ data, heard, Genres, globalData }) {
  const scored = [];
  const genreCount = [];
  const [numberHeard, setNumberHeard] = useState(0);
  const [numberRemaining, setNumberRemaing] = useState(0);
  const globalHeard = [];
  const globalScore = [];
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
  const GetGlobalHeard = () => {
    globalData.map((album) => {
      if (album.Is_Heard > 0) {
        globalHeard.push(album);
      }
    });
  };
  const GetAvrageScore = () => {
    globalData.forEach((album) => {
      if (album.Score > 0) {
        globalScore.push(album);
      }
    });
  };
  const CalculateAvrage = () => {
    globalScore.forEach((album) => {
      if (album.AvrageScore == null) {
        album.AvrageScore = album.Score / album.Is_Heard;
      }
    });
  };

  GetAvrageScore();
  GetGlobalHeard();
  GetScrored();
  GetCount();
  CalculateAvrage();
  const mostHeard = globalHeard.sort((a, b) =>
    a.Is_Heard < b.Is_Heard ? 1 : -1
  );
  const scoreSorted = globalScore.sort((a, b) => {
    a.Score < b.Score ? 1 : -1;
  });
  const globalScoredList = globalScore.map((album) => (
    <li key={album.Title}>
      Title: {album.Title} Avrage score: {album.AvrageScore}
    </li>
  ));
  const globalHeardList = globalHeard.map((album) => (
    <li key={album.ID}>
      Album: {album.Title} Times Heard: {album.Is_Heard}
    </li>
  ));
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
    <div className="flex flex-row h-5/6 w-screen justify-center relative z-30">
      <div className="flex flex-col ml-5 w-1/4">
        <h1 className="font-bold text-2xl mb-4 mt-6">Your stats</h1>
        <div className="border-solid border-2 rounded-lg mb-4 bg-white font-semibold text-black h-2/3">
          <ul>
            <li className="">Total albums heard: {numberHeard}</li>
            <li className="">Albums remaining: {numberRemaining}</li>
          </ul>
        </div>
        <Dropdown
          data={GenreList}
          heading={"Number of albums heard in each genre"}
        />
        <Dropdown data={scoredList} heading={"Score of each album"} />
      </div>

      <div className="flex flex-col w-1/4 ml-10">
        <h1 className="font-bold text-2xl mb-4 text-zinc-800 mt-6">
          Global stats
        </h1>
        <Dropdown data={globalHeardList} heading={"Most heard albums"} />
        <Dropdown data={globalScoredList} heading={"Most popular albums"} />
      </div>
    </div>
  );
}
