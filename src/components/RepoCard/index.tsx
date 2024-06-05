import { Image, View } from "react-native";

import Button from "../Button";
import Column from "../Column";
import Row from "../Row";
import Typography from "../Typography";

import Star from "@/assets/images/star.svg";

export type RepoProps = {
  id: number;
  fullName: string;
  description: string;
  avatar_url: string;
  stargazers_count: string;
  language: string;
  html_url: string;
  favorite?: boolean;
};

type RepoCardProps = RepoProps & {
  handleFavorite: (repo: RepoProps) => void;
};

const RepoCard = (props: RepoCardProps) => {
  const {
    fullName,
    description,
    stargazers_count,
    language,
    handleFavorite,
    favorite,
    avatar_url,
  } = props;

  return (
    <Column
      key={fullName}
      px="16px"
      py="12px"
      bg="white"
      gap={16}
      borderRadius={4}
      style={{ elevation: 10 }}
    >
      <Row
        borderBottomColor="#DADADA"
        borderBottomWidth={1}
        paddingBottom="16px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Row>
          <Typography>{fullName.split("/")[0]}/</Typography>
          <Typography fontWeight={700}>{fullName.split("/")[1]}</Typography>
        </Row>
        <Row>
          <Image
            style={{ width: 30, height: 30, borderRadius: 30 }}
            src={avatar_url}
          />
        </Row>
      </Row>
      <Typography color="#9a9a9a" fontSize="12px">
        {description || "(Repositório sem descrição)"}
      </Typography>
      <Row alignItems="center" justifyContent="space-between">
        {!favorite && (
          <Button
            label="Favoritar"
            leftIcon={<Star fill="#FFD02C" width={16} height={16} />}
            onPress={() => handleFavorite(props)}
            variant="filled"
            font={{ fontWeight: 700, color: "#FFD02C" }}
          />
        )}
        <Row alignItems="center" gap={6}>
          <Star fill="#FFD02C" width={16} height={16} />
          <Typography color="#9A9A9A">{stargazers_count}</Typography>
        </Row>
        <Row
          gap={6}
          alignItems="center"
          minWidth={80}
          justifyContent="flex-end"
        >
          {language && (
            <>
              <View
                style={{
                  borderWidth: 5,
                  borderColor: "#F22828",
                  borderRadius: 8,
                  height: 8,
                }}
              />
              <Typography>{language}</Typography>
            </>
          )}
        </Row>
      </Row>
    </Column>
  );
};

export default RepoCard;
