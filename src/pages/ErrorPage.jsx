import Footer from '@/components/layout/Footer';

function ErrorPage() {
  return (
    <nav className='min-h-screen sm:min-h-screen lg:min-h-screen flex flex-col'>
      <div className="flex flex-col items-center justify-center sm:px-8 md:px-60 lg:px-96 bg-slate-200 flex-grow px-10">
        <div className="bg-white rounded-3xl container md:min-w-full min-w-60 max-w-80">
          <div className='text-center p-6 md:p-8 min-w-86'>
            <div className="flex flex-col items-center justify-center">
              <img className='w-60 md:w-48 mx-auto mb-4 md:mb-6 lg:w-96' src="/error.svg" alt="Error" />
              <h1 className="text-lg md:text-2xl font-semibold pt-3 pb-4 font-TTLaundryGothicB m-0">Page not Found</h1>
              <p className="text-sm md:text-base text-gray-600 pt-3 pb-2 font-normal m-0">서버와의 통신이 원활하지 않아<br/>데이터를 불러올 수 없습니다</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </nav>
  );
}

export default ErrorPage;
