import React from 'react';
import moment from 'moment';
import translate from '../../../../locales/i18n';

import {Redirect} from '../../../utils/constUtils';

import {
  NoticeContainer,
  Header,
  TwitterInfo,
  TwitterName,
  TwitterArroba,
  Data,
  NoticiaText,
  Imagem,
  Button,
} from './styles';

function NoticiasComponent({data}) {
  const date = moment(new Date(data.created_at)).format('DD/MM/YY');
  return (
    <Button
      onPress={() =>
        Redirect(
          translate('news.openBrowser'),
          translate('news.twitter'),
          `https://twitter.com/${data.screen_name}/status/${data.id_str}`,
        )
      }>
      <NoticeContainer>
        <Header>
          <TwitterInfo>
            <TwitterName>{data.name}</TwitterName>
            <TwitterArroba>@{data.screen_name}</TwitterArroba>
          </TwitterInfo>
          <Data>{date}</Data>
        </Header>
        <NoticiaText>{`${data.text.substring(0, 70)}...`}</NoticiaText>
        {data.images[0] ? (
          <Imagem
            source={{
              uri: data.images[0],
            }}
          />
        ) : null}
      </NoticeContainer>
    </Button>
  );
}

export default NoticiasComponent;
