import { useState } from "react";
import { router } from "expo-router";

import { ActivityIndicator, Pressable, ScrollView } from "react-native";
import {
  Column,
  RepoCard,
  Typography,
  ChangeUserModal,
} from "@/src/components";
import { Button } from "react-native-paper";

import { useRepositories } from "@/src/hooks";

import LogoWhite from "@/assets/images/wefit-logo-white.svg";

export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  const { loading, githubRepos, addFavorite, setSelectedRepo } =
    useRepositories();

  if (loading)
    return (
      <Column flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#FFD02C" />
      </Column>
    );

  return (
    <Column bg="#f6f6f5">
      {githubRepos.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flexGrow: 1 }}
        >
          <Column gap={16} p="16px">
            {githubRepos?.map((repo) => (
              <Pressable
                key={repo.fullName}
                onPress={() => {
                  setSelectedRepo(repo);
                  router.push({ pathname: "/details" });
                }}
              >
                <RepoCard handleFavorite={addFavorite} {...repo} />
              </Pressable>
            ))}
          </Column>
        </ScrollView>
      ) : (
        <Column
          gap={16}
          height={"100%"}
          justifyContent="center"
          alignItems="center"
          p={16}
        >
          <LogoWhite height={80} width={80} style={{ marginBottom: 16 }} />
          <Typography width="100%" fontSize={14} textAlign="justify">
            Parece que você não tem um usuário do Github informado. Clique
            abaixo e prencha o usuário que deseja buscar.
          </Typography>
          <Button
            loading={loading}
            style={{ borderRadius: 4, width: "100%" }}
            contentStyle={{ padding: 4 }}
            mode="contained"
            buttonColor="#1976D2"
            onPress={() => setOpen(true)}
          >
            Preencher usuário
          </Button>
        </Column>
      )}
      {open && <ChangeUserModal setOpen={setOpen} />}
    </Column>
  );
}
