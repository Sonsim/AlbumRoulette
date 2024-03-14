import video from "./assets/turntable.mp4";
import png from "./assets/videopng.png";

export default function Background() {
  return (
    <div className="absolute z-10 w-full h-full  overflow-hidden ">
      <video
        className="w-auto min-w-full min-h-screen max-w-none  md:h-screen md:object-cover "
        autoPlay
        loop
        muted
        src={video}
        type="video/mp4"
      ></video>
    </div>
  );
}
