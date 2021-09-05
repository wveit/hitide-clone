import DatasetFilters from './DatasetFilters';
import DatasetTable from './DatasetTable';
import GranuleSearchDatasetTable from './GranuleSearchDatasetTable';
import GranuleFilters from './GranuleFilters';
import GranuleTable from './GranuleTable';
import GranuleSearchButtonBar from './GranuleSearchButtonBar';
import PendingJobList from './PendingJobList';
import { Tabs } from './Tabs';
import { Drawer, DrawerToggle } from './Drawer';
import { useState } from 'react';
import { TitleBar } from './TitleBar';
import HitideMap from './HitideMap';
import DatasetGranuleCounts from './DatasetGranuleCounts';
import JobSubmitter from './JobSubmitter';
import JobHistory from './JobHistory';

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
                        <DatasetFilters />
                        <DatasetTable />
                        <h4>Selected Datasets</h4>
                        <DatasetGranuleCounts />
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
                        <h4>Review Pending Jobs</h4>
                        <PendingJobList />
                        <JobSubmitter />
                        <h4>History</h4>
                        <JobHistory />
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
            `}</style>
        </div>
    );
}
