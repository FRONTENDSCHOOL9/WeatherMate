import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Suspense fallback="Loading..">
            <RouterProvider router={router} />
          </Suspense>
        </RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
