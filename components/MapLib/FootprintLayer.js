import { MapContext } from './Map';
import { useContext, useEffect, useState } from 'react';
import { createWktLayer } from './util';

export function FootprintLayer({ footprint, color }) {
    const map = useContext(MapContext);
    const [layer, setLayer] = useState();

    useEffect(() => {
        if (!map) return;
        let _footprint = footprint;
        if (footprint.search(/envelope/i) >= 0) _footprint = convertEnvelopeToMultipolygon(_footprint);
        const _layer = createWktLayer(_footprint, color);
        setLayer(_layer);
        map.addLayer(_layer);
        window.layer = _layer;

        return () => map.removeLayer(_layer);
    }, [map, footprint, color]);

    return null;
}

function convertEnvelopeToMultipolygon(envelopeString) {
    const openParenIndex = envelopeString.indexOf('(');
    const closeParenIndex = envelopeString.indexOf(')');
    const numberString = envelopeString.slice(openParenIndex + 1, closeParenIndex);
    const [west, east, north, south] = numberString.split(',').map((str) => Number(str.trim()));
    return `MULTIPOLYGON (((${west} ${north}, ${west} ${south}, ${east} ${south}, ${east} ${north}, ${west} ${north})))`;
}
