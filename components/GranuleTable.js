import { connect } from 'react-redux';
import { selectCurrentGranuleFilter, selectGranules } from '../state/granuleSearchSlice';

function GranuleTable({ granules, selectedGranuleFilter }) {
    if (!selectedGranuleFilter) return null;
    const granuleArray = Object.values(granules[selectedGranuleFilter]);

    return (
        <div>
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
                        <tr key={g.id}>
                            <td>
                                <button>f</button>
                            </td>
                            <td>
                                <button>i</button>
                            </td>
                            <td>{g.name}</td>
                            <td>{g.startDate}</td>
                            <td>{g.endDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
