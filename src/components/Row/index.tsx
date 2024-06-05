import React from "react";
import { View } from "react-native";

import styled from "styled-components/native";
import {
  space,
  layout,
  color,
  flexbox,
  compose,
  border,
  shadow,
} from "styled-system";

import { TView } from "../types";

const style = compose(space, layout, color, flexbox, border, shadow);

const Base = styled(View)<TView>`
  display: flex;
  flex-direction: row;

  ${style};
`;

const Row: React.FC<TView> = ({ children, ...rest }) => (
  <Base {...rest}>{children}</Base>
);

export default Row;
