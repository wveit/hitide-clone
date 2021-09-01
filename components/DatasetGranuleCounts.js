import { connect } from 'react-redux';
import { selectDatasetGranuleCounts, selectSelectedDatasets, selectDatasets } from '../state/datasetSearchSlice';

export function DatasetGranuleCounts({ selectedDatasets, datasetGranuleCounts, datasets }) {
    return (
        <div>
            {Object.keys(selectedDatasets).map((datasetId) => {
                const dataset = datasets[datasetId];
                const count = datasetGranuleCounts[datasetId];
                let countString = ' loading granules...';
                if (typeof count === 'number') {
                    countString = ' ' + count + ' granules available';
                }
                return (
                    <div key={datasetId}>
                        {dataset.shortName} - {countString}
                    </div>
                );
            })}
        </div>
    );
}

function select(state) {
    return {
        selectedDatasets: selectSelectedDatasets(state),
        datasetGranuleCounts: selectDatasetGranuleCounts(state),
        datasets: selectDatasets(state),
    };
}

export default connect(select)(DatasetGranuleCounts);
