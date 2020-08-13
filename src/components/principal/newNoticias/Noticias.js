import React from 'react';
import { format } from 'date-fns'

import { Redirect } from '../../../utils/constUtils';

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

function newNoticias({ data }){
    const date = format(new Date(data.created_at), 'dd/MM/yy') 
    return (
        <Button
            onPress={() => Redirect(
                "Deseja abrir o Navegador?", "Você será redirecionado para twitter.com",
                `https://twitter.com/${data.screen_name}/status/${data.id_str}`
            )}
        >
            <NoticeContainer>
                <Header>
                    <TwitterInfo>
                        <TwitterName>
                            {data.name}
                        </TwitterName>
                        <TwitterArroba>
                            @{data.screen_name}   
                        </TwitterArroba>
                    </TwitterInfo>
                    <Data>
                        {date}
                    </Data>
                </Header>
                <NoticiaText>
                    {`${data.text.substring(0, 70)}...`} 
                </NoticiaText>
                {data.images[0] ? (
                <Imagem
                    source={{
                        uri: data.images[0],
                    }}
                />
                ) :
                    null
                }
            </NoticeContainer>
        </Button>
    );
}

export default newNoticias;