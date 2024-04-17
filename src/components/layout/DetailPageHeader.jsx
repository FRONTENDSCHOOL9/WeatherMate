import Button from '@components/layout/Button';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';

DetailPageHeader.propTypes = {
  title: PropTypes.string,
};

function DetailPageHeader({ title }) {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <Button onClick={handleGoBack} className="absolute left-6 top-10">
        <FaArrowLeft className="text-2xl" />
      </Button>
      <div className="px-5 box-border flex flex-col">
        <div className="p-5 border-b-4 text-center mt-4 grow">
          <h1 className="inline-block font-bold text-xl">{title}</h1>
        </div>
      </div>
    </>
  );
}

export default DetailPageHeader;
