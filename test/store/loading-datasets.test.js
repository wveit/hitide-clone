import store from '../../state/store';
import { selectDatasets } from '../../state/datasetSearchSlice';

it('starts with 0 datasets', () => {
    const datasets = selectDatasets(store.getState());
    const array = Object.values(datasets);
    expect(array.length).toBe(0);
});
