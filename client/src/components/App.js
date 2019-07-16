import React from 'react';
import InputBar from './InputBar';
import MessageList from './MessageList';

function App() {
  const logo = require('../paper-plane.png');
  return (
    <div className="App">


      <InputBar />
      <MessageList />
      <div className ="Credit"> Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    </div>
  );
}

// <div class="planes" aria-hidden="true">
//   <div class="snowflake">
//     <img src={logo} className="imgPlane" alt="paper plane icon"/>
//   </div>
//   <div class="snowflake">
//     <img src={logo} className="imgPlane" alt="paper plane icon"/>
//   </div>
//   <div class="snowflake">
//     <img src={logo} className="imgPlane" alt="paper plane icon"/>
//   </div>
//   <div class="snowflake">
//     <img src={logo} className="imgPlane" alt="paper plane icon"/>
//   </div>
//   <div class="snowflake">
//     <img src={logo} className="imgPlane" alt="paper plane icon"/>
//   </div>
// </div>
export default App;
