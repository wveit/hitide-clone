import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { selectBbox } from '../../state/datasetSearchSlice';

export const Map = dynamic(() => import('./Map').then((mod) => mod.Map), {
    ssr: false,
});

function select(state) {
    return {
        bbox: selectBbox(state),
    };
}

export default connect(select)(Map);
