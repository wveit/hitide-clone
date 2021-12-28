import axios from 'axios';
import { DateNumber } from '../utils/DateNumber';

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
                startDate: rawDataset.time_start && DateNumber.fromIso(rawDataset.time_start),
                endDate: rawDataset.time_end && DateNumber.fromIso(rawDataset.time_end),
                longName: rawDataset.title,
                description: rawDataset.summary,
                imageUrl: 'https://podaac.jpl.nasa.gov/Podaac/thumbnails/' + rawDataset.short_name + '.jpg',
            };
            datasets[dataset.id] = dataset;
        });
        return datasets;
    }
}
