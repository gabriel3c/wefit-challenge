import React from "react";
import { Text as RNText } from "react-native";

import styled from "styled-components/native";
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

import { TView } from "../types";

const style = compose(
  space,
  layout,
  color,
  flexbox,
  border,
  shadow,
  typography
);

const Base = styled(RNText)<TView>`
  ${style};
`;

const Typography: React.FC<TView> = ({ children, ...rest }) => (
  <Base {...rest}>{children}</Base>
);

export default Typography;
