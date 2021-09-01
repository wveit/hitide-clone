import { Map, BaseLayer, BboxLayer, FootprintLayer } from './MapLib';
import { connect } from 'react-redux';
import { selectBbox } from '../state/datasetSearchSlice';
import { selectFootprintGranuleList } from '../state/granuleSearchSlice';

export function HitideMap({ bbox, footprintGranuleList }) {
    return (
        <Map>
            <BaseLayer />
            <BboxLayer bbox={bbox} />
            {footprintGranuleList.map((granule) => (
                <FootprintLayer key={granule.id} footprint={granule.footprint} />
            ))}
        </Map>
    );
}

function select(state) {
    return {
        bbox: selectBbox(state),
        footprintGranuleList: selectFootprintGranuleList(state),
    };
}
export default connect(select)(HitideMap);
