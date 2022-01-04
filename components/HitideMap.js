import {
    Map,
    BaseLayer,
    BboxLayer,
    FootprintLayer,
    ImageLayer,
} from "./MapLib";
import { connect } from "react-redux";
import { selectBbox, selectDatasetColors } from "../state/datasetSearchSlice";
import {
    selectFootprintGranuleList,
    selectPreviewGranuleList,
} from "../state/granuleSearchSlice";

export function HitideMap({
    bbox,
    footprintGranuleList,
    datasetColors,
    previewGranuleList,
}) {
    return (
        <Map>
            <BaseLayer />
            {previewGranuleList.map((granule) => {
                const imageUrl = Object.values(granule.imageUrlObject)[0];
                console.log(granule.imageUrlObject);
                console.log(imageUrl);
                return (
                    <ImageLayer
                        key={granule.id}
                        imageUrl={imageUrl}
                        wktExtent={granule.extent}
                    />
                );
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
    };
}
export default connect(select)(HitideMap);
