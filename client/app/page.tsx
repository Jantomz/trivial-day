"use client";

import { useEffect, useState } from "react";
import Leaderboard from "./leaderboard";
import Initial from "./initial";

// TODO: Prepare the questions to ask + (interesting questions, images?)
// TODO: Setup an automatic question refresh

export default function Home() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [questions, setQuestions] = useState<
    { question: string; answers: string[]; correctAnswer: string }[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(100); // 100 seconds timer
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboardId, setLeaderboardId] = useState("");
  const [timeUsed, setTimeUsed] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [users, setUsers] = useState<
    {
      _id: string;
      name: string;
      score: number;
      time: number;
      choices: string[];
    }[]
  >([]);

  const [name, setName] = useState("");

  const [isPregame, setIsPregame] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch("http://localhost:8080/api/questions");
      const data = await response.json();
      console.log(data);
      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedLeaderboardId = localStorage.getItem("leaderboardId");

    const getUser = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const userRes = await fetch(
        `http://localhost:8080/api/user/${storedUserId}`,
        {
          signal,
        }
      );
      const user = await userRes.json();
      // console.log("HIHIH", user);
      setChoices(user.user.choices);
      setScore(user.user.score);
      setTimeUsed(user.user.time);
    };
    if (storedLeaderboardId && storedUserId) {
      setLeaderboardId(storedLeaderboardId);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("leaderboardId", storedLeaderboardId);
      window.history.pushState({}, "", newUrl.toString());
      setShowLeaderboard(true);
      setTimeLeft(0); // stop the timer
      setCurrentQuestionIndex(7); // skip to the end
      getUser();
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const leaderboardId = urlParams.get("leaderboardId");
    if (leaderboardId) {
      setLeaderboardId(leaderboardId);
    } else {
      const newLeaderboardId = "";
      setLeaderboardId(newLeaderboardId);
    }
    console.log(leaderboardId);
  }, []);

  const exitLeaderboard = () => {
    setTimeLeft(60); // reset timer
    setShowLeaderboard(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getLeaderboard = async () => {
      if (!leaderboardId) return;
      try {
        const res = await fetch(
          `http://localhost:8080/api/leaderboard/${leaderboardId}`,
          { signal }
        );

        const data = await res.json();
        console.log(data.leaderboard.users);
        const userIds = data.leaderboard.users;
        const userPromises = userIds.map(async (userId: { _id: string }) => {
          const userRes = await fetch(
            `http://localhost:8080/api/user/${userId._id}`,
            { signal }
          );
          const user = await userRes.json();
          return user.user;
        });
        const users = await Promise.all(userPromises);
        localStorage.setItem("leaderboardId", leaderboardId);
        console.log("Leaderboard Users:", users);
        setUsers(users);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      }
    };
    getLeaderboard();
  }, [leaderboardId]);

  useEffect(() => {
    if (timeLeft === 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setTimeLeft(60); // reset timer for next question
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (
      questions.length > 0 &&
      currentQuestionIndex >= questions.length &&
      !showCongratulations
    ) {
      setShowCongratulations(true);
      setShowLeaderboard(true);
      setTimeUsed(60 - timeLeft);
      setTimeLeft(0); // stop the timer
    }
  }, [currentQuestionIndex, questions.length, showCongratulations]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setChoices([...choices, answer]);

    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }, 1000); // 1 second delay before moving to the next question
  };

  return isPregame ? (
    <Initial
      setIsPregame={setIsPregame}
      name={name}
      setName={setName}
      setTimeLeft={setTimeLeft}
    />
  ) : (
    <main className="m-auto h-screen flex justify-center items-center">
      {!showLeaderboard && !showCongratulations && (
        <section className="shadow-sm rounded-lg shadow-black w-[600px] h-[600px] m-auto p-12">
          <div className="text-2xl font-bold py-2 ">Time Left: {timeLeft}s</div>
          <h2 className="text-4xl font-bold py-4">
            {questions[currentQuestionIndex]?.question}
          </h2>
          <div className="h-12"></div>
          <ul className="flex flex-col gap-4">
            {questions[currentQuestionIndex]?.answers.map((answer) => {
              return (
                <li
                  key={answer}
                  onClick={() => handleAnswerClick(answer)}
                  className={`p-4 text-xl hover:shadow-lg bg-[#343434] rounded-lg hover:shadow-[#0c0c0c] transition-all ease-in-out cursor-pointer duration-200 ${
                    selectedAnswer === answer
                      ? isCorrect
                        ? "bg-green-500"
                        : "bg-red-500"
                      : ""
                  }`}
                >
                  {answer}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {showLeaderboard && (
        <Leaderboard
          exitLeaderboard={exitLeaderboard}
          score={score}
          name={name}
          time={timeUsed}
          choices={choices}
          leaderboardId={leaderboardId}
          setLeaderboardId={setLeaderboardId}
        />
      )}
      {showCongratulations && (
        <section className="shadow-sm rounded-lg shadow-black w-[600px] m-auto flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold py-4 px-2 max-md:text-xl pt-12">
            Congratulations {name}!
          </h2>
          <p className="text-2xl">You got {score}/7.</p>
          <div className="h-4"></div>
          <button
            className="border-[#d4d4d4] border-2 rounded-full p-4 m-4"
            onClick={() => setShowLeaderboard(true)}
          >
            View Leaderboard
          </button>

          <section>
            <ul className="flex flex-col gap-4 m-4">
              {questions.map((question, index) => (
                <li key={index} className="p-4 text-xl bg-[#343434] rounded-lg">
                  <div className="font-bold">Question {index + 1}:</div>
                  <div>{question.question}</div>
                  <ul className="mt-2 flex flex-col gap-3">
                    {question.answers.map((answer, answerIndex) => {
                      const usersChoseThisAnswer = users.filter(
                        (user) => user.choices[index] === answer
                      );
                      return (
                        <div
                          key={answerIndex}
                          className="flex text-sm justify-between bg-[#474747] p-2 rounded-md"
                        >
                          <li
                            key={answer}
                            className={` ${
                              answer === question.correctAnswer
                                ? "text-green-500"
                                : answer === choices[index]
                                ? "text-red-500"
                                : ""
                            }`}
                          >
                            {answer}
                            {answer === choices[index] && " (Your choice)"}
                          </li>
                          <div className="pl-4  text-[8px] flex">
                            {usersChoseThisAnswer
                              .slice(0, 2)
                              .map((user) => user.name)
                              .join(", ")}
                            {usersChoseThisAnswer.length > 2 &&
                              ` and ${usersChoseThisAnswer.length - 2} more`}
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
          <button
            className="border-[#d4d4d4] border-2 rounded-full p-4 m-4"
            onClick={() => setShowLeaderboard(true)}
          >
            View Leaderboard
          </button>
        </section>
      )}
    </main>
  );
}
