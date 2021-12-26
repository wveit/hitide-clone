import { Provider } from 'react-redux';
import { createStore } from '../state/store';
import { DatasetSearchService } from '../services/DatasetSearchService';
import App from '../components/App';
import Head from 'next/head';

const datasetSearchService = new DatasetSearchService();
const store = createStore({ datasetSearchService });

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
