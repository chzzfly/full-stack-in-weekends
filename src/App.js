import "./style.css";

function App() {
  return (
    <header className="header">
      <div className="logo">
        <img src="./logo.png" alt="logo" />
        <h1>Today I Learned</h1>
      </div>
      <button className="btn btn-large shareAFact">Share a fact</button>
    </header>
  );
}

export default App;

// function App() {
//   return <h1>Hello World!</h1>;
// }

// export default App;
