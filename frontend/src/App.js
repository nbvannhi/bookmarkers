import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import SignUp from "./user-auth/SignUp"
import SignIn from "./user-auth/SignIn"
import "./style.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div> This is Home! </div>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App
