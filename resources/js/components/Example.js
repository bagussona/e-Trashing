import React from 'react';
// import ReactDOM from 'react-dom';
// import '../../css/app.css';

function Example() {
    return (
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0">
          {/* <img className="h-12 w-12" alt="ChitChat Logo"/> */}
        </div>
        <div>
          <div className="text-xl font-medium text-black">Test</div>
          <p className="text-gray-500">You have a new message!</p>
        </div>
      </div>
    );
}

export default Example;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Example />, document.getElementById('app'));
// }