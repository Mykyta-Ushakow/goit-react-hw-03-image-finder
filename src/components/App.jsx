import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { AppDiv } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'api/pixabay';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    items: [],
    querry: '',
    page: 1,
    selectedImage: '',
    showBtn: false,
    showLoad: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      (this.state.querry !== prevState.querry && this.state.page === 1) ||
      (this.state.querry === prevState.querry &&
        this.state.page !== prevState.page)
    ) {
      if (this.state.page === 1) {
        this.searchService();
      } else {
        this.loadMoreService();
      }
    }
  }

  searchService = async () => {
    this.setState({ showLoad: true, showBtn: false });

    const q = this.state.querry;

    try {
      const imags = await fetchImages({ q });
      this.setState({ items: imags.hits, showBtn: imags.hits.length >= 15 });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ showLoad: false });
    }
  };

  handleSearch = e => {
    e.preventDefault();

    const q = e.target.elements.input.value;

    this.setState({
      querry: q,
      page: 1,
    });
  };

  loadMoreService = async () => {
    this.setState({ showLoad: true, showBtn: false });
    try {
      const imags = await fetchImages({
        q: this.state.querry,
        page: this.state.page,
      });
      this.setState(prev => ({
        items: [...prev.items, ...imags.hits],
        showBtn: imags.hits.length >= 15,
      }));
    } catch (err) {
      console.log('Error in loadMoreService:', err);
    } finally {
      this.setState({ showLoad: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleOpenModal = imageUrl => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    return (
      <AppDiv>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          items={this.state.items}
          onOpenModal={this.handleOpenModal}
        />
        {this.state.showLoad && <Loader />}
        {this.state.showBtn && <Button onClick={this.handleLoadMore} />}
        {this.state.showModal && (
          <Modal
            imageUrl={this.state.selectedImage}
            onClose={this.handleCloseModal}
          />
        )}
      </AppDiv>
    );
  }
}
