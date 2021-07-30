import { connect } from 'react-redux';
import {
    doSetCurrentGranuleFilter,
    selectCurrentGranuleFilter,
    selectGranuleFilters,
} from '../state/granuleSearchSlice';
import { selectDatasets, selectDatasetGranuleCounts } from '../state/datasetSearchSlice';
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
}) {
    const granuleFilterArray = Object.values(granuleFilters);

    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Granule Count</th>
                        <th>
                            <span
                                className='fa fa-download hitide-btn'
                                aria-hidden='true'
                                onClick={onDownloadAllGranules}
                            />
                        </th>
                        <th>
                            <span className='hitide-btn' onClick={onUnselectAllDatasets}>
                                x
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {granuleFilterArray.map((filter) => (
                        <tr
                            key={filter.datasetId}
                            className={currentGranuleFilter === filter.datasetId ? 'selected' : ''}
                            onClick={() => onGranuleFilterSelect(filter.datasetId)}
                        >
                            <td>{datasets[filter.datasetId].shortName}</td>
                            <td>{datasetGranuleCounts[filter.datasetId]}</td>
                            <td>
                                <span
                                    className='fa fa-download hitide-btn'
                                    aria-hidden='true'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDownloadAllGranulesForDataset(filter.datasetId);
                                    }}
                                />
                            </td>
                            <td>
                                <span
                                    className='hitide-btn'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onUnselectDataset(filter.datasetId);
                                    }}
                                >
                                    x
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                .container {
                    width: 100%;
                    height: 150px;
                    border: 1px solid gray;
                    overflow-y: scroll;
                }

                th,
                td {
                    padding: 0.1rem 1rem;
                }

                .selected {
                    background-color: lightgray;
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
    };
}

const actions = {
    onUnselectDataset: doUnselectDatasetProcess,
    onUnselectAllDatasets: doUnselectAllDatasetsProcess,
    onGranuleFilterSelect: doSetCurrentGranuleFilter,
};

export default connect(select, actions)(GranuleSearchDatasetTable);
