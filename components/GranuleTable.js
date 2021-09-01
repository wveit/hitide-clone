import { connect } from 'react-redux';
import {
    selectCurrentGranuleFilter,
    selectGranules,
    doSetSelectedGranueles,
    selectSelectedGranules,
    selectFootprintGranuleIds,
    selectPreviewGranuleIds,
    doAddFootprintGranule,
    doRemoveFootprintGranule,
    doAddPreviewGranule,
    doRemovePreviewGranule,
} from '../state/granuleSearchSlice';

function format(date) {
    if (typeof date !== 'string') return date;
    const newDate = date.substring(0, 16);
    return newDate;
}

function GranuleTable({
    granules,
    selectedGranuleFilter,
    selectedGranules,
    onSetSelectedGranules,
    footprintGranules,
    previewGranules,
    onRemoveSelectedFootprint,
    onAddSelectedFootprint,
    onRemoveSelectedPreview,
    onAddSelectedPreview,
}) {
    let granuleArray = [];
    if (selectedGranuleFilter) granuleArray = Object.values(granules[selectedGranuleFilter]);

    const datasetId = selectedGranuleFilter;
    const currentSelectedGranules = selectedGranules[datasetId];

    function handleClick(e) {
        e.stopPropagation();
        const row = e.target.closest('.row');
        const granuleId = row.dataset['granuleId'];
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
            <div className='row header'>
                <div></div>
                <div></div>
                <div>Name</div>
                <div>Start Time</div>
                <div>End Time</div>
            </div>
            <div className='data-container'>
                {granuleArray.map((g) => {
                    const footprintSelected = footprintGranules[datasetId][g.id];
                    const previewSelected = previewGranules[datasetId][g.id];
                    return (
                        <div
                            key={g.id}
                            onClick={handleClick}
                            data-granule-id={g.id}
                            className={'row ' + (currentSelectedGranules[g.id] ? 'selected' : '')}
                        >
                            <div>
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
                            </div>
                            <div>
                                <span
                                    className={'far fa-image hitide-btn image' + (previewSelected ? ' selected' : '')}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (previewSelected) {
                                            onRemoveSelectedPreview({ datasetId, granuleId: g.id });
                                        } else {
                                            onAddSelectedPreview({ datasetId, granuleId: g.id });
                                        }
                                    }}
                                ></span>
                            </div>
                            <div>{g.name}</div>
                            <div>{format(g.startDate)}</div>
                            <div>{format(g.endDate)}</div>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                .container {
                    width: 100%;
                    height: 300px;
                    border: 1px solid gray;
                    display: inline-flex;
                    flex-direction: column;
                    cursor: default;
                }

                .data-container {
                    overflow-y: scroll;
                }

                .row {
                    width: 100%;
                    display: grid;
                    font-size: 0.7rem;
                    grid-template-columns: 2rem 2rem 1fr 8rem 8rem;
                    padding: 0.2rem 0;
                }

                .row > div {
                    padding: 0.3rem;
                    word-break: break-all;
                }

                .row.header {
                    background-color: lightblue;
                }

                .selected {
                    background-color: rgb(238, 238, 238);
                }

                .footprint,
                .image {
                    color: gray;
                    border-radius: 2;
                    padding: 1px;
                    font-size: 1.2rem;
                }

                .hitide-btn.selected {
                    color: violet;
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
        previewGranules: selectPreviewGranuleIds(state),
    };
}

const actions = {
    onSetSelectedGranules: doSetSelectedGranueles,
    onAddSelectedFootprint: doAddFootprintGranule,
    onRemoveSelectedFootprint: doRemoveFootprintGranule,
    onAddSelectedPreview: doAddPreviewGranule,
    onRemoveSelectedPreview: doRemovePreviewGranule,
};

export default connect(select, actions)(GranuleTable);
