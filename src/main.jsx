import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store/store'
import 'modern-normalize/modern-normalize.css'
import { Home, Data, Profile } from './pages'
import { paths } from './constants'

const router = createBrowserRouter([
  {
    element: <Home />,
    path: paths.home,
  },
  {
    element: <Data />,
    path: paths.data,
  },
  {
    element: <Profile />,
    path: paths.profile,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
