import React from 'react';

import noticeImg from '../../../../doc/twitterImg.jpg'

import { 
    Container, 
    ScrollNoticias, 
    NoticiasTitle, 
    FeedTitle,
    NoticeContainer,
    Header,
    TwitterInfo,
    TwitterName,
    TwitterArroba,
    Data,
    NoticiaText,
    Imagem,
} from './styles';

export default function newNoticias() {
  return (
      <>
        <Container>
            <ScrollNoticias>
                <NoticiasTitle>
                    Notícias
                </NoticiasTitle>
                <FeedTitle>
                    Feed RSS do Guardiões
                </FeedTitle>
                <NoticeContainer>
                    <Header>
                        <TwitterInfo>
                            <TwitterName>
                                Guardiões da Saúde
                            </TwitterName>
                            <TwitterArroba>
                                @guardioesunb   
                            </TwitterArroba>
                        </TwitterInfo>
                        <Data>
                            16/06/19
                        </Data>
                    </Header>
                    <NoticiaText>
                        Nós somos uma aplicação para dispositivos móveis gratuita, 
                        que tem o... 
                    </NoticiaText>
                    <Imagem source={noticeImg} />
                </NoticeContainer>
                <NoticeContainer>
                    <Header>
                        <TwitterInfo>
                            <TwitterName>
                                Guardiões da Saúde
                            </TwitterName>
                            <TwitterArroba>
                                @guardioesunb   
                            </TwitterArroba>
                        </TwitterInfo>
                        <Data>
                            16/06/19
                        </Data>
                    </Header>
                    <NoticiaText>
                        Nós somos uma aplicação para dispositivos móveis gratuita, 
                        que tem o... 
                    </NoticiaText>
                    <Imagem source={noticeImg} />
                </NoticeContainer>
                <NoticeContainer>
                    <Header>
                        <TwitterInfo>
                            <TwitterName>
                                Guardiões da Saúde
                            </TwitterName>
                            <TwitterArroba>
                                @guardioesunb   
                            </TwitterArroba>
                        </TwitterInfo>
                        <Data>
                            16/06/19
                        </Data>
                    </Header>
                    <NoticiaText>
                        Nós somos uma aplicação para dispositivos móveis gratuita, 
                        que tem o... 
                    </NoticiaText>
                    <Imagem source={noticeImg} />
                </NoticeContainer>
                <NoticeContainer>
                    <Header>
                        <TwitterInfo>
                            <TwitterName>
                                Guardiões da Saúde
                            </TwitterName>
                            <TwitterArroba>
                                @guardioesunb   
                            </TwitterArroba>
                        </TwitterInfo>
                        <Data>
                            16/06/19
                        </Data>
                    </Header>
                    <NoticiaText>
                        Nós somos uma aplicação para dispositivos móveis gratuita, 
                        que tem o... 
                    </NoticiaText>
                    <Imagem source={noticeImg} />
                </NoticeContainer>
                <NoticeContainer>
                    <Header>
                        <TwitterInfo>
                            <TwitterName>
                                Guardiões da Saúde
                            </TwitterName>
                            <TwitterArroba>
                                @guardioesunb   
                            </TwitterArroba>
                        </TwitterInfo>
                        <Data>
                            16/06/19
                        </Data>
                    </Header>
                    <NoticiaText>
                        Nós somos uma aplicação para dispositivos móveis gratuita, 
                        que tem o... 
                    </NoticiaText>
                    <Imagem source={noticeImg} />
                </NoticeContainer>
                <NoticeContainer>
                    <Header>
                        <TwitterInfo>
                            <TwitterName>
                                Guardiões da Saúde
                            </TwitterName>
                            <TwitterArroba>
                                @guardioesunb   
                            </TwitterArroba>
                        </TwitterInfo>
                        <Data>
                            16/06/19
                        </Data>
                    </Header>
                    <NoticiaText>
                        Nós somos uma aplicação para dispositivos móveis gratuita, 
                        que tem o... 
                    </NoticiaText>
                    <Imagem source={noticeImg} />
                </NoticeContainer>
            </ScrollNoticias>
        </Container>
      </>
  );
}
