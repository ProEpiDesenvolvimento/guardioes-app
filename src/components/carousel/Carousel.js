import React, { Component } from 'react';
import Carousel from 'react-native-smart-carousel';
import { Dimensions } from 'react-native';
import * as Imagem from '../../imgs/imageConst';
import { verticalScale } from '../scallingUtils';

let {height, width} = Dimensions.get('window');

const dataCarousel = [
    {
      "id": 1,
      "title": "Primeira imagem",
      "imagePath": Imagem.imagemLogo,
    },
    {
      "id": 2,
      "title": "Segunda imagem",
      "imagePath": Imagem.imagemLogo,
    },
    {
      "id": 3,
      "title": "Terceira imagem",
      "imagePath": Imagem.imagemLogo,
    },
    {
      "id": 4,
      "title": "Quarta imagem",
      "imagePath": Imagem.imagemLogo,
    },
    {
      "id": 5,
      "title": "Quinta imagem",
      "imagePath": Imagem.imagemLogo,
    }
];

class CarouselImagens extends Component {
  render() {
    return (
        <Carousel
    	    navigation={true}
            navigatioType={'dots'}
            navigationColor={'#CD853F'}
            data={dataCarousel}
            height={height - verticalScale(150)}
        />
    );
  }
}

export default CarouselImagens;
