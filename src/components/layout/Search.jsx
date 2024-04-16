import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';

Search.propTypes = {
  onClick: PropTypes.func,
};

function Search({ onClick }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <form className="absolute right-4 top-8">
      <div className='flex justify-end'>
        <input
          className="w-32 h-6 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          type="text"
          value={keyword}
          onChange={handleChange}
        />
        <button type='submit'
          onClick={(e) => {
            e.preventDefault();
            onClick(keyword);
          }}
        >
          <IoSearch className="text-2xl"/>
        </button>
      </div>
    </form>
  );
}

export default Search;