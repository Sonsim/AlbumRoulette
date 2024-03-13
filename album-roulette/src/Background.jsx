import video from "./assets/turntable.mp4";

export default function Background() {
  return (
    <div className=" w-auto h-max-[91.5%]  absolute z-10">
      <video
        className="object-cover"
        autoPlay
        loop
        muted
        src={video}
        type="video/mp4"
      ></video>
    </div>
  );
}
