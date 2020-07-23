import React from 'react';
import { View } from 'react-native';

import noticeImg from '../../../../doc/twitterImg.jpg'

import { 
    NoticeContainer,
    Header,
    TwitterInfo,
    TwitterName,
    TwitterArroba,
    Data,
    NoticiaText,
    Imagem,
} from './styles';

function newNoticias({ data }){
    let twitterImage = null

    if(data.hasOwnProperty('extended_entities')){
        twitterImage = data.extended_entities.media[0].media_url;
    } 

  return (
    <NoticeContainer>
        <Header>
            <TwitterInfo>
                <TwitterName>
                    {data.user.name}
                </TwitterName>
                <TwitterArroba>
                    @{data.user.screen_name}   
                </TwitterArroba>
            </TwitterInfo>
            <Data>
                16/06/19
            </Data>
        </Header>
        <NoticiaText>
            {data.text} 
        </NoticiaText>
        {twitterImage ? (
          <Imagem
            source={{
              uri: twitterImage,
            }}
          />
        ) :
            null
        }
    </NoticeContainer>
  );
}

export default newNoticias;