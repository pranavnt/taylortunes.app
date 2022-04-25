import { useEffect, useState } from "react";

export default function AudioPlayer(props: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playTil = (time: number) => {
    setIsPlaying(true);
  };

  const songURL = `/${props.song}.mp3`;

  useEffect(() => {
    document.getElementById("play-button")?.addEventListener("click", () => {
      let audio = new Audio(songURL);
      if (isPlaying) {
        setIsPlaying(false);
        audio.pause();
      } else {
        setIsPlaying(true);
        // play audio for globalThis.duration seconds
        audio.play();
        audio.addEventListener("timeupdate", () => {
          if (audio.currentTime >= globalThis.duration) {
            audio.pause();
            setIsPlaying(false);
          }
        });
      }
    });
  }, []);
  return (
    <div>
      <button
        id="play-button"
        style={{
          background: "none",
          color: "inherit",
          border: "none",
        }}
      >
        {isPlaying ? (
          <img src="/pause-icon.png" alt="Pause" width="20px" height="20px" />
        ) : (
          <img src="play-icon.png" alt="Play" width="20px" height="20px" />
        )}
      </button>
      <img
        src={`/play-pt-${Math.log2(globalThis.duration || 0) + 1}.png`}
        alt="progress bar"
        width="80%"
      />
    </div>
  );
}

interface AudioPlayerProps {
  song: string;
}
