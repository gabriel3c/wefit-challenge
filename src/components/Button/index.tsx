import React, { ReactNode } from "react";
import styled from "styled-components/native";

import { TouchableHighlight } from "react-native";
import Typography from "../Typography";

import { variantsButton } from "./variants";
import { BaseProps, TView } from "../types";

import {
  space,
  layout,
  color,
  flexbox,
  compose,
  border,
  shadow,
  typography,
} from "styled-system";
import Row from "../Row";

const style = compose(
  space,
  layout,
  color,
  flexbox,
  border,
  shadow,
  typography
);

const Base = styled(TouchableHighlight)<TView>`
  display: flex;
  flex-direction: row;
  padding: 10px 12px;
  border-radius: 4px;

  ${variantsButton};
  ${style};
`;

type ButtonProps = BaseProps & {
  label: string;
  color?: string;
  onPress: () => void;
  variant?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fontSize?: string;
  fontWeight?: number;
  font?: object;
};

const Button = ({
  leftIcon,
  rightIcon,
  label,
  variant,
  onPress,
  font,
  ...props
}: ButtonProps) => {
  return (
    <Base
      variant={variant}
      onPress={onPress}
      underlayColor={variant ? "white" : "#e1e1e1"}
      {...props}
    >
      <Row alignItems="center" gap={10}>
        {leftIcon}
        <Typography
          color={props.color}
          fontSize={props.fontSize || "12px"}
          fontWeight={props.fontWeight}
          {...font}
        >
          {label}
        </Typography>
        {rightIcon}
      </Row>
    </Base>
  );
};

export default Button;
