import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { SeachBar, SearchForm, Btn, Input } from './Searchbar.styled';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchName = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SeachBar>
      <SearchForm onSubmit={handleSubmit}>
        <Btn type="submit">
          <AiOutlineSearch size="25px" />
        </Btn>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchName}
        />
      </SearchForm>
    </SeachBar>
  );
};
