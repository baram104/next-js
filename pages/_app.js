import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { store } from "../store/index";
import { Provider } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: "Arima Madurai",
    fontSize: 22,
  },
  palette: {
    primary: {
      main: "#020122",
    },
    secondary: {
      main: "#eaeaea",
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
