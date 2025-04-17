// Styles
import './App.css'
import './animations.css'
// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Thread from './components/Thread'

function App() {
  return (
    <div className="drawer lg:drawer-open" data-theme="cupcake">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <div className="p-6 flex flex-col h-[calc(100vh-64px)]">
          <Thread />
        </div>
      </div>

      <Sidebar />
    </div>
  )
}

export default App
