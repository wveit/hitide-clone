import DatasetFilters from './DatasetFilters';
import DatasetTable from './DatasetTable';
import GranuleSearchDatasetTable from './GranuleSearchDatasetTable';
import GranuleTable from './GranuleTable';

export default function App() {
    return (
        <div>
            <h1>Hitide</h1>
            <h2>Dataset Search</h2>
            <DatasetFilters />
            <DatasetTable />
            <h2>GranuleSearch</h2>
            <GranuleSearchDatasetTable />
            <GranuleTable />
        </div>
    );
}
