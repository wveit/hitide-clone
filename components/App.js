import DatasetFilters from './DatasetFilters';
import DatasetTable from './DatasetTable';
import GranuleSearchDatasetTable from './GranuleSearchDatasetTable';
import GranuleFilters from './GranuleFilters';
import GranuleTable from './GranuleTable';
import GranuleSearchButtonBar from './GranuleSearchButtonBar';

export default function App() {
    return (
        <div className='App'>
            <h1>Hitide</h1>
            <div className='App_horizontal'>
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
                </section>
            </div>

            <style jsx>{`
                .App {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background-color: gray;
                }

                .App_horizontal {
                    display: flex;
                    height: 100%;
                }

                section {
                    width: 33vw;
                    height: 100%;
                    border: 2px solid gray;
                    padding: 0 1rem;
                    font-size: 0.8rem;
                    background-color: white;
                    margin: 1px;
                }

                section > :global(*) {
                    margin: 0.5rem;
                }

                h1 {
                    text-align: center;
                    background-color: lightsteelblue;
                    margin: 1px;
                }

                h2 {
                    margin: 0.5rem;
                }
            `}</style>
        </div>
    );
}
