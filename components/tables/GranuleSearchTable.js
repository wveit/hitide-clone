import { connect } from 'react-redux';
import {
    doSetCurrentGranuleFilter,
    selectCurrentGranuleFilter,
    selectGranuleFilters,
} from '../../state/granuleSearchSlice';
import { selectDatasets, selectDatasetGranuleCounts, selectDatasetColors } from '../../state/datasetSearchSlice';
import { doUnselectDatasetProcess, doUnselectAllDatasetsProcess } from '../../state/datasetActions';

export function GranuleSearchTable({
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
        <div className='hitide-table'>
            <div className='hitide-table__row hitide-table__header'>
                <div>Name</div>
                <div>Granule Count</div>
                <div className='fa fa-download hitide-btn' aria-hidden='true' onClick={onDownloadAllGranules} />
                <div className='far fa-times-circle hitide-btn' onClick={onUnselectAllDatasets} />
            </div>
            {granuleFilterArray.map((filter) => (
                <div
                    key={filter.datasetId}
                    className={
                        'hitide-table__row ' +
                        (currentGranuleFilter === filter.datasetId ? 'hitide-table__row--selected' : '')
                    }
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

            <style jsx>{`
                .hitide-table__header,
                .hitide-table__row {
                    display: grid;
                    grid-template-columns: 1fr 8rem 1.5rem 1.5rem;
                    padding: 0.2rem 0.5rem;
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

export default connect(select, actions)(GranuleSearchTable);
