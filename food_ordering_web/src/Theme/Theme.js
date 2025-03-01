import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e91e63", // Pink color for light theme
    },
    secondary: {
      main: "#5A20CB", // Purple color for light theme
    },
    background: {
      default: "#ffffff", // Light background
      paper: "#f5f5f5", // Card or paper elements
    },
    text: {
      primary: "#000000", // Dark text for light background
      secondary: "#555555", // Muted text color
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e91e63", // Pink color for dark theme
    },
    secondary: {
      main: "#5A20CB", // Purple color for dark theme
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Card or paper elements
    },
    text: {
      primary: "#ffffff", // Light text for dark background
      secondary: "#b0bec5", // Muted text color
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});
