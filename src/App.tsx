
import './App.css'
import Notification from "./components/Notification.tsx";
import DialogComponent from "./components/Dialog.tsx";

import ToastComponent from "./components/Toast.tsx";
// import VideoPlayer from "./components/Video.tsx";

function App() {

  return (
      <>
          <div className="App">
              {/*<header className="App-header">*/}
              {/*    <h3>Vidstack con Capacitor</h3>*/}
              {/*    <VideoPlayer/>*/}
              {/*</header>*/}
              <header className="App-header">
                  <h3>Notificaciones Locales con Capacitor</h3>
                  <Notification/>
              </header>
              <header className="App-header">
                  <h3>Capacitor Dialog Example</h3>
                  <DialogComponent/>
              </header>
              <header className="App-header">
                  <h3>Capacitor Toast Example</h3>
                  <ToastComponent/>
              </header>
          </div>
      </>
  )
}

export default App
