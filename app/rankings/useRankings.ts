"use client";

import { Ranking } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useRankings = () => {
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

  return {
    scores,
    loading,
  };
};

export default useRankings;
