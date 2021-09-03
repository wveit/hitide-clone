import { MapContext } from './Map';
import { useContext, useEffect } from 'react';
import ImgLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';

export function ImageLayer({ imageUrl, wktExtent }) {
    const map = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        const extent = convertExtent(wktExtent);

        const layer = new ImgLayer({
            source: new Static({
                url: imageUrl,
                projection: 'EPSG:4326',
                imageExtent: extent,
            }),
        });

        map.addLayer(layer);

        return () => map.removeLayer(layer);
    }, [map, imageUrl, wktExtent]);

    return null;
}

function convertExtent(wkt) {
    const numbers = wkt.match(/-?(\d+\.?\d*)|(\.?\d+)/g).map(Number);
    let extent;
    if (numbers.length === 10) extent = [numbers[0], numbers[1], numbers[4], numbers[5]];
    else extent = [numbers[0], numbers[3], numbers[1], numbers[2]];
    return extent;
}
