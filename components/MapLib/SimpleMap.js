import { useEffect } from 'react';
import { createMap } from './util';

export function SimpleMap({ onMapCreate }) {
    useEffect(() => {
        const map = createMap();
        onMapCreate(map);
    }, [onMapCreate]);

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
