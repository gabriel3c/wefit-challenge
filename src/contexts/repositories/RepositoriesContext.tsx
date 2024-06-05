import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { RepoProps } from "@/src/components/RepoCard";

import useToastLoader from "@/src/hooks/useToastLoader";
import useNotification from "@/src/hooks/useNotification";

import { getReposList } from "@/src/services/repo";
import { IGithubRepo } from "@/src/services/repoTypes";

import {
  storageGetRepos,
  storageRemoveRepo,
  storageSaveRepo,
} from "@/src/storage/storageRepo";
import { storageGetUser, storageSaveUser } from "@/src/storage/storageUser";
import { router } from "expo-router";

type ProviderProps = {
  children: React.ReactNode;
};

type RequestProps = {
  username?: string;
  notification?: boolean;
};

export type RepositoriesContextProps = {
  loading: boolean;
  githubRepos: RepoProps[];
  favoriteRepos: RepoProps[];
  addFavorite: (repo: RepoProps) => Promise<void>;
  removeFavorite: ({ id }: { id: number }) => Promise<void>;
  selectedRepo: RepoProps;
  setSelectedRepo: Dispatch<SetStateAction<RepoProps>>;
  githubUser: string;
  handleGithubRepos: ({ username }: RequestProps) => Promise<void>;
};

const RepositoriesContext = createContext<RepositoriesContextProps>(
  {} as RepositoriesContextProps
);

const RepositoriesProvider = ({ children }: ProviderProps) => {
  const showNotification = useNotification();
  const toastLoaded = useToastLoader();
  const [githubUser, setGithubUser] = useState<string>("appswefit");
  const [githubRepos, setGithubRepos] = useState<RepoProps[]>([]);
  const [favoriteRepos, setFavoriteRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRepo, setSelectedRepo] = useState<RepoProps>({} as RepoProps);

  const handleGithubRepos = async ({
    username = githubUser,
    notification = true,
  }: RequestProps) => {
    try {
      const { data } = await getReposList({ username });
      setGithubUser(username);

      const favoritedRepos = await storageGetRepos();

      const filteredRepos = data.filter(
        (item: IGithubRepo) =>
          !favoritedRepos.find((repo) => repo.id === item.id)
      );

      const repos = filteredRepos.map((item: IGithubRepo) => ({
        id: item.id,
        fullName: item.full_name,
        description: item.description,
        avatar_url: item.owner.avatar_url,
        stargazers_count: item.stargazers_count,
        language: item.language,
        html_url: item.html_url,
      }));
      await storageSaveUser({ username });
      setGithubRepos(repos);
      notification &&
        showNotification({ message: "Repositórios buscados com sucesso!" });
    } catch (error) {
      notification &&
        showNotification({
          message: "Houve um erro, verifique o nome do usuário",
          options: { type: "danger" },
        });
    }
  };

  const handleFavoriteRepos = async () => {
    try {
      const repos = await storageGetRepos();
      setFavoriteRepos(repos);
    } catch (error) {}
  };

  const addFavorite = async (repo: RepoProps) => {
    try {
      const saveRepo = { ...repo, favorite: true };
      await storageSaveRepo(saveRepo);
      setGithubRepos((prev) => prev?.filter((item) => item.id !== repo.id));

      setFavoriteRepos((prev) => [...prev, saveRepo]);
      setSelectedRepo((prev) => ({ ...prev, favorite: true }));

      showNotification({ message: "Repositório favoritado." });
      router.back();
    } catch (error) {
      showNotification({
        message: "Houve um erro ao favoritar, tente novamente.",
        options: { type: "danger" },
      });
    }
  };

  const removeFavorite = async ({ id }: { id: number }) => {
    try {
      await storageRemoveRepo({ id });
      setFavoriteRepos((prev) => prev?.filter((item) => item.id !== id));
      setSelectedRepo((prev) => ({ ...prev, favorite: false }));

      githubUser &&
        (await handleGithubRepos({
          username: githubUser,
          notification: false,
        }));
      showNotification({ message: "Repositório desfavoritado." });
      router.back();
    } catch (error) {
      showNotification({
        message: "Houve um erro ao desfavoritar, tente novamente.",
        options: { type: "danger" },
      });
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const storageUser = await storageGetUser();
      const username = storageUser || githubUser;
      username && setGithubUser(username);
      await Promise.all([
        username && handleGithubRepos({ username }),
        handleFavoriteRepos(),
      ]);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    toastLoaded && loadData();
  }, [toastLoaded]);

  return (
    <RepositoriesContext.Provider
      value={{
        loading,
        githubRepos,
        favoriteRepos,
        addFavorite,
        removeFavorite,
        selectedRepo,
        setSelectedRepo,
        githubUser,
        handleGithubRepos,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
};

export { RepositoriesContext, RepositoriesProvider };
