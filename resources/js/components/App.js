// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../../css/app.css';

// function Example() {
//     return (
//       <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
//         <div className="flex-shrink-0">
//           {/* <img className="h-12 w-12" alt="ChitChat Logo"/> */}
//         </div>
//         <div>
//           <div className="text-xl font-medium text-black">Ashiapp</div>
//           <p className="text-gray-500">Edit</p>
//         </div>
//       </div>
//     );
// }
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}


export default App;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Example />, document.getElementById('app'));
// }