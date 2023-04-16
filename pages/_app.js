import Parse from "parse/dist/parse.min.js";
import "@/styles/globals.css";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

export const theme = extendTheme({});

const PARSE_HOST_URL = "https://parseapi.back4app.com/";
Parse.initialize("YOUR_APPLICATION_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = PARSE_HOST_URL;

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
