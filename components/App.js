import DatasetFilters from './DatasetFilters';
import DatasetTable from './DatasetTable';

export default function App() {
    return (
        <div>
            <h1>Hitide</h1>
            <h3>Dataset Search</h3>
            <DatasetFilters />
            <DatasetTable />
        </div>
    );
}
