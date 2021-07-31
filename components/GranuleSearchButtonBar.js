import { connect } from 'react-redux';
import { doAddPendingJob } from '../state/pendingJobActions';

function GranuleSearchButtonBar({ onAddJob }) {
    return (
        <div>
            <button onClick={onAddJob}>Add Selected Granules</button>
            <button>Add All Matching Granules</button>
        </div>
    );
}

const actions = {
    onAddJob: doAddPendingJob,
};

export default connect(null, actions)(GranuleSearchButtonBar);
