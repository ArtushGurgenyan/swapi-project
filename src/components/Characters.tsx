import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { useFavouriteStore } from "../store/useFavouriteStore";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
}

interface ApiResponse {
  next: string | null;
  results: Character[];
}

const fetchData = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<ApiResponse> => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${pageParam}`);
  return res.json();
};

export const Characters = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const favourites = useFavouriteStore((state) => state.favourites);
  const addFavourite = useFavouriteStore((state) => state.addFavourite);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);

  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ApiResponse>({
      queryKey: ["people"],
      queryFn: fetchData,
      getNextPageParam: (lastPage) => {
        return lastPage.next
          ? new URL(lastPage.next).searchParams.get("page")
          : null;
      },
    });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const isCharacterFavourite = useCallback(
    (name: string) => {
      return favourites.some((character) => character.name === name);
    },
    [favourites]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>Something went wrong: {error.message}</div>;

  const filteredCharacters = data?.pages.flatMap((page) =>
    page.results.filter((character: Character) =>
      character.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  );

  return (
    <>
      <div className="relative w-full max-w-md mx-auto mb-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 right-3 h-5 w-5 text-gray-400 transform -translate-y-1/2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredCharacters?.map((character) => (
          <div
            key={character.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-gray-100 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {character.name}
            </h3>
            <div className="mt-2 text-gray-600">
              <p>
                <strong>Height:</strong> {character.height} cm
              </p>
              <p>
                <strong>Mass:</strong> {character.mass} kg
              </p>
            </div>
            {isCharacterFavourite(character.name) ? (
              <FaHeartBroken
                onClick={() => {
                  removeFavourite(character.name);
                }}
                className="ml-auto text-2xl text-red-500 hover:text-red-700 cursor-pointer active:scale-95 transition-transform duration-150"
              />
            ) : (
              <FaHeart
                onClick={() => {
                  addFavourite(character);
                }}
                className="ml-auto text-2xl text-red-500 hover:text-red-700 cursor-pointer active:scale-95 transition-transform duration-150"
              />
            )}
          </div>
        ))}

        {hasNextPage && (
          <div className="w-full text-center col-span-full">
            <button
              onClick={() => fetchNextPage()}
              className="h-full w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition-transform duration-150"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};
