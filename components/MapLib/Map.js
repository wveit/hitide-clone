import { useState, createContext } from 'react';
import { SimpleMap } from './SimpleMap';

export const MapContext = createContext();

export function Map({ children }) {
    const [map, setMap] = useState();

    return (
        <MapContext.Provider value={map}>
            <SimpleMap onMapCreate={setMap} />
            {children}
        </MapContext.Provider>
    );
}
