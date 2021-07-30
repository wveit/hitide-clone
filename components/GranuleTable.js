import { connect } from 'react-redux';
import {
    selectCurrentGranuleFilter,
    selectGranules,
    doSetSelectedGranueles,
    selectSelectedGranules,
} from '../state/granuleSearchSlice';

function GranuleTable({ granules, selectedGranuleFilter, selectedGranules, onSetSelectedGranules }) {
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
                    {granuleArray.map((g) => (
                        <tr
                            key={g.id}
                            onClick={handleClick}
                            data-granule-id={g.id}
                            className={currentSelectedGranules[g.id] ? 'selected' : ''}
                        >
                            <td>
                                <span
                                    className='fas fa-draw-polygon hitide-btn'
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'gray',
                                        borderRadius: 2,
                                        padding: 2,
                                        fontSize: '1.2rem',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                ></span>
                            </td>
                            <td>
                                <span
                                    className='far fa-image hitide-btn'
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'gray',
                                        borderRadius: 2,
                                        padding: 2,
                                        fontSize: '1.2rem',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                ></span>
                            </td>
                            <td>{g.name}</td>
                            <td>{g.startDate}</td>
                            <td>{g.endDate}</td>
                        </tr>
                    ))}
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
            `}</style>
        </div>
    );
}

function select(state) {
    return {
        granules: selectGranules(state),
        selectedGranuleFilter: selectCurrentGranuleFilter(state),
        selectedGranules: selectSelectedGranules(state),
    };
}

const actions = {
    onSetSelectedGranules: doSetSelectedGranueles,
};

export default connect(select, actions)(GranuleTable);
