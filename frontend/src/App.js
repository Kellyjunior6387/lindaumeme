import './Header.css';
import './App.css';
import Header from './components/Header';
import DataDisplay from './components/DataDisplay';
import DataFetcher from './components/DataFetcher';
import ThresholdInput from './components/ThresholdInput';

function App() {
  return (
    <div>
      <Header />
      <ThresholdInput />
      <DataFetcher />
      <DataDisplay />
    </div>
  );
}

export default App;
