import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Month from './pages/Month/Month.tsx'
import InitialData from './pages/Month/InitialData/InitialData.tsx'
import Planification from './pages/Month/Planification/Planification.tsx'
import ExpenseTracking from './pages/Month/ExpenseTracking/ExpenseTracking.tsx'
import BudgetTracking from './pages/Month/BudgetTracking/BudgetTracking.tsx'
import Year from './pages/Year/Year.tsx'
import './styles/globals.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/month/:id",
    element: <Month />,
    children: [
      {
        path: "/month/:id/initialData",
        element: <InitialData />
      },
      {
        path: "/month/:id/planification",
        element: <Planification />
      },
      {
        path: "/month/:id/expenseTracking",
        element: <ExpenseTracking />
      },
      {
        path: "/month/:id/budgetTracking",
        element: <BudgetTracking />
      },
    ]
  },
  {
    path: "/year/:id",
    element: <Year />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: false,
    },
  },
});
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
