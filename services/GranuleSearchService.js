import axios from "axios";
import { DateNumber } from "../utils/DateNumber";

export class GranuleSearchService {
    async fetchGranules({ datasetId }) {
        const url =
            "https://cmr.earthdata.nasa.gov/search/granules.umm_json?sort_key=-start_date&collection_concept_id=" +
            datasetId;
        const response = await axios({ url });

        const count = response.data.hits;

        const rawGranules = response.data.items;
        const granules = {};
        rawGranules.forEach((rawGranule) => {
            const granule = cmrUmmJsonGranuleToHitideGranule(
                rawGranule,
                datasetId
            );
            granules[granule.id] = granule;
        });

        return { granules, count };
    }
}

function cmrUmmJsonGranuleToHitideGranule(rawGranule, datasetId) {
    const timeRange = rawGranule["umm"]["TemporalExtent"]["RangeDateTime"];

    const granule = {
        datasetId,
        id: rawGranule["meta"]["concept-id"],
        name: rawGranule["meta"]["native-id"],
        footprint: extractFootprint(rawGranule),
        extent: extractExtent(rawGranule),
        imageRootUrl: null,
        imageUrlObject: extractImageUrlObject(rawGranule),
        startDate: DateNumber.fromIso(timeRange["BeginningDateTime"]),
        endDate: DateNumber.fromIso(timeRange["EndingDateTime"]),
    };

    return granule;
}

export function extractImageUrlObject(rawGranule) {
    try {
        const urls = rawGranule["umm"]["RelatedUrls"];
        const imageUrlObject = {};
        urls.forEach((url) => {
            if (url.Type !== "GET RELATED VISUALIZATION") return;
            const strings = url.URL.split(".");
            const variableName = strings[strings.length - 2];
            imageUrlObject[variableName] = url.URL;
        });

        return imageUrlObject;
    } catch {
        return null;
    }
}

export function extractExtent(rawGranule) {
    try {
        const boxes =
            rawGranule["umm"]["SpatialExtent"]["HorizontalSpatialDomain"][
                "Geometry"
            ]["BoundingRectangles"];

        let west = boxes[0].WestBoundingCoordinate;
        let south = boxes[0].SouthBoundingCoordinate;
        let east = boxes[0].EastBoundingCoordinate;
        let north = boxes[0].NorthBoundingCoordinate;
        if (boxes.length > 1) {
            west = -180;
            east = 180;
        }

        return `POLYGON((${west} ${south}, ${east} ${south}, ${east} ${north}, ${west} ${north}, ${west} ${south}))`;
    } catch {
        return null;
    }
}

export function extractFootprint(rawGranule) {
    try {
        const gpolygons =
            rawGranule["umm"]["SpatialExtent"]["HorizontalSpatialDomain"][
                "Geometry"
            ]["GPolygons"];

        const stringBuilder = [];

        gpolygons.forEach((gpolygon) => {
            const temp = [];
            gpolygon["Boundary"]["Points"].forEach((pt) => {
                temp.push(pt["Longitude"] + " " + pt["Latitude"]);
            });
            stringBuilder.push("(" + temp.join(", ") + ")");
        });

        if (stringBuilder.length === 0) return null;
        return "MULTIPOLYGON((" + stringBuilder.join(", ") + "))";
    } catch {
        return null;
    }
}
