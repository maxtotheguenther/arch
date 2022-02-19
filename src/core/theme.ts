import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "3rem",
      fontWeight: "normal",
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: "lighter",
    },
    h4: {
      fontSize: "2rem",
      fontWeight: "lighter",
    },
  },
  palette: {
    mode: "light",
  },
});

export default theme;
