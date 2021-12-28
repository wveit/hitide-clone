import { createStore } from '../../state/store';
import { doSetStartDate, doSetEndDate, doSetBbox, selectDatasetArray } from '../../state/datasetSearchSlice';
import { doFetchDatasets } from '../../state/datasetActions';
import { DummyDatasetSearchService } from './DummyDatasetSearchService';
import { DateNumber } from '../../utils/DateNumber';

it('starts with 0 datasets', async () => {
    const store = createStore();
    const datasetArray = selectDatasetArray(store.getState());

    await tryOnStore(store, () => {
        expect(datasetArray.length).toBe(0);
    });
});

it('has datasets after fetching', async () => {
    const datasetSearchService = new DummyDatasetSearchService([{ id: 'dataset-0' }, { id: 'dataset-1' }]);
    const store = createStore({ datasetSearchService });
    store.dispatch(doFetchDatasets());

    await tryOnStore(store, () => {
        const datasetArray = selectDatasetArray(store.getState());
        expect(datasetArray.length).toBe(2);
    });
});

it('sends uses correct filters', async () => {
    const datasetSearchService = new DummyDatasetSearchService([
        { id: 'dataset-0', startDate: DateNumber.fromIso('2021-01-01') },
        { id: 'dataset-1' },
        { id: 'dataset-2', endDate: DateNumber.fromIso('2000-01-01') },
        { id: 'dataset-3', bbox: [-50, -80, -10, -10] },
        {
            id: 'dataset-4',
            startDate: DateNumber.fromIso('2015-01-01'),
            endDate: DateNumber.fromIso('2016-01-01'),
            bbox: [30, 30, 50, 50],
        },
    ]);
    const store = createStore({ datasetSearchService });

    store.dispatch(doSetStartDate(DateNumber.fromIso('2010-01-01')));
    store.dispatch(doSetEndDate(DateNumber.fromIso('2020-01-01')));
    store.dispatch(doSetBbox([10, 10, 180, 90]));
    store.dispatch(doFetchDatasets());

    await tryOnStore(store, () => {
        const datasetArray = selectDatasetArray(store.getState());
        expect(datasetArray.length).toBe(2);
    });
});

//
//          HELPER FUNCTIONS
//

function tryOnStore(store, fn, timeoutMillis = 500) {
    return new Promise((resolve, reject) => {
        let error = null;
        const timer = setTimeout(() => {
            // console.error(error);
            reject(['tryOnStore() timeout exceeded', error]);
        }, timeoutMillis);
        try {
            fn();
            clearTimeout(timer);
            resolve();
            return;
        } catch (e) {
            error = e;
        }
        store.subscribe(() => {
            try {
                fn();
                clearTimeout(timer);
                resolve();
            } catch (e) {
                error = e;
            }
        });
    });
}
