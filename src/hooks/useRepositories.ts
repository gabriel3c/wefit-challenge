import { useContext } from "react";

import { RepositoriesContext } from "@/src/contexts/repositories/RepositoriesContext";

export default function useRepositories() {
  const context = useContext(RepositoriesContext);

  return context;
}
