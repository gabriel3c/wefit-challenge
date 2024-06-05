import { useState } from "react";

import { Linking, View } from "react-native";
import { Column, Row, Typography, Button } from "@/src/components";

import { useRepositories, useNotification } from "@/src/hooks/";

import Link from "@/assets/images/link.svg";
import Star from "@/assets/images/star.svg";
import StarOutline from "@/assets/images/star-outlined.svg";

export default function RepoLayout() {
  const showNotification = useNotification();
  const [loadingFavoriting, setLoadingFavoriting] = useState(false);
  const { removeFavorite, addFavorite, selectedRepo } = useRepositories();

  const { fullName, description, language, favorite, html_url } = selectedRepo;

  const handlePress = async () => {
    setLoadingFavoriting(true);
    try {
      await (favorite
        ? removeFavorite(selectedRepo)
        : addFavorite(selectedRepo));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingFavoriting(false);
    } catch {}
  };

  const openExternalLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      showNotification({
        message: "Não foi possível abrir este link",
        options: { type: "danger" },
      });
    }
  };

  return (
    <Column borderWidth={1} flex={1}>
      <Column padding={16} gap={16} bg="white">
        <Row>
          <Typography fontSize="20px">{fullName.split("/")[0]}/</Typography>
          <Typography fontSize="20px" fontWeight={700}>
            {fullName.split("/")[1]}
          </Typography>
        </Row>
        <Row>
          <Typography color="#9a9a9a" fontSize="16px">
            {description || "(Repositório sem descrição)"}
          </Typography>
        </Row>
        {language ? (
          <Row gap={6} alignItems="center">
            <View
              style={{
                borderWidth: 6,
                borderColor: "#F22828",
                borderRadius: 12,
                height: 12,
              }}
            />
            <Typography>{language}</Typography>
          </Row>
        ) : (
          <Typography color="#9a9a9a">(Linguagem não informada)</Typography>
        )}
      </Column>
      <Column p={16} gap={10} bg="white" marginTop={"auto"}>
        <Button
          label="VER REPOSITÓRIO"
          font={{ fontSize: "15px", fontWeight: 500, color: "#1976D2" }}
          width="100%"
          justifyContent="center"
          rightIcon={<Link fill="#1976D2" width={16} height={16} />}
          onPress={() => openExternalLink(html_url)}
        />
        {favorite ? (
          <Button
            label="DESFAVORITAR"
            disabled={loadingFavoriting}
            borderColor="black"
            borderWidth={1}
            justifyContent="center"
            rightIcon={<StarOutline fill="black" width={19} height={19} />}
            width="100%"
            font={{ fontSize: "15px", fontWeight: 500, color: "black" }}
            onPress={handlePress}
          />
        ) : (
          <Button
            disabled={loadingFavoriting}
            variant="filled"
            label="FAVORITAR"
            backgroundColor="#FFD02C"
            justifyContent="center"
            rightIcon={<Star fill="black" width={19} height={19} />}
            width="100%"
            font={{ fontSize: "15px", fontWeight: 500, color: "black" }}
            onPress={handlePress}
          />
        )}
      </Column>
    </Column>
  );
}
