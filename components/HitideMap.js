import { Map, BaseLayer, BboxLayer } from './MapLib';
import { connect } from 'react-redux';
import { selectBbox } from '../state/datasetSearchSlice';

export function HitideMap({ bbox }) {
    return (
        <Map>
            <BaseLayer />
            <BboxLayer bbox={bbox} />
        </Map>
    );
}

function select(state) {
    return {
        bbox: selectBbox(state),
    };
}
export default connect(select)(HitideMap);
