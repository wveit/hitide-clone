import { useState } from 'react';
import { connect } from 'react-redux';
import { selectCurrentGranuleFilter, selectGranules } from '../state/granuleSearchSlice';

function GranuleTable({ granules, selectedGranuleFilter }) {
    let granuleArray = [];
    if (selectedGranuleFilter) granuleArray = Object.values(granules[selectedGranuleFilter]);

    const [selectedRows, setSelectedRows] = useState({});

    function handleClick(e) {
        e.stopPropagation();
        const tr = e.target.closest('tr');
        const granuleId = tr.dataset['granuleId'];
        console.log(granuleId);
        if (e.shiftKey) {
            // handle range select
            // TODO
        } else if (e.metaKey || e.ctrlKey) {
            // handle multi select
            setSelectedRows({ ...selectedRows, [granuleId]: true });
        } else {
            // handle regular select
            setSelectedRows({ [granuleId]: true });
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
                            className={selectedRows[g.id] ? 'selected' : ''}
                        >
                            <td>
                                <button onClick={(e) => e.stopPropagation()}>f</button>
                            </td>
                            <td>
                                <button onClick={(e) => e.stopPropagation()}>i</button>
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
    };
}

const actions = {};

export default connect(select, actions)(GranuleTable);
