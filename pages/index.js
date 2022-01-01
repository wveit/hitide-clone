import { Provider } from "react-redux";
import { createStore } from "../state/store";
import { DatasetSearchService } from "../services/DatasetSearchService";
import { GranuleSearchService } from "../services/GranuleSearchService";
import App from "../components/App";
import Head from "next/head";

const datasetSearchService = new DatasetSearchService();
const granuleSearchService = new GranuleSearchService();
const store = createStore({ datasetSearchService, granuleSearchService });

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>Hitide</title>
      </Head>
      <App />
    </Provider>
  );
}
