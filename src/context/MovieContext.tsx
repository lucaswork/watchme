import { createContext, useState, useEffect, useCallback } from "react";
import {
  GenreResponseProps,
  MovieContextData,
  MovieProps,
  MovieProviderProps,
} from "../@types";
import { api } from "../services/api";

export const MovieContext = createContext<MovieContextData>(
  {} as MovieContextData
);

export function MovieProvider({ children }: MovieProviderProps): JSX.Element {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    async function loadMovies() {
      api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
    }
    async function loadGenres() {
      api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
    }
    
    loadMovies()
    loadGenres()
  }, [selectedGenreId]);


  const handleClickButton = useCallback((id: number)  => {
    setSelectedGenreId(id);
  },[])

  return (
    <MovieContext.Provider
      value={{
        selectedGenreId,
        genres,
        movies,
        selectedGenre,
        handleClickButton,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
