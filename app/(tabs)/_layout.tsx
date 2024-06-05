import { Tabs } from "expo-router";

import Header from "@/src/components/Header";

import GithubLogo from "@/assets/images/github-logo.svg";
import Star from "@/assets/images/star.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: (props) => <Header title="WeFit" menu {...props} />,
        tabBarIconStyle: { marginTop: 6 },
        tabBarLabelStyle: { padding: 6 },
        tabBarStyle: { height: 56 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Repositórios",
          tabBarIcon: ({ color }) => <GithubLogo fill={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <Star fill={color} />,
        }}
      />
    </Tabs>
  );
}
