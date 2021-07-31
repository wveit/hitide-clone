import { MapContext } from './Map';
import { useContext, useEffect, useState } from 'react';
import { createBboxLayer, bboxToPolygon } from './util';

export function BboxLayer({ bbox }) {
    const map = useContext(MapContext);
    const [layer, setLayer] = useState();

    console.log('bbox layer render');

    useEffect(() => {
        if (!map) return;
        const _layer = createBboxLayer([-50, -50, 50, 50]);
        setLayer(_layer);
        map.addLayer(_layer);
        window.layer = _layer;

        return () => map.removeLayer(_layer);
    }, [map]);

    useEffect(() => {
        if (!layer) return;
        layer._hitide__feature.setGeometry(bboxToPolygon(bbox));
    }, [bbox, layer]);

    return null;
}
