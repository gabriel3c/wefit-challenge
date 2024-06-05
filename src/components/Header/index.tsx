import React, { useState } from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import Row from "../Row";
import Typography from "../Typography";
import ChangeUserModal from "../ChangeUserModal";
import { Pressable } from "react-native";

import { BaseProps } from "../types";

import Gear from "@/assets/images/gear.svg";
import Arrow from "@/assets/images/arrow.svg";

type StackTypes = BottomTabHeaderProps | NativeStackHeaderProps;

type HeaderProps = StackTypes &
  BaseProps & {
    title: string;
    goBack?: boolean;
    menu?: boolean;
  };

const Header = ({
  title,
  goBack,
  menu,
  ...props
}: HeaderProps): React.ReactNode => {
  const [open, setOpen] = useState(false);

  return (
    <Row
      justifyContent="space-between"
      alignItems="center"
      p="16px"
      bg="white"
      gap={16}
      minHeight={32}
      {...props}
    >
      <Row gap={4}>
        {goBack && (
          <Pressable
            onPress={() => props.navigation.goBack()}
            style={{
              padding: 8,
              paddingHorizontal: 12,
            }}
          >
            <Arrow />
          </Pressable>
        )}
        <Typography fontSize="20px" fontWeight={500} {...props}>
          {title}
        </Typography>
      </Row>

      {menu && (
        <Pressable
          style={{ paddingVertical: 4, paddingHorizontal: 6 }}
          onPress={() => setOpen(true)}
        >
          <Gear />
        </Pressable>
      )}
      {open && <ChangeUserModal setOpen={setOpen} />}
    </Row>
  );
};

export default Header;
