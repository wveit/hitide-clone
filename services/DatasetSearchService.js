import axios from 'axios';

export class DatasetSearchService {
    async fetchDatasets() {
        const url = 'https://cmr.earthdata.nasa.gov/search/collections.json?tool_name=hitide';
        const response = await axios({ url });
        const rawDatasets = response.data.feed.entry;

        const datasets = {};
        rawDatasets.forEach((rawDataset) => {
            const dataset = {
                id: rawDataset.id,
                shortName: rawDataset.short_name,
            };
            datasets[dataset.id] = dataset;
        });
        return datasets;
    }
}
