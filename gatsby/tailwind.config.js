const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: {
        "100": "#E4E7E7",
        "200": "#D4DAD9",
        "300": "#ADB8B6",
        "400": "#91A19E",
        "500": "#768986",
        "600": "#5E6E6B",
        "700": "#475250",
        "800": "#2F3736",
        "900": "#181B1B"
      },
      primary: {
        "100": "#F8D9D3",
        "200": "#F1B2A7",
        "300": "#EA8C7B",
        "400": "#E4654E",
        "500": "#DD3F22",
        "600": "#A8301A",
        "700": "#772227",
        "800": "#5E1B1F",
        "900": "#280B0D"
      },
      secondary: {
        "100": "#E1EAE2",
        "200": "#C4D4C5",
        "300": "#A6BFA8",
        "400": "#88AA8B",
        "500": "#6A956E",
        "600": "#537456",
        "700": "#396043",
        "800": "#2B4933",
        "900": "#132016"
      },
      accent: {
        "100": "#F4EFD7",
        "200": "#ECE3B9",
        "300": "#DECF87",
        "400": "#D3BF5F",
        "500": "#C9AF36",
        "600": "#A08C2C",
        "700": "#786921",
        "800": "#504616",
        "900": "#28230B"
      }
    },
    fontFamily: {
      sans: [
        '"Bai Jamjuree"',
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    },
    extend: {}
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")]
};
