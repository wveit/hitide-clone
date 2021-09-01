import { connect } from 'react-redux';
import { selectCurrentGranuleFilter } from '../state/granuleSearchSlice';
import { selectDatasetColors } from '../state/datasetSearchSlice';

function GranuleFilters({ datasetId, datasetColors }) {
    return (
        <div className='container'>
            <h3>{datasetId}</h3>
            <div className='row row1'>
                <div className='label'>Filter By Name:</div>
                <input type='text' id='granule-name-filter' />
            </div>
            <div className='row row2'>
                <div className='label'>Filter By Date:</div>
                <span>From</span>
                <input type='date' id='granule-startDate-filter' value='2000-01-01' readOnly />
                <span>To</span>
                <input
                    type='date'
                    id='granule-endDate-filter'
                    value={new Date().toISOString().split('T')[0]}
                    readOnly
                />
            </div>

            <style jsx>{`
                .container {
                    padding: 2rem 0;
                }

                h3 {
                    margin: 0;
                    margin-bottom: 0.5rem;
                    border-bottom: 2px solid ${datasetColors[datasetId]};
                    display: inline-block;
                }

                .row {
                    width: 80%;
                    display: grid;
                    justify-items: center;
                    align-items: center;
                    padding: 0.2rem 0;
                }

                .row1 {
                    grid-template-columns: 7rem 1fr;
                }

                .row2 {
                    grid-template-columns: 7rem auto 1fr auto 1fr;
                }

                .row > * {
                    margin-right: 1.2rem;
                }

                input {
                    width: 100%;
                }

                .label {
                    justify-self: left;
                }
            `}</style>
        </div>
    );
}

function select(state) {
    return {
        datasetId: selectCurrentGranuleFilter(state),
        datasetColors: selectDatasetColors(state),
    };
}

export default connect(select)(GranuleFilters);
