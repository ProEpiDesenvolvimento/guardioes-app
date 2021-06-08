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

import translate from '../../../../locales/i18n'
import { redirectAlert } from '../../../utils/consts'

const NoticiasComponent = ({ data }) => {
    const date = moment(data.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY').format('DD/MM/YY')

    return (
        <Button
            onPress={() =>
                redirectAlert(
                    translate('news.openBrowser'),
                    translate('news.twitter'),
                    `https://twitter.com/${data.screen_name}/status/${data.id_str}`
                )
            }
        >
            <NoticiaContainer>
                <Header>
                    <TwitterInfo>
                        <TwitterName>{data.name}</TwitterName>
                        <TwitterHandle>@{data.screen_name}</TwitterHandle>
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
            </NoticiaContainer>
        </Button>
    )
}

export default NoticiasComponent
