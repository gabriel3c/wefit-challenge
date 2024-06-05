import { RepoProps } from "@/src/components/RepoCard";
import { REPOS_STORAGE } from "./configStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageGetRepos(): Promise<RepoProps[]> {
  const repos = await AsyncStorage.getItem(REPOS_STORAGE);
  if (!repos) return [];
  return JSON.parse(repos);
}

export async function storageSaveRepo(repo: RepoProps) {
  const repos = await storageGetRepos();

  await AsyncStorage.setItem(REPOS_STORAGE, JSON.stringify([...repos, repo]));
}

export async function storageRemoveRepo({ id }: { id: number }) {
  const repos = await storageGetRepos();
  const filteredRepos = repos.filter((item) => item.id !== id);
  await AsyncStorage.setItem(REPOS_STORAGE, JSON.stringify(filteredRepos));
}
