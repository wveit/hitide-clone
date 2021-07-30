import { Provider } from 'react-redux';
import store from '../state/store';
import App from '../components/App';
import Head from 'next/head';

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
