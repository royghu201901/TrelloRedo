import MyNav from './MyNav';
import MyToolbar from './MyToolbar';
import MyBoard from './MyBoard';
import './App.css'


function App() {
  return (
    <div className="App">
      <img src="https://i.loli.net/2021/06/25/GzfZAoDdp89MQNY.jpg" alt="bg.jpg" className="bg" draggable="false" />
      <MyNav />
      <MyToolbar />
      <MyBoard />
    </div>
  );
}

export default App;
