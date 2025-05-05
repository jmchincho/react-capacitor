
import './App.css'
// import Notification from "./components/Notification.tsx";
// import DialogComponent from "./components/Dialog.tsx";
//
// import ToastComponent from "./components/Toast.tsx";
// import ActionComponent from "./components/Action.tsx";
import InAppPurchase from "./components/InAppPurcharse.tsx";
import VideoPlayer from "./components/Video.tsx";

function App() {

  return (
      <>
          <div className="App">
              {/*<header className="App-header">*/}
              {/*    <h3>Vidstack con Capacitor</h3>*/}
              {/*    <VideoPlayer urlVideo={'https://s3.eu-central-2.wasabisys.com/appgymi/muy_pronto.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=LH25UESE9ZHA0MD5RBIT%2F20250501%2Feu-central-2%2Fs3%2Faws4_request&X-Amz-Date=20250501T223006Z&X-Amz-Expires=43200&X-Amz-Signature=6ca413b735af30d76ed2d49fa7a655e3085545f3906d01e007979a65f08fad0e&X-Amz-SignedHeaders=host&x-id=GetObject'}*/}
              {/*                 urlPoster={'https://i.ytimg.com/vi_webp/FeR-4_Opt-g/maxresdefault.webp'}*/}
              {/*                 title={''}*/}
              {/*                 posterAlt={''}/>*/}
              {/*</header>*/}
              {/*<header className="App-header">*/}
              {/*    <h3>Notificaciones Locales con Capacitor</h3>*/}
              {/*    <Notification/>*/}
              {/*</header>*/}
              {/*<header className="App-header">*/}
              {/*    <h3>Capacitor Dialog Example</h3>*/}
              {/*    <DialogComponent/>*/}
              {/*</header>*/}
              {/*<header className="App-header">*/}
              {/*    <h3>Capacitor Toast Example</h3>*/}
              {/*    <ToastComponent/>*/}
              {/*</header>*/}
              {/*<header className="App-header">*/}
              {/*    <h3>Capacitor Action Example</h3>*/}
              {/*    <ActionComponent/>*/}
              {/*</header>*/}

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
