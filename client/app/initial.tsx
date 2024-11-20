import { useEffect, useState } from "react";

interface InitialProps {
  setIsPregame: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  setTimeLeft: (value: number) => void;
}

export default function Initial({
  setIsPregame,
  name,
  setName,
  setTimeLeft,
}: InitialProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setError("");
  };

  const [error, setError] = useState("");
  const [leaderboardId, setLeaderboardId] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedLeaderboardId = localStorage.getItem("leaderboardId");
    const storedUserId = localStorage.getItem("userId");
    const date = localStorage.getItem("date");

    if (date && new Date(date).getDate() !== new Date().getDate()) {
      localStorage.removeItem("userId");
      localStorage.removeItem("leaderboardId");
      localStorage.removeItem("name");
      localStorage.removeItem("date");
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      setLeaderboardId(urlParams.get("leaderboardId") || "");
      if (storedName && storedLeaderboardId && storedUserId) {
        setName(storedName);
        setIsPregame(false);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (name === "") {
      setError("Name cannot be empty");
      return;
    }

    localStorage.setItem("name", name);

    setIsPregame(false);
    setTimeLeft(60);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col bg-[#e4e4e4]">
      <img src="/trivial.day.png" className="w-24 h-24" />
      <div className="h-4"></div>
      <h1 className="text-5xl font-extrabold text-black">Trivial</h1>
      <div className="h-4"></div>
      <h2 className="text-3xl p-2 max-w-3/4 text-center text-black font-baskerville">
        Answer 7 questions and see how you rank against your friends.
      </h2>
      <div className="h-4"></div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          className={`p-4 text-black mt-4 border-2 border-black rounded-full outline-none text-center font-baskerville ${
            error.length > 0 ? "border-red-500" : ""
          }`}
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        ></input>
        <div className="text-red-500 font-baskerville pb-3 text-xs">
          {error.length > 0 && error}
        </div>
        <button
          className="py-3 px-6 bg-black rounded-full text-white w-[150px] font-baskerville font-bold"
          onClick={handleSubmit}
          type="submit"
        >
          {leaderboardId.length > 0 ? "Join" : "Start"}
        </button>
      </form>
      <div className="h-4"></div>
      <p className="text-black font-baskerville font-bold">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="h-8"></div>
      <div className="text-[#575757] text-center text-xs font-baskerville">
        Trivia resets at every night at 11:59 EST
      </div>
      <div className="text-[#575757] text-center text-xs font-baskerville">
        Click here to sign up for email reminders!
      </div>
    </div>
  );
}
