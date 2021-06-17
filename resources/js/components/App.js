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
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(
    () => setPageLoading(false)
  )

  if (pageLoading) {
    return (
      <div>Loading</div>
    )
  } else if (!pageLoading) {
    return (
      <div>Bank Sampah Loaded</div>
    )
  }
}


export default App;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Example />, document.getElementById('app'));
// }