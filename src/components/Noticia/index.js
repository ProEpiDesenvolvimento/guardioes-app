import React from 'react'
import moment from 'moment'

import {
    NoticiaContainer,
    Header,
    TwitterInfo,
    TwitterName,
    TwitterHandle,
    Data,
    NoticiaText,
    Imagem,
    Button,
} from './styles'

import translate from '../../../locales/i18n'
import { redirectAlert } from '../../utils/consts'

const Noticia = ({ item }) => {
    const date = moment(item.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY').format('DD/MM/YY')

    return (
        <Button
            onPress={() =>
                redirectAlert(
                    translate('news.openBrowser'),
                    translate('news.twitter'),
                    `https://twitter.com/${item.screen_name}/status/${item.id_str}`
                )
            }
        >
            <NoticiaContainer>
                <Header>
                    <TwitterInfo>
                        <TwitterName>{item.name}</TwitterName>
                        <TwitterHandle>@{item.screen_name}</TwitterHandle>
                    </TwitterInfo>
                    <Data>{date}</Data>
                </Header>
                <NoticiaText>{`${item.text.substring(0, 70)}...`}</NoticiaText>
                {item.images[0] ? (
                    <Imagem
                        source={{
                            uri: item.images[0],
                        }}
                    />
                ) : null}
            </NoticiaContainer>
        </Button>
    )
}

export default Noticia
