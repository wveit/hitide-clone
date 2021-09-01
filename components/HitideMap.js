import { Map, BaseLayer, BboxLayer, FootprintLayer } from './MapLib';
import { connect } from 'react-redux';
import { selectBbox, selectDatasetColors } from '../state/datasetSearchSlice';
import { selectFootprintGranuleList } from '../state/granuleSearchSlice';

export function HitideMap({ bbox, footprintGranuleList, datasetColors }) {
    return (
        <Map>
            <BaseLayer />
            <BboxLayer bbox={bbox} />
            {footprintGranuleList.map((granule) => (
                <FootprintLayer
                    key={granule.id}
                    footprint={granule.footprint}
                    color={datasetColors[granule.datasetId]}
                />
            ))}
        </Map>
    );
}

function select(state) {
    return {
        bbox: selectBbox(state),
        footprintGranuleList: selectFootprintGranuleList(state),
        datasetColors: selectDatasetColors(state),
    };
}
export default connect(select)(HitideMap);
