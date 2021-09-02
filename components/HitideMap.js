import { Map, BaseLayer, BboxLayer, FootprintLayer, ImageLayer } from './MapLib';
import { connect } from 'react-redux';
import { selectBbox, selectDatasetColors } from '../state/datasetSearchSlice';
import { selectFootprintGranuleList, selectPreviewGranuleList } from '../state/granuleSearchSlice';
import { selectImageVariables } from '../state/variablesSlice';

export function HitideMap({ bbox, footprintGranuleList, datasetColors, previewGranuleList, imageVariables }) {
    return (
        <Map>
            <BaseLayer />
            {previewGranuleList.map((granule) => {
                const varId = imageVariables[granule.datasetId][0].id;
                const baseUrl = granule.imageRootUrl;
                return <ImageLayer key={granule.id} imageUrl={`${baseUrl}/${varId}.png`} wktExtent={granule.extent} />;
            })}
            {footprintGranuleList.map((granule) => (
                <FootprintLayer
                    key={granule.id}
                    footprint={granule.footprint}
                    color={datasetColors[granule.datasetId]}
                />
            ))}
            <BboxLayer bbox={bbox} />
        </Map>
    );
}

function select(state) {
    return {
        bbox: selectBbox(state),
        footprintGranuleList: selectFootprintGranuleList(state),
        datasetColors: selectDatasetColors(state),
        previewGranuleList: selectPreviewGranuleList(state),
        imageVariables: selectImageVariables(state),
    };
}
export default connect(select)(HitideMap);
