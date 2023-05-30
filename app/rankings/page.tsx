"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Rankings = () => {
  const [scores, setScores] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getScores = async () => {
      setLoading(true);
      try {
        const request = await axios.get("/api/scores");
        const scores = request.data;
        setScores(scores);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getScores();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-4 md:p-10">
      <table className="w-full table-auto border-collapse overflow-hidden rounded text-left text-sm md:w-[460px]">
        <thead className=" bg-sky-blue text-xs uppercase ">
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="w-24 px-6 py-3 text-right">
            Score
          </th>
        </thead>
        <tbody>
          {scores.map((score) => {
            return (
              <tr key={score.id} className="border-b bg-sky-blue-light">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {score.name}
                </th>
                <td className="px-6 py-4 text-right">{score.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;
