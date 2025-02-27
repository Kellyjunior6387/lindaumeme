import './Header.css';
import './App.css';
import Header from './components/Header';
import DataDisplay from './components/DataDisplay';
import DataFetcher from './components/DataFetcher';

function App() {
  return (
    <div>
      <Header />
      <DataFetcher />
      <DataDisplay />
    </div>
  );
}

export default App;
