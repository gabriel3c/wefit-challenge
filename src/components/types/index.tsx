import {
  LayoutProps,
  SpaceProps,
  PositionProps,
  FlexboxProps,
  ColorProps,
  BorderProps,
  ShadowProps,
  TypographyProps,
  FontSizeProps,
} from "styled-system";

export interface BaseProps
  extends PositionProps,
    LayoutProps,
    SpaceProps,
    FlexboxProps,
    ColorProps,
    BorderProps,
    ShadowProps,
    PositionProps,
    TypographyProps,
    FontSizeProps {
  gap?: number;
  style?: object;
  variant?: string;
}

export type TView = BaseProps & {
  children: React.ReactNode;
};
