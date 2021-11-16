import { useEffect, useRef } from 'react';
import { createMap } from './util';

let timeout = false;
function changeSizeThrottled(map) {
    if (timeout) return;

    timeout = true;
    setTimeout(() => {
        map.updateSize();
        console.log('changed size');
        timeout = false;
    }, 50);
}

export function SimpleMap({ onMapCreate }) {
    const mapElementRef = useRef();
    const openLayersMapRef = useRef();

    useEffect(() => {
        const map = createMap();
        openLayersMapRef.current = map;
        onMapCreate(map);
    }, [onMapCreate]);

    // Ensure that OpenLayers map object recalculates size when the map element resizes.
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (openLayersMapRef.current) changeSizeThrottled(openLayersMapRef.current);
        });
        if (mapElementRef.current) observer.observe(mapElementRef.current);
        return () => observer.disconnect();
    }, [mapElementRef]);

    return (
        <div id='map' className='Map' ref={mapElementRef}>
            <style jsx>{`
                .Map {
                    width: 100%;
                    height: 100%;
                    background-color: lightgray;
                }
            `}</style>
        </div>
    );
}
