import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { MovieContextData } from "../@types";

export function useMovie(): MovieContextData {
  const context = useContext(MovieContext);

  return context;
}