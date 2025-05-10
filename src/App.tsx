
import './App.css'
// import Notification from "./components/Notification.tsx";
// import DialogComponent from "./components/Dialog.tsx";
//
// import ToastComponent from "./components/Toast.tsx";
// import ActionComponent from "./components/Action.tsx";
import InAppPurchase from "./components/InAppPurcharse.tsx";

function App() {

  return (
      <>
          <div className="App">

              <div>
                  <button>Subcription</button>
              </div>

              <header className="App-header">
                  <h3>InAppPurchase</h3>
                  <InAppPurchase />
              </header>
          </div>
      </>
  )
}

export default App
