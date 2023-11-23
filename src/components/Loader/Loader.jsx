import React, { Component } from 'react';
import { LoaderDiv } from './Loader.styled';
import { Circles } from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <LoaderDiv>
        <Circles
          height="120"
          width="120"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </LoaderDiv>
    );
  }
}
