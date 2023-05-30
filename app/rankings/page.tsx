"use client";

import Spinner from "../components/Spinner";
import useRankings from "./useRankings";

const Rankings = () => {
  const { scores, loading } = useRankings();
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
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="w-24 px-6 py-3 text-right">
              Score
            </th>
          </tr>
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
