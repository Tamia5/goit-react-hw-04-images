import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { SeachBar, SearchForm, Btn, Input } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchName = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SeachBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <Btn type="submit">
            <AiOutlineSearch size="25px" />
          </Btn>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleSearchName}
          />
        </SearchForm>
      </SeachBar>
    );
  }
}
