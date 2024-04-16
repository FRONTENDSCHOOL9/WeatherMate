import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import Loading from './components/layout/Loading';
const { Kakao } = window;

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init('44ca17bb4cb74c64db42d774cc78f8af');
    }
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
        </RecoilRoot>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
