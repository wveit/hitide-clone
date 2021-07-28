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
