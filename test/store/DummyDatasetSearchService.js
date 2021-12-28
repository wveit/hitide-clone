function bboxesOverlap(bbox1, bbox2) {
    if (bbox1[0] > bbox2[2] || bbox1[2] < bbox2[0] || bbox1[1] > bbox2[3] || bbox1[3] < bbox2[1]) return false;
    return true;
}

function arrayToObject(array, idProperty = 'id') {
    const object = {};
    array.forEach((item) => {
        const itemId = item[idProperty];
        object[itemId] = item;
    });
    return object;
}

export class DummyDatasetSearchService {
    constructor(baseDatasets = {}) {
        if (Array.isArray(baseDatasets)) this.baseDatasets = baseDatasets;
        else this.baseDatasets = Object.values(baseDatasets);
    }
    async fetchDatasets({ startDate, endDate, bbox } = {}) {
        const datasetArray = this.baseDatasets.filter((baseDataset) => {
            if (baseDataset.startDate && baseDataset.startDate > endDate) return false;
            if (baseDataset.endDate && baseDataset.endDate < startDate) return false;
            if (baseDataset.bbox && !bboxesOverlap(baseDataset.bbox, bbox)) return false;
            return true;
        });
        return arrayToObject(datasetArray);
    }
}
