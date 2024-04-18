import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';
import Button from '@components/layout/Button';

Search.propTypes = {
  onClick: PropTypes.func
};

function Search({ onClick }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="pt-3 px-5 box-border">
      <div className='flex justify-end gap-2'>
        <input
          className="w-32 h-8 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          type="text"
          value={keyword}
          onChange={handleChange}
        />
        <Button 
          className="bg-gray-500 w-8 h-8 border rounded flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            onClick(keyword);
          }}
        >
          <IoSearch className="text-2xl"/>
        </Button>
      </div>
    </form>
  );
}

export default Search;