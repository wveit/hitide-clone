import { connect } from 'react-redux';

function GranuleFilters() {
    return (
        <div>
            <div>
                <label htmlFor='granule-name-filter'>Filter By Name: </label>{' '}
                <input type='text' id='granule-name-filter' />
            </div>
            <div>
                <label htmlFor='granule-name-filter'>Filter By Date: </label>
                <span>From</span>
                <input type='text' id='granule-startDate-filter' />
                <span>To</span>
                <input type='text' id='granule-endDate-filter' />
            </div>
        </div>
    );
}

export default connect()(GranuleFilters);
