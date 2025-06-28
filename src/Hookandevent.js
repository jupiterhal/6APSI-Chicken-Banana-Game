import { useState } from "react";

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, SetCount] = useState(0);

  function handleClick() {
    SetCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={handleClick}>Click me for <b>FEMBOYS</b></button>
    </div>
  );
}

export default App;
