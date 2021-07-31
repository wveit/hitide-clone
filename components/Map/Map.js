import { useEffect } from 'react';
import { createMap, createBboxLayer, createBackgroundLayer } from './util';

export function Map({ bbox }) {
    console.log(bbox);
    useEffect(() => {
        let map = createMap();
        const bgLayer = createBackgroundLayer();
        const bboxLayer = createBboxLayer(bbox);
        map.addLayer(bgLayer);
        map.addLayer(bboxLayer);
        window.map = map;
    }, [bbox]);

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
