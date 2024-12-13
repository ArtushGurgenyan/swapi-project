import { Characters } from "./components/Characters";
import { Routes, Route } from "react-router-dom";
import { Favourites } from "./components/Favourites";
import { Dashboard } from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./structure/Login";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Dashboard />}>
          <Route path="characters" element={<Characters />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
