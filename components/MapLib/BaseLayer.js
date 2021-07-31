import { MapContext } from './Map';
import { useContext, useEffect } from 'react';
import { createBackgroundLayer } from './util';

export function BaseLayer() {
    const map = useContext(MapContext);

    // Take care of adding/removing layer to map
    useEffect(() => {
        if (!map) return;

        const layer = createBackgroundLayer();
        map.addLayer(layer);

        return () => {
            map.removeLayer(layer);
        };
    }, [map]);

    return null;
}
