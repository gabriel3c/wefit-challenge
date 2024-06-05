import githubClient from "@/src/providers/githubClient";

type RepoListProps = {
  username: string;
};

export const getReposList = ({ username }: RepoListProps) =>
  githubClient.get(`users/${username}/repos`);
