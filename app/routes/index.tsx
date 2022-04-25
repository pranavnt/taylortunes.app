import songsList from "~/utils/songsList";
import selectSong from "~/utils/selectSong";
import { useState, useEffect } from "react";
import AudioPlayer from "~/components/AudioPlayer";

export default function Index() {
  const [song, setSong] = useState("");
  const [songTime, setSongTime] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [numGuesses, setNumGuesses] = useState(0);
  const [guesses, setGuesses] = useState(["‎", "‎", "‎", "‎", "‎", "‎"]);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
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
              backgroundColor: "#EEE",
              border: "1px solid #CCC",
              margin: "10px",
              height: "35px",
              borderRadius: "5px",
            }}
          >
            <p>{guess}</p>
          </div>
        );
      })}
      {!isOver ? (
        <>
          <input
            type="text"
            id="guess-input"
            onKeyUp={() => {
              let filter = document
                .getElementById("guess-input")
                ?.value.toUpperCase();
              let li = document
                .getElementById("songs-options-list")
                ?.getElementsByTagName("li");

              for (let i = 0; i < li.length; i++) {
                let txtValue = li[i].textContent || li[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  li[i].style.display = "";
                } else {
                  li[i].style.display = "none";
                }
              }
            }}
            onClick={() => {
              setIsClicked(true);
            }}
            placeholder="Search for songs"
            title=""
          />
          <button
            onClick={(e) => {
              guesses[numGuesses] =
                document.getElementById("guess-input")?.value;
              setGuesses(guesses);

              if (guesses[numGuesses] === song) {
                console.log("correct");
                setIsOver(true);
                alert("You won!");
              } else {
                console.log("incorrect");
                globalThis.duration = globalThis.duration * 2;
              }

              setNumGuesses(numGuesses + 1);

              if (numGuesses == 5) {
                globalThis.duration = 32;
                setIsOver(true);
              }
            }}
          >
            Guess
          </button>
        </>
      ) : (
        <button
          onClick={(e) => {
            let str = `Taylor Swift Heardle`;
          }}
        >
          Share
        </button>
      )}
      {isClicked && (
        <ul
          id="songs-options-list"
          style={{
            overflow: "scroll",
            maxHeight: "200px",
            listStyle: "none",
            textAlign: "left",
            padding: "10px",
            overflowX: "hidden",
          }}
        >
          {sortedSongsList.map((song, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  console.log(song);
                  document.getElementById("guess-input").value = song;
                }}
              >
                {song}
              </li>
            );
          })}
        </ul>
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
