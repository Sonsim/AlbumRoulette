import video from "./assets/turntable.mp4";

export default function Background() {
  return (
    <>
      <video
        className="absolute z-10 w-screen overflow-hidden"
        autoPlay
        loop
        muted
        src={video}
        type="video/mp4"
      ></video>
    </>
  );
}
