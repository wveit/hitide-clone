export async function fetchGranules({ datasetId, bbox, startDate, endDate }) {
    const [west, south, east, north] = bbox || [];
    let url = `https://podaac-tools.jpl.nasa.gov/l2ss-services/l2ss/granule/search`;
    url += `?datasetId=${datasetId}`;
    if (startDate) url += `&startTime=${startDate}`;
    if (endDate) url += `&endTime=${endDate}`;
    if (bbox) url += `&bbox=${west},${south},${east},${north}`;
    url += `&itemsPerPage=25`;
    url += `&startIndex=0`;
    url += `&sort=Granule-StartTime%20desc`;

    const rawResponse = await fetch(url).then((res) => res.json());
    return rawResponse;
}

export function extractGranules(rawResponse) {
    const count = rawResponse.response.numFound;
    const docs = rawResponse.response.docs;
    const granules = {};

    docs.forEach((g) => {
        const granule = {};

        granule.id = g['Granule-Id'];
        granule.name = g['Granule-Name'];
        granule.datasetId = g['Granule-DatasetId'];
        granule.footprint = g['Granule-Footprint'];
        granule.extent = g['Granule-Extent'];
        granule.imageRootUrl = g['Granule-Image-Root-URL'];
        granule.startDate = g['Granule-StartTime'];
        granule.endDate = g['Granule-StopTime'];

        granules[granule.id] = granule;
    });

    return { granules, count };
}
