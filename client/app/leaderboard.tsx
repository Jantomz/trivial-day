"use client";
import { useEffect, useState } from "react";

import { ShareSocial } from "react-share-social";

interface LeaderboardProps {
  exitLeaderboard: () => void;
}

export default function Leaderboard({
  exitLeaderboard,
  score,
  name,
  choices,
  time,
  leaderboardId,
  setLeaderboardId,
}: LeaderboardProps & {
  score: number;
  name: string;
  choices: string[];
  time: number;
  leaderboardId: string;
  setLeaderboardId: (value: string) => void;
}) {
  interface LeaderboardEntry {
    name: string;
    score: number;
    time: number;
  }

  const [date, setDate] = useState(new Date());

  const style = {
    root: {
      background: "transparent",
      borderRadius: 3,
      border: 0,
      color: "white",
      width: "280px",
      padding: "0px",
    },
    copyContainer: {
      border: "1px solid green",
      background: "rgb(0,0,0,0.7)",
    },
    title: {
      color: "white",
    },
  };

  const shareLink = window.location.href.replace(/^http:\/\//, "");

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!localStorage.getItem("userId")) {
      const logGame = async () => {
        try {
          const res = await fetch(
            "https://server-492720927923.us-east1.run.app/api/user",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                score,
                choices,
                time,
                leaderboardId,
              }),
              signal,
            }
          );
          const data = await res.json();
          console.log(data);
          localStorage.setItem("userId", data.user._id);
          window.history.replaceState(
            null,
            "",
            `?leaderboardId=${data.leaderboard._id}`
          );
          setLeaderboardId(data.leaderboard._id);
          const userIds = data.leaderboard.users;
          const userPromises = userIds.map(async (userId: string) => {
            const userRes = await fetch(
              `https://server-492720927923.us-east1.run.app/api/user/${userId}`,
              { signal }
            );
            const user = await userRes.json();
            return user.user;
          });
          const users = await Promise.all(userPromises);
          console.log(users);
          localStorage.setItem("leaderboardId", data.leaderboard._id);
          setLeaderboard(users);
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            console.error("Fetch error:", error);
          }
        }
      };

      logGame();
    } else {
      const getLeaderboard = async () => {
        try {
          const res = await fetch(
            `https://server-492720927923.us-east1.run.app/api/leaderboard/${leaderboardId}`,
            { signal }
          );

          const data = await res.json();
          console.log(data.leaderboard.users);
          const userIds = data.leaderboard.users;
          const userPromises = userIds.map(async (userId: { _id: string }) => {
            const userRes = await fetch(
              `https://server-492720927923.us-east1.run.app/api/user/${userId._id}`,
              { signal }
            );
            const user = await userRes.json();
            return user.user;
          });
          const users = await Promise.all(userPromises);
          localStorage.setItem("leaderboardId", leaderboardId);
          console.log(users);
          setLeaderboard(users);
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            console.error("Fetch error:", error);
          }
        }
      };
      getLeaderboard();
    }
    const getDate = async () => {
      setDate(new Date());
    };

    getDate();

    return () => {
      controller.abort();
    };
  }, [name, score, time, leaderboardId, setLeaderboardId]);

  return (
    <main className="h-screen w-screen bg-black/40 fixed inset-0 flex items-center justify-center">
      <section className="bg-[#171717] max-md:w-full max-md:m-4 p-12 rounded-lg relative max-h-screen w-1/2 overflow-y-auto">
        <button
          onClick={() => exitLeaderboard()}
          className="absolute top-2 right-4 text-white text-4xl hover:text-gray-300"
        >
          &times;
        </button>
        {name && score ? (
          <h1 className="text-4xl text-center">
            {name}, you scored {score}/7
          </h1>
        ) : (
          <h1 className="text-2xl text-center font-abril ">
            Are you smarter than your friends?
          </h1>
        )}
        <div className="h-[40px]"></div>
        <h1 className="text-4xl text-center mb-4 max-md:text-2xl">
          Leaderboard
        </h1>
        <h1 className="text-lg text-center mb-4 max-md:text-base">
          {date.toLocaleString("default", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h1>
        <div className="max-h-96 overflow-y-auto font-baskerville">
          <ol className="flex flex-col gap-2">
            {leaderboard
              .sort((a, b) => {
                if (b.score === a.score) {
                  return a.time - b.time;
                }
                return b.score - a.score;
              })
              .map((entry, index) => (
                <li
                  key={index}
                  className={`flex bg-[#2e2e2e] border-2 justify-between p-2 rounded-lg ${
                    index === 0
                      ? "border-[#efbf04]"
                      : index === 1
                      ? "border-[#C0C0C0]"
                      : index === 2
                      ? "border-[#CD7F32]"
                      : "border-[#1e1e1e]"
                  }`}
                >
                  <span>
                    {index + 1}. {entry.name}
                  </span>
                  <span>
                    {entry.score}/7 in {entry.time}s
                  </span>
                </li>
              ))}
          </ol>
        </div>
        <div className="h-[40px]"></div>
        <section className="flex flex-col justify-center items-center">
          <p className="font-baskerville text-center"></p>
          <div id="clipboard" className="relative">
            <div>
              <ShareSocial
                title={
                  "Send your friends this link to see them on the leaderboard!"
                }
                url={shareLink}
                style={style}
                socialTypes={["facebook", "twitter", "reddit", "whatsapp"]}
              />
            </div>
          </div>
          <div className="h-8"></div>
          <p className="text-2xl font-bold py-2 text-center">
            Trivia resets in:{" "}
            {new Date().getHours() < 24 ? 23 - new Date().getHours() : 0}h{" "}
            {59 - new Date().getMinutes()}m {59 - new Date().getSeconds()}s
          </p>
        </section>
      </section>
    </main>
  );
}
