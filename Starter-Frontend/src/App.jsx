import AppComponant from "./app/App"
import Providers from "./app/providers";
// import Modal_Test from "./components/ui/Modal_Test";
function App() {
  return (
    <>
      <Providers>
        <AppComponant />
      </Providers>
      {/* <Modal_Test />  */}

    </>
  )
}

export default App
