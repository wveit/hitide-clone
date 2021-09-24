import DatasetFilters from './DatasetFilters';
import DatasetTable from './tables/DatasetTable';
import GranuleSearchTable from './tables/GranuleSearchTable';
import GranuleFilters from './GranuleFilters';
import GranuleTable from './tables/GranuleTable';
import GranuleSearchButtonBar from './GranuleSearchButtonBar';
import UnsubmittedJobTable from './tables/UnsubmittedJobTable';
import { Tabs } from './Tabs';
import { Drawer, DrawerToggle } from './Drawer';
import { useState } from 'react';
import { TitleBar } from './TitleBar';
import HitideMap from './HitideMap';
import DatasetGranuleCounts from './DatasetGranuleCounts';
import JobSubmitter from './JobSubmitter';
import JobHistoryTable from './tables/JobHistoryTable';

export default function App() {
    const [drawerOpen, setDrawerOpen] = useState(true);

    return (
        <div className='App'>
            <HitideMap />
            <DrawerToggle onClick={() => setDrawerOpen(!drawerOpen)} />
            <Drawer isOpen={drawerOpen}>
                <TitleBar onDrawerToggle={() => setDrawerOpen(!drawerOpen)} />
                <Tabs tabs={['Search Datasets', 'Search Granules', 'Downloads']}>
                    <section>
                        <h2>Dataset Search</h2>
                        <p>
                            Search for datasets by date range, region, and parameter. Datasets selected in the results
                            table will be available for subsetting and previewing in Granule Selection. Note: Dataset
                            granules in Granule Selection will be constrained by the date range and region filters you
                            apply below.
                        </p>
                        <DatasetFilters />
                        <DatasetTable />
                        <h4>Selected Datasets</h4>
                        <DatasetGranuleCounts />
                    </section>
                    <section>
                        <h2>GranuleSearch</h2>
                        <p>
                            Download matching granules for all datasets, for individual datasets, or click on a dataset
                            to further filter and preview its granules.{' '}
                        </p>
                        <GranuleSearchTable />
                        <GranuleFilters />
                        <GranuleTable />
                        <GranuleSearchButtonBar />
                    </section>
                    <section>
                        <h2>Downloads</h2>
                        <p>
                            Review the selections you have made then submit them for processing. We will zip and email
                            you the results.{' '}
                        </p>
                        <h4>Review Pending Jobs</h4>
                        <UnsubmittedJobTable />
                        <JobSubmitter />
                        <h4>History</h4>
                        <JobHistoryTable />
                    </section>
                </Tabs>
            </Drawer>

            <style jsx>{`
                .App {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background-color: gray;
                    overflow: hidden;
                }

                section {
                    height: 100%;
                    padding: 0 1rem;
                    font-size: 0.8rem;
                    overflow-y: scroll;
                }

                section > :global(*) {
                    margin-bottom: 1rem;
                }

                p {
                    color: gray;
                    font-style: italic;
                }
            `}</style>
        </div>
    );
}
