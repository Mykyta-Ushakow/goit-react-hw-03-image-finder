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

  handleSearch = async e => {
    e.preventDefault();
    this.setState({ showLoad: true, showBtn: false, page: 1 });

    const q = e.target.elements.input.value;

    try {
      const imags = await fetchImages({ q });
      this.setState(prevState => ({
        items: imags.hits,
        showBtn: true,
        querry: q,
        page: prevState.page + 1,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ showLoad: false });
    }
  };

  handleLoadMore = async e => {
    e.preventDefault();
    this.setState({ showLoad: true, showBtn: false });

    try {
      const imags = await fetchImages({
        q: this.state.querry,
        page: this.state.page,
      });

      this.setState(prev => ({
        page: prev.page + 1,
        items: [...prev.items, ...imags.hits],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ showLoad: false, showBtn: true });
    }
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
