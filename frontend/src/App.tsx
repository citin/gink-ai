import './App.css'
// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Thread from './components/Thread'

// Hooks
import useThreadsQuery from './hooks/useThreadsQuery'

function App() {
  const { threads, isLoading, currentThread, setCurrentThread } = useThreadsQuery()

  return (
    <div className="drawer lg:drawer-open" data-theme="cupcake">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />

        <div className="p-6 flex flex-col h-[calc(100vh-64px)]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">Loading...</div>
          ) : (
            <Thread currentThread={currentThread} />
          )}
        </div>
      </div>
      <Sidebar threads={threads} currentThread={currentThread} setCurrentThread={setCurrentThread} />
    </div>
  )
}

export default App
