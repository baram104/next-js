import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { store } from "../store/index";
import { Provider } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
  },
  palette: {
    primary: {
      main: "#161853",
    },

    secondary: {
      main: "#EC255A",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
