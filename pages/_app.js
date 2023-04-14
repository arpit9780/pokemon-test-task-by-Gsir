import { client } from "@/GqlClient/Client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.css";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
