 const colors = {   };

const radius = {  };

const spacing = {  };

const typography = {   };

const layout = {
  headerHeight: "64px",
  footerHeight: "64px",
};

const buttons = {
  height: {
    sm: "40px",
    md: "48px",
    lg: "56px",
  },

  radius: radius.lg,

  primary: {
    background: colors.primary,
    hover: colors.primaryHover,
    text: colors.white,
  },

  secondary: {
    background: colors.white,
    border: colors.border,
    text: colors.text,
  },

  ghost: {
    background: "transparent",
    text: colors.primary,
  },

  success: {
    background: colors.success,
    text: colors.white,
  },

  danger: {
    background: colors.danger,
    text: colors.white,
  },

  disabled: {
    background: colors.border,
    text: colors.textMuted,
  },
};

const inputs = {
  height: "56px",

  radius: radius.lg,

  paddingX: spacing.md,

  border: colors.borderStrong,

  borderFocus: colors.primary,

  borderError: colors.danger,

  borderSuccess: colors.success,

  background: colors.white,

  text: colors.text,

  placeholder: colors.textMuted,

  disabledBackground: colors.surface,

  disabledText: colors.textMuted,
};

const cards = {
  radius: radius.lg,

  padding: spacing.md,

  border: colors.border,

  background: colors.white,

  sectionGap: radius.md,

  hoverBorder: colors.borderStrong,

  shadow: "none",
};

export const theme = {
  colors,
  radius,
  spacing,
  typography,
  buttons,
  inputs,
  cards,
   layout,
};