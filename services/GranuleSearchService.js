import axios from 'axios';
import { DateNumber } from '../utils/DateNumber';

export class GranuleSearchService {
    async fetchGranules({datasetId}) {
        const url = 'https://cmr.earthdata.nasa.gov/search/granules.umm_json?collection_concept_id=' + datasetId;
        const response = await axios({ url });

        const count = response.data.hits;
        
        const rawGranules = response.data.items;
        const granules = {};
        rawGranules.forEach((rawGranule) => {
            const granule = cmrUmmJsonGranuleToHitideGranule(rawGranule);
            granules[granule.id] = granule;
        });

        return {granules, count};
    }
}

function cmrUmmJsonGranuleToHitideGranule(rawGranule, datasetId) {
    const timeRange = rawGranule['umm']['TemporalExtent']['RangeDateTime'];

    const granule = {
        datasetId,
        id: rawGranule['meta']['concept-id'],
        name: rawGranule['meta']['native-id'],
        footprint: null, // ..
        extent: null,
        imageRootUrl: null, 
        startDate: DateNumber.fromIso(timeRange['BeginningDateTime']),
        endDate: DateNumber.fromIso(timeRange['EndingDateTime'])
    };

    return granule;
}