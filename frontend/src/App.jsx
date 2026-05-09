// import Home from "./pages/Home";
// import LeadCapture from "./components/LeadCapture";
// function App() {
//   return <Home />;
// }
// <LeadCapture />
// export default App;

import React from "react";
import SpendForm from "./components/SpendForm";
import LeadCapture from "./components/LeadCapture";

function App() {
  return (
    <div>
      <SpendForm />

      <LeadCapture />
    </div>
  );
}

export default App;