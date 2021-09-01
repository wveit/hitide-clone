import { connect } from 'react-redux';
import {
    selectCurrentGranuleFilter,
    selectGranules,
    doSetSelectedGranueles,
    selectSelectedGranules,
    selectFootprintGranuleIds,
    doAddFootprintGranule,
    doRemoveFootprintGranule,
} from '../state/granuleSearchSlice';

function GranuleTable({
    granules,
    selectedGranuleFilter,
    selectedGranules,
    onSetSelectedGranules,
    footprintGranules,
    onRemoveSelectedFootprint,
    onAddSelectedFootprint,
}) {
    let granuleArray = [];
    if (selectedGranuleFilter) granuleArray = Object.values(granules[selectedGranuleFilter]);

    const datasetId = selectedGranuleFilter;
    const currentSelectedGranules = selectedGranules[datasetId];

    function handleClick(e) {
        e.stopPropagation();
        const tr = e.target.closest('tr');
        const granuleId = tr.dataset['granuleId'];
        if (e.shiftKey) {
            // handle range select
            // TODO
        } else if (e.metaKey || e.ctrlKey) {
            // handle multi select
            onSetSelectedGranules({ datasetId, selectedGranules: { ...currentSelectedGranules, [granuleId]: true } });
        } else {
            // handle regular select
            onSetSelectedGranules({ datasetId, selectedGranules: { [granuleId]: true } });
        }
    }

    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {granuleArray.map((g) => {
                        const footprintSelected = footprintGranules[datasetId][g.id];
                        return (
                            <tr
                                key={g.id}
                                onClick={handleClick}
                                data-granule-id={g.id}
                                className={currentSelectedGranules[g.id] ? 'selected' : ''}
                            >
                                <td>
                                    <span
                                        className={
                                            'fas fa-draw-polygon hitide-btn footprint' +
                                            (footprintSelected ? ' selected' : '')
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (footprintSelected) {
                                                onRemoveSelectedFootprint({ datasetId, granuleId: g.id });
                                            } else {
                                                onAddSelectedFootprint({ datasetId, granuleId: g.id });
                                            }
                                        }}
                                    ></span>
                                </td>
                                <td>
                                    <span
                                        className='far fa-image hitide-btn image'
                                        onClick={(e) => e.stopPropagation()}
                                    ></span>
                                </td>
                                <td>{g.name}</td>
                                <td>{g.startDate}</td>
                                <td>{g.endDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <style jsx>{`
                .container {
                    width: 100%;
                    height: 300px;
                    overflow-y: scroll;
                    border: 1px solid gray;
                }

                .selected {
                    background-color: lightgray;
                }

                .footprint,
                .image {
                    color: white;
                    background-color: gray;
                    border-radius: 2;
                    padding: 2px;
                    font-size: 1.2rem;
                }

                .hitide-btn.selected {
                    background-color: violet;
                }
            `}</style>
        </div>
    );
}

function select(state) {
    return {
        granules: selectGranules(state),
        selectedGranuleFilter: selectCurrentGranuleFilter(state),
        selectedGranules: selectSelectedGranules(state),
        footprintGranules: selectFootprintGranuleIds(state),
    };
}

const actions = {
    onSetSelectedGranules: doSetSelectedGranueles,
    onAddSelectedFootprint: doAddFootprintGranule,
    onRemoveSelectedFootprint: doRemoveFootprintGranule,
};

export default connect(select, actions)(GranuleTable);
