import { Component } from 'react';
import { Header } from './Searchbar.styled';

export class Searchbar extends Component {
  state = { input: '' };

  onType = e => {
    const field = e.target.name;
    const value = e.target.value;

    this.setState({ [field]: value });
  };

  render() {
    return (
      <Header className="searchbar">
        <form className="SearchForm" onSubmit={this.props.onSubmit}>
          <button type="submit" className="SearchForm-button" name="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="input"
            value={this.state.input || ''}
            onChange={this.onType}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </Header>
    );
  }
}
