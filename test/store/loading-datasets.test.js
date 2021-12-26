import { createStore } from '../../state/store';
import { selectDatasetArray } from '../../state/datasetSearchSlice';
import { doFetchDatasets } from '../../state/datasetActions';
import { DatasetSearchService } from '../../services/DatasetSearchService';

it('starts with 0 datasets', async () => {
    const store = createStore();
    const datasetArray = selectDatasetArray(store.getState());

    await tryOnStore(store, () => {
        expect(datasetArray.length).toBe(0);
    });
});

it('has datasets after fetching', async () => {
    const datasetSearchService = {
        fetchDatasets() {
            return {
                id0: { id: 'id0' },
                id1: { id: 'id1' },
            };
        },
    };
    const store = createStore({ datasetSearchService });
    store.dispatch(doFetchDatasets());

    await tryOnStore(store, () => {
        const datasetArray = selectDatasetArray(store.getState());
        expect(datasetArray.length).toBe(2);
    });
});

it('has datasets after fetching from real api', async () => {
    const datasetSearchService = new DatasetSearchService();
    const store = createStore({ datasetSearchService });
    store.dispatch(doFetchDatasets());
    await tryOnStore(store, () => {
        const datasetArray = selectDatasetArray(store.getState());
        expect(datasetArray.length).toBeGreaterThan(0);
    });
});

it('datasets have id', async () => {
    const datasetSearchService = new DatasetSearchService();
    const store = createStore({ datasetSearchService });
    store.dispatch(doFetchDatasets());
    await tryOnStore(store, () => {
        const datasetArray = selectDatasetArray(store.getState());
        expect(datasetArray.length).toBeGreaterThan(0);
        datasetArray.forEach((dataset) => expect(typeof dataset.id).toBe('string'));
    });
});

function wait(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}

function tryOnStore(store, fn, timeoutMillis = 500) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject('tryOnStore() timeout exceeded'), timeoutMillis);
        try {
            fn();
            clearTimeout(timer);
            resolve();
            return;
        } catch {}
        store.subscribe(() => {
            try {
                fn();
                clearTimeout(timer);
                resolve();
            } catch {}
        });
    });
}
