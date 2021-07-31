import { Map, BaseLayer, BboxLayer, FootprintLayer } from './MapLib';
import { connect } from 'react-redux';
import { selectBbox } from '../state/datasetSearchSlice';
import { selectFootprintGranules, selectGranules } from '../state/granuleSearchSlice';

export function HitideMap({ bbox, footprints }) {
    return (
        <Map>
            <BaseLayer />
            <BboxLayer bbox={bbox} />
            {footprints.map((footprint) => (
                <FootprintLayer key={footprint} footprint={footprint} />
            ))}
        </Map>
    );
}

function selectFootprints(state) {
    const footprintGranules = selectFootprintGranules(state);
    const granules = selectGranules(state);
    const footprints = [];

    Object.keys(footprintGranules).forEach((datasetId) => {
        Object.keys(footprintGranules[datasetId]).forEach((granuleId) => {
            footprints.push(granules[datasetId][granuleId].footprint);
        });
    });

    return footprints;
}

function select(state) {
    return {
        bbox: selectBbox(state),
        footprints: selectFootprints(state),
    };
}
export default connect(select)(HitideMap);
