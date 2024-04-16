import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
const { Kakao } = window;

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
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
