import ReactHTMLParser from "react-html-parser";
import { useState } from "react";

export default function Index() {
  const [query, setQuery] = useState("");
  let [numOccurances, setNumOccurances] = useState(0);
  const [results, setResults] = useState([]);

  return (
    <div>
      <title>TaylorTunes – A search engine for Taylor Swift Songs</title>
      <meta
        name="description"
        content="A search engine for Taylor Swift songs :)"
      />
      <div>
        <h1 className="font-bold text-4xl content-center text-gray-800 flex justify-center pt-[50px]">
          TaylorTunes
        </h1>
        <p className="flex justify-center pb-5 text-lg">
          Search lyrics from Taylor Swift songs
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for a song"
            className="text-2xl border-2 border-gray-200 rounded-l-2xl pl-2 w-1/2 border-r-0"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r-2xl"
            type="button"
            onClick={() => {
              let url = "https://taylortunes.pranavnt.repl.co/search/" + query;
              fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  setResults(data);
                });
              setNumOccurances(() => {
                let count = 0;
                for (let i = 0; i < results.length; i++) {
                  for (let j = 0; i < results[i].matches.length; j++) {
                    count++;
                  }
                }
                return count;
              });
            }}
          >
            Search
          </button>
        </div>
        <div className="text-2xl">
          {numOccurances == 0 ? "" : `${numOccurances} occurances`}
        </div>
        <div className="pl-2 pr-2">
          {results.map((result, index) => {
            return (
              <div key={index}>
                <h2 className="font-bold text-xl content-center text-gray-800">
                  {result.title}
                </h2>
                <p className="">{result.album}</p>
                {result.matches.map((match, index) => (
                  <>
                    <span
                      className="border-gray-200 border-b-[1px]"
                      key={index}
                    >
                      {ReactHTMLParser(
                        "<b>" + (index + 1) + "</b>" + " | " + match
                      )}
                    </span>
                    <br />
                  </>
                ))}
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
