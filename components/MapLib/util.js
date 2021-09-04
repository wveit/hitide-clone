import { Map as OlMap, View as OlView } from 'ol';
import OlSourceWMTS from 'ol/source/WMTS';
import OlTilegridWMTS from 'ol/tilegrid/WMTS';
import OlLayerTile from 'ol/layer/Tile';

import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Polygon } from 'ol/geom';
import WKT from 'ol/format/WKT';

import { Style, Stroke } from 'ol/style';

export function createWktLayer(wkt, color) {
    const format = new WKT();
    const feature = format.readFeature(wkt);
    const layer = new VectorLayer({
        zIndex: 4,
        source: new VectorSource({
            features: [feature],
            wrapX: false,
        }),
        style: new Style({
            stroke: new Stroke({
                color: color,
                width: 2,
            }),
        }),
    });
    return layer;
}

export function createMap() {
    const layers = [];
    const map = new OlMap({
        target: 'map',
        layers,
        view: new OlView({
            projection: 'EPSG:4326',
            extent: [-700, -180, 700, 180],
            center: [0, 0],
            zoom: 0,
        }),
        controls: [],
    });
    return map;
}

export function bboxToPolygon(bbox) {
    return new Polygon([
        [
            [bbox[0], bbox[1]],
            [bbox[2], bbox[1]],
            [bbox[2], bbox[3]],
            [bbox[0], bbox[3]],
        ],
    ]);
}

export function createBboxLayer(bbox) {
    const myStyle = new Style({
        stroke: new Stroke({ color: 'red', width: 3 }),
    });

    const polygon = bboxToPolygon(bbox);

    const feature = new Feature({
        geometry: polygon,
    });

    const layer = new VectorLayer({
        zIndex: 5,
        source: new VectorSource({
            features: [feature],
            wrapX: false,
            useSpatialIndex: false,
        }),
        style: myStyle,
    });

    layer._hitide__feature = feature;

    return layer;
}

export function createBackgroundLayer() {
    const source = new OlSourceWMTS({
        url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2013-06-16',
        layer: 'BlueMarble_ShadedRelief_Bathymetry',
        format: 'image/jpeg',
        matrixSet: 'EPSG4326_500m',
        tileGrid: new OlTilegridWMTS({
            origin: [-180, 90],
            resolutions: [0.5625, 0.28125, 0.140625, 0.0703125, 0.03515625, 0.017578125, 0.0087890625, 0.00439453125],
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7],
            tileSize: 512,
        }),
    });

    const layer = new OlLayerTile({
        preload: Infinity,
        source: source,
        extent: [-180, -90, 180, 90],
    });

    return layer;
}
