import DatasetFilters from './DatasetFilters';
import DatasetTable from './DatasetTable';
import GranuleSearchDatasetTable from './GranuleSearchDatasetTable';
import GranuleFilters from './GranuleFilters';
import GranuleTable from './GranuleTable';
import GranuleSearchButtonBar from './GranuleSearchButtonBar';
import PendingJobList from './PendingJobList';
import { Tabs } from './Tabs';

export default function App() {
    return (
        <div className='App'>
            <h1>Hitide</h1>
            <main>
                <Tabs tabs={['Search Datasets', 'Search Granules', 'Downloads']}>
                    <section>
                        <h2>Dataset Search</h2>
                        <DatasetFilters />
                        <DatasetTable />
                    </section>
                    <section>
                        <h2>GranuleSearch</h2>
                        <GranuleSearchDatasetTable />
                        <GranuleFilters />
                        <GranuleTable />
                        <GranuleSearchButtonBar />
                    </section>
                    <section>
                        <h2>Downloads</h2>
                        <p>Review Pending Jobs</p>
                        <PendingJobList />
                    </section>
                </Tabs>
            </main>

            <style jsx>{`
                .App {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background-color: gray;
                    display: flex;
                    flex-direction: column;
                }

                main {
                    display: flex;
                    justify-content: space-around;
                    flex-grow: 1;
                }

                section {
                    width: 33vw;
                    height: 100%;
                    border: 2px solid gray;
                    padding: 0 1rem;
                    font-size: 0.8rem;
                    background-color: white;
                    overflow-y: scroll;
                }

                section > :global(*) {
                    margin: 0.5rem 0;
                }

                h1 {
                    text-align: center;
                    background-color: lightsteelblue;
                    margin: 0px;
                }

                h2 {
                    margin: 0.5rem;
                }
            `}</style>
        </div>
    );
}
