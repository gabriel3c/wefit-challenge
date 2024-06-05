import { Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

import { Column, RepoCard, Row, Typography } from "@/src/components";

import { useRepositories } from "@/src/hooks";

export default function TabTwoScreen() {
  const { favoriteRepos, removeFavorite, setSelectedRepo } = useRepositories();

  return (
    <Column bg="#f6f6f5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flexGrow: 1 }}
      >
        <Column gap={16} p="16px">
          {favoriteRepos.length ? (
            favoriteRepos.map((repo) => (
              <Pressable
                key={repo.fullName}
                onPress={() => {
                  setSelectedRepo(repo);
                  router.push({
                    pathname: "/details",
                    params: { id: repo.id },
                  });
                }}
              >
                <RepoCard favorite handleFavorite={removeFavorite} {...repo} />
              </Pressable>
            ))
          ) : (
            <Row>
              <Typography>Não há repositórios favoritos</Typography>
            </Row>
          )}
        </Column>
      </ScrollView>
    </Column>
  );
}
