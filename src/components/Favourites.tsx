import { useFavouriteStore } from "../store/useFavouriteStore";
import { FaHeartBroken } from "react-icons/fa";

export const Favourites = () => {
  const favourites = useFavouriteStore((state) => state.favourites);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {favourites.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-gray-100 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <div className="mt-2 text-gray-600">
                <p>
                  <strong>Height:</strong> {item.height} cm
                </p>
                <p>
                  <strong>Mass:</strong> {item.mass} kg
                </p>
              </div>
              <FaHeartBroken
                onClick={() => {
                  removeFavourite(item.name);
                  localStorage.setItem("favourites", item.name);
                }}
                className="ml-auto text-2xl text-red-500 hover:text-red-700 cursor-pointer active:scale-95 transition-transform duration-150"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
