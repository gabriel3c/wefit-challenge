import { styleFn, variant } from "styled-system";

export const variantsButton: styleFn = ({
  theme: { colors },
  color = "primary",
}) => {
  return variant({
    prop: "variant",
    variants: {
      filled: {
        color: colors?.[color]?.main || color,
        bg: colors?.[color]?.light || `${color}40`,
      },
      outlined: {
        color: colors?.[color]?.main || color,
        bg: colors.white,
        borderWidth: "1px",
        borderColor: colors?.[color]?.main || color,
      },
    },
  });
};
