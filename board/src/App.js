import './App.css';
import icon from '../src/assets/images/SESS - Copy.png'
import Table from './components/table'

function App() {
  return (
    <div className="App">
      <div className='table'>

        <nav>
          <img src={icon} alt=""/>
        </nav>
  
        <section class="table__header">
            <h1>Rankings</h1>
        </section>

        <Table />
        
      </div>
    </div>
  );
}

export default App;
