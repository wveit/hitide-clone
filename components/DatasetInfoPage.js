import { connect } from 'react-redux';
import { Modal } from './Modal';
import { doSetDatasetInfoPage } from '../state/modalsSlice';
import { selectDatasetInfoPage } from '../state/modalsSlice';
import { selectDatasets } from '../state/datasetSearchSlice';

export function DatasetInfoPage({ datasetInfoPage, setDatasetInfoPage, datasets }) {
    if (!datasetInfoPage) return null;
    const dataset = datasets[datasetInfoPage];
    return (
        <Modal show={true} onClickOutside={() => setDatasetInfoPage(null)}>
            <div className='container'>
                <img src={dataset.imageUrl} />
                <div>
                    <b>id:</b> {dataset.id}
                </div>
                <div>
                    <b>shortName:</b> {dataset.shortName}
                </div>
                <div>
                    <b>longName:</b> {dataset.longName}
                </div>
                <div>
                    <b>description:</b> {dataset.description}
                </div>
            </div>
            <style jsx>{`
                .container {
                    min-width: 500px;
                    max-width: 50vw;
                    height: 80vh;
                    overflow-y: scroll;
                    display: flex;
                    flex-direction: column;
                }

                .container > * {
                    margin-bottom: 1rem;
                }
            `}</style>
        </Modal>
    );
}

export default connect(
    function (state) {
        return {
            datasetInfoPage: selectDatasetInfoPage(state),
            datasets: selectDatasets(state),
        };
    },
    {
        setDatasetInfoPage: doSetDatasetInfoPage,
    }
)(DatasetInfoPage);
