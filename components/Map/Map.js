import { useEffect } from 'react';
import { Map as OlMap, View as OlView } from 'ol';
import OlSourceWMTS from 'ol/source/WMTS';
import OlTilegridWMTS from 'ol/tilegrid/WMTS';
import OlLayerTile from 'ol/layer/Tile';

function createBlueMarbleLayer() {
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
        source: source,
        extent: [-180, -90, 180, 90],
    });

    return layer;
}

function createMap() {
    const map = new OlMap({
        target: 'map',
        layers: [createBlueMarbleLayer()],
        view: new OlView({
            projection: 'EPSG:4326',
            extent: [-700, -180, 700, 180],
            center: [0, 0],
            zoom: 0,
        }),
        controls: [],
    });
}

export function Map() {
    useEffect(createMap, []);
    return (
        <div id='map' className='Map'>
            <style jsx>{`
                .Map {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: lightgray;
                }
            `}</style>
        </div>
    );
}
