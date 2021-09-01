import { connect } from 'react-redux';
import {
    doSetCurrentGranuleFilter,
    selectCurrentGranuleFilter,
    selectGranuleFilters,
} from '../state/granuleSearchSlice';
import { selectDatasets, selectDatasetGranuleCounts, selectDatasetColors } from '../state/datasetSearchSlice';
import { doUnselectDatasetProcess, doUnselectAllDatasetsProcess } from '../state/datasetActions';

export function GranuleSearchDatasetTable({
    granuleFilters,
    datasets,
    datasetGranuleCounts,
    onUnselectDataset,
    onDownloadAllGranulesForDataset,
    onUnselectAllDatasets,
    onDownloadAllGranules,
    currentGranuleFilter,
    onGranuleFilterSelect,
    datasetColors,
}) {
    const granuleFilterArray = Object.values(granuleFilters);

    return (
        <div className='container'>
            <div className='header row'>
                <div>Name</div>
                <div>Granule Count</div>
                <div className='fa fa-download hitide-btn' aria-hidden='true' onClick={onDownloadAllGranules} />
                <div className='far fa-times-circle hitide-btn' onClick={onUnselectAllDatasets} />
            </div>
            <div className='data-container'>
                {granuleFilterArray.map((filter) => (
                    <div
                        key={filter.datasetId}
                        className={'row ' + (currentGranuleFilter === filter.datasetId ? 'selected' : '')}
                        onClick={() => onGranuleFilterSelect(filter.datasetId)}
                    >
                        <div>
                            <div
                                className='color-circle'
                                style={{
                                    backgroundColor: datasetColors[filter.datasetId],
                                }}
                            />
                            {datasets[filter.datasetId].shortName}
                        </div>
                        <div>{datasetGranuleCounts[filter.datasetId]}</div>
                        <div
                            className='fa fa-download hitide-btn'
                            aria-hidden='true'
                            onClick={(e) => {
                                e.stopPropagation();
                                onDownloadAllGranulesForDataset(filter.datasetId);
                            }}
                        />
                        <div
                            className='far fa-times-circle hitide-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                onUnselectDataset(filter.datasetId);
                            }}
                        />
                    </div>
                ))}
            </div>

            <style jsx>{`
                .container {
                    width: 100%;
                    height: 150px;
                    border: 1px solid gray;
                    display: inline-flex;
                    flex-direction: column;
                    cursor: default;
                }

                .data-container {
                    overflow-y: scroll;
                }

                .row {
                    display: grid;
                    grid-template-columns: 1fr 8rem 1.5rem 1.5rem;
                    padding: 0.2rem 0.5rem;
                }

                .row.header {
                    background-color: lightblue;
                }

                .selected {
                    background-color: rgb(238, 238, 238);
                }

                .color-circle {
                    border-radius: 50%;
                    height: 10px;
                    width: 10px;
                    display: inline-flex;
                    margin-right: 0.7rem;
                }
            `}</style>
        </div>
    );
}

function select(state) {
    return {
        granuleFilters: selectGranuleFilters(state),
        datasets: selectDatasets(state),
        datasetGranuleCounts: selectDatasetGranuleCounts(state),
        currentGranuleFilter: selectCurrentGranuleFilter(state),
        datasetColors: selectDatasetColors(state),
    };
}

const actions = {
    onUnselectDataset: doUnselectDatasetProcess,
    onUnselectAllDatasets: doUnselectAllDatasetsProcess,
    onGranuleFilterSelect: doSetCurrentGranuleFilter,
};

export default connect(select, actions)(GranuleSearchDatasetTable);
