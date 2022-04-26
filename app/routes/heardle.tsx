import JSConfetti from "js-confetti";
import Select from "react-select";
import songsList from "~/utils/songsList";
import selectSong from "~/utils/selectSong";
import { useState, useEffect } from "react";
import AudioPlayer from "~/components/AudioPlayer";

export default function Heardle() {
  const [song, setSong] = useState("");
  const [songTime, setSongTime] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [numGuesses, setNumGuesses] = useState(0);
  const [guesses, setGuesses] = useState(["‎", "‎", "‎", "‎", "‎", "‎"]);
  const [isOver, setIsOver] = useState(false);
  const [currGuess, setCurrGuess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("hasPlayed") == null) {
      localStorage.setItem("song", selectSong(new Date()));
      localStorage.setItem("streak", "0");
      localStorage.setItem("hasPlayed", "true");
      localStorage.setItem("numPlays", "0");
      localStorage.setItem("numCorrect", "0");
    }
    globalThis.duration = 1;
    setSong(selectSong(new Date()));
  }, []);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
        maxWidth: "400px",
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <h1>Taylor Swift Heardle</h1>
      <p>Guess the Taylor Swift Song</p>
      <AudioPlayer song={selectSong(new Date())} />
      {guesses.map((guess, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: "#f7f8f2",
              border: "1px solid #CCC",
              marginTop: "10px",
              marginBottom: "10px",
              height: "35px",
              borderRadius: "5px",
              paddingLeft: "10px",
              textAlign: "left",
              fontSize: "20px",
            }}
          >
            {guess}
          </div>
        );
      })}
      <br />
      {!isOver ? (
        <>
          <Select
            id="react-select-song"
            className="basic-single"
            classNamePrefix="select"
            defaultValue="22"
            isClearable={true}
            isSearchable={true}
            name="song-selection"
            options={sortedSongsList.map((el, index) => {
              return { id: index, label: el };
            })}
            onChange={(e) => {
              setCurrGuess(e.label);
            }}
          />
          <button
            onClick={(e) => {
              if (currGuess == "") return;

              guesses[numGuesses] = currGuess;

              if (guesses[numGuesses] === song) {
                setIsOver(true);
                new JSConfetti().addConfetti();
                localStorage.setItem(
                  "streak",
                  `${parseInt(localStorage.getItem("streak") || "0") + 1}`
                );
                localStorage.setItem(
                  "numPlays",
                  `${parseInt(localStorage.getItem("numPlays") || "0") + 1}`
                );
                localStorage.setItem(
                  "numCorrect",
                  `${parseInt(localStorage.getItem("numCorrect") || "0") + 1}`
                );
              } else {
                globalThis.duration = globalThis.duration * 2;
              }

              setNumGuesses(numGuesses + 1);

              if (numGuesses == 5) {
                globalThis.duration = 32;
                localStorage.setItem("streak", "0");
                localStorage.setItem(
                  "numPlays",
                  `${parseInt(localStorage.getItem("numPlays") || "0") + 1}`
                );
                setIsOver(true);
              }
            }}
            style={{
              backgroundColor: "#EEE",
              border: "1px solid #CCC",
              marginTop: "5px",
              height: "38px",
              width: "150px",
              borderRadius: "5px",
              backgroundColor: "#5c8bc4",
              color: "white",
              textAlign: "center",
              float: "left",
              fontSize: "20px",
              fontWeight: "semibold",
              cursor: "pointer",
            }}
          >
            🔮 Guess
          </button>
        </>
      ) : (
        <button
          onClick={(e) => {
            let squareString = "";
            for (let guess of guesses) {
              if (guess != "‎") {
                if (guess !== song) {
                  squareString += "🟥";
                } else {
                  squareString += "🟩";
                }
              } else {
                squareString += "⬛";
              }
            }
            let str = `Taylor Swift Heardle 💛

🔇 ${squareString} (${
              squareString == "⬛⬛⬛⬛⬛⬛" ? "X" : squareString.length - 6
            }/6)

https://taylortunes.app/heardle`;

            navigator.clipboard.writeText(str);
          }}
          style={{
            background: "none",
            border: "none",
            borderRadius: "5px",
            height: "35px",
            backgroundColor: "#e0af6b",
            color: "white",
            fontSize: "1.2em",
            fontWeight: "bold",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Share
        </button>
      )}
    </div>
  );
}

const sortedSongsList: string[] = [
  "22",
  "A Perfectly Good Heart",
  "A Place in this World",
  "Afterglow",
  "All Too Well (10 Minute Version)",
  "All You Had To Do Was Stay",
  "Babe",
  "Back To December",
  "Bad Blood",
  "Begin Again",
  "Better Man",
  "Better Than Revenge",
  "Blank Space",
  "Breathe",
  "Bye Bye Baby",
  "Call It What You Want",
  "Change",
  "Christmas Tree Farm",
  "Clean",
  "Cold As You",
  "Come Back...Be Here",
  "Come In With The Rain",
  "Cornelia Street",
  "Crazier",
  "Cruel Summer",
  "Dancing With Our Hands Tied",
  "Daylight",
  "Dear John",
  "Death By A Thousand Cuts",
  "Delicate",
  "Don’t Blame Me",
  "Don’t You",
  "Dress",
  "Enchanted",
  "End Game",
  "Everything Has Changed",
  "Eyes Open",
  "False God",
  "Fearless",
  "Fifteen",
  "Forever & Always",
  "Forever Winter",
  "Girl At Home",
  "Gorgeous",
  "Haunted",
  "Hey Stephen",
  "Holy Ground",
  "How You Get The Girl",
  "I Almost Do",
  "I Bet You Think About Me",
  "I Did Something Bad",
  "I Forgot That You Existed",
  "I Knew You Were Trouble",
  "I Know Places",
  "I Think He Knows",
  "I Wish You Would",
  "I'm Only Me When I'm With You",
  "Innocent",
  "Invisible",
  "It’s Nice To Have A Friend",
  "Jump Then Fall",
  "King Of My Heart",
  "Last Christmas",
  "Last Kiss",
  "London Boy",
  "Long Live",
  "Look What You Made Me Do",
  "Love Story",
  "Lover",
  "ME!",
  "Mary's Song (Oh My My My)",
  "Mean",
  "Message In A Bottle",
  "Mine",
  "Miss Americana & The Heartbreak Prince",
  "Mr. Perfectly Fine",
  "Never Grow Up",
  "New Romantics",
  "New Year’s Day",
  "Nothing New",
  "Our Song",
  "Ours",
  "Out Of The Woods",
  "Paper Rings",
  "Picture To Burn",
  "Ready For It",
  "Red",
  "Ronan",
  "Run",
  "Sad Beautiful Tragic",
  "Shake It Off",
  "Should've Said No",
  "Silent Night",
  "So It Goes...",
  "Soon You’ll Get Better",
  "Sparks Fly",
  "Speak Now",
  "Starlight",
  "State Of Grace",
  "Stay Beautiful",
  "Stay Stay Stay",
  "Style",
  "Superman",
  "Superstar",
  "Teardrops on My Guitar",
  "Tell Me Why",
  "That’s When",
  "The Archer",
  "The Best Day",
  "The Last Time",
  "The Lucky One",
  "The Man",
  "The Moment I Knew",
  "The Other Side Of The Door",
  "The Outside",
  "The Story Of Us",
  "The Very First Night",
  "The Way I Loved You",
  "This Is Why We Can't Have Nice Things",
  "This Love",
  "Tied Together with a Smile",
  "Tim McGraw",
  "Today Was A Fairytale",
  "Treacherous",
  "Untouchable",
  "We Are Never Ever Getting Back Together",
  "We Were Happy",
  "Welcome To New York",
  "White Horse",
  "Wildest Dreams",
  "Wonderland",
  "You All Over Me",
  "You Are In Love",
  "You Belong With Me",
  "You Need To Calm Down",
  "You’re Not Sorry",
  "august",
  "betty",
  "cardigan",
  "champagne problems",
  "closure",
  "coney island",
  "cowboy like me",
  "dorothea",
  "epiphany",
  "evermore",
  "exile",
  "gold rush",
  "happiness",
  "hoax",
  "illicit affairs",
  "invisible string",
  "it’s time to go",
  "ivy",
  "long story short",
  "mad woman",
  "marjorie",
  "mirrorball",
  "my tears ricochet",
  "no body, no crime",
  "peace",
  "right where you left me",
  "seven",
  "the 1",
  "the lakes",
  "the last great american dynasty",
  "this is me trying",
  "tolerate it",
  "willow",
  "‘tis the damn season",
];
