export async function fetchDatasets({ bbox, startDate, endDate }) {
    const [west, south, east, north] = bbox;

    let url = `https://podaac-tools.jpl.nasa.gov/l2ss-services/l2ss/dataset/search?itemsPerPage=200`;
    if (startDate) url += `&startTime=${new Date(startDate).toISOString()}`;
    if (endDate) url += `&endTime=${new Date(endDate).toISOString()}`;
    if (bbox) url += `&bbox=${west},${south},${east},${north}`;

    const rawResponse = await fetch(url).then((res) => res.json());
    return rawResponse;
}

export function extractDatasets(rawResponse) {
    const docs = rawResponse.response.docs;
    const datasets = {};

    docs.forEach((doc) => {
        const ds = {};
        ds.source = 'l2ss';
        ds.id = doc['Dataset-PersistentId'];
        ds.shortName = doc['Dataset-ShortName'];
        ds.longName = doc['Dataset-LongName'];
        ds.description = doc['Dataset-Description'];
        ds.imageUrl = doc['Dataset-ImageUrl'];
        ds.startDate = doc['DatasetCoverage-StartTimeLong'];
        if (ds.startDate) ds.startDate = new Date(Number(ds.startDate)).getTime();
        else delete ds.startDate;
        ds.endDate = doc['DatasetCoverage-StopTimeLong'];
        if (ds.endDate) ds.endDate = new Date(Number(ds.endDate)).getTime();
        else delete ds.endDate;
        datasets[ds.id] = ds;
    });

    return datasets;
}
