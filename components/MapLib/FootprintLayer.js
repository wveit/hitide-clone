import { MapContext } from './Map';
import { useContext, useEffect, useState } from 'react';
import { createWktLayer } from './util';

export function FootprintLayer({ footprint }) {
    const map = useContext(MapContext);
    const [layer, setLayer] = useState();

    useEffect(() => {
        if (!map) return;
        const _layer = createWktLayer(footprint);
        setLayer(_layer);
        map.addLayer(_layer);
        window.layer = _layer;

        return () => map.removeLayer(_layer);
    }, [map, footprint]);

    return null;
}
