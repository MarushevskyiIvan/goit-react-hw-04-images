import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Searchbar,
} from './Search.styled';

export const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChange = evt => {
    const { value } = evt.currentTarget;

    setName(value);
  };

  const formSubmit = evt => {
    evt.preventDefault();
    onSubmit(name);
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={formSubmit}>
        <SearchFormButton type="submit">
          <span>
            <FcSearch />
          </span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          placeholder="Search images and photos"
          name="name"
          onChange={handleChange}
        />
      </SearchForm>
    </Searchbar>
  );
};
