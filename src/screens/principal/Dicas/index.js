import React, { useCallback, useState } from 'react'
import { SafeAreaView, TouchableOpacity, Modal } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import Feather from 'react-native-vector-icons/Feather'
import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    ScrollViewStyled,
    TitleWrapper,
    Title,
    SubTitle,
    AdvicesView,
    Touch,
    Advice,
    AdviceTitle,
    AdviceIcon,
    DetailsContainer,
    Details,
    DetailsIcon,
    DetailsTitleWrapper,
    DetailsTitle,
    DetailsBodyText,
    DetailsSeeMore,
    DetailsButton,
    DetailsButtonLabel,
} from './styles'

import translate from '../../../../locales/i18n'
import {
    BedIcon,
    DoctorIcon,
    GermIcon,
    HelplineIcon,
    HomeworkIcon,
    HospitalIcon,
    InsectIcon,
    MaskIcon,
    NoFlightIcon,
    ProtectionIcon,
    SickIcon,
    TentIcon,
    ThermometerIcon,
    VaccineIcon,
    VirusIcon,
    WashIcon,
} from '../../../img/imageConst'
import { redirectAlert } from '../../../utils/consts'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { getContents } from '../../../api/contents'

const Dicas = () => {
    const { isOffline, token, getCacheData, storeCacheData } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [contents, setContents] = useState([])
    const [contentSelected, setContentSelected] = useState({})

    useFocusEffect(
        useCallback(() => {
            getAppContents()
        }, [isOffline])
    )

    const sortContents = (contents = []) => {
        contents.sort(
            (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
        )
        return contents
    }

    const getAppContents = async () => {
        if (!isOffline) {
            const response = await getContents(token)

            if (response.status === 200) {
                const appContents = sortContents(response.data.contents)
                setContents(appContents)
                setIsLoading(false)

                await storeCacheData('contentsData', appContents)
            }
        } else {
            const contentsCache = await getCacheData('contentsData', false)

            if (contentsCache) {
                setContents(contentsCache)
            }
            setIsLoading(false)
        }
    }

    const getContentIcon = (icon) => {
        const size = scale(50)

        switch (icon) {
            case 'bed':
                return <BedIcon height={size} width={size} />
            case 'doctor':
                return <DoctorIcon height={size} width={size} />
            case 'germ':
                return <GermIcon height={size} width={size} />
            case 'helpline':
                return <HelplineIcon height={size} width={size} />
            case 'homework':
                return <HomeworkIcon height={size} width={size} />
            case 'hospital':
                return <HospitalIcon height={size} width={size} />
            case 'insect':
                return <InsectIcon height={size} width={size} />
            case 'mask':
                return <MaskIcon height={size} width={size} />
            case 'no-flight':
                return <NoFlightIcon height={size} width={size} />
            case 'protection':
                return <ProtectionIcon height={size} width={size} />
            case 'sick':
                return <SickIcon height={size} width={size} />
            case 'tent':
                return <TentIcon height={size} width={size} />
            case 'thermometer':
                return <ThermometerIcon height={size} width={size} />
            case 'vaccine':
                return <VaccineIcon height={size} width={size} />
            case 'virus':
                return <VirusIcon height={size} width={size} />
            case 'wash':
                return <WashIcon height={size} width={size} />
            default:
                return <SickIcon height={size} width={size} />
        }
    }

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#348EAC' }} />
            <Container>
                <ScrollViewStyled>
                    <TitleWrapper>
                        <Title>{translate('advices.title')}</Title>
                        <SubTitle>{translate('advices.subtitle')}</SubTitle>
                    </TitleWrapper>

                    <AdvicesView>
                        {contents.map((content) => (
                            <Touch
                                key={content.id}
                                onPress={() => {
                                    if (content.content_type === 'redirect') {
                                        redirectAlert(
                                            advicesText.redirect.title,
                                            advicesText.redirect.text,
                                            content.source_link
                                        )
                                    } else {
                                        setContentSelected({
                                            title: content.title,
                                            body: content.body,
                                            source_link: content.source_link,
                                        })
                                        setModalVisible(true)
                                    }
                                }}
                            >
                                <Advice>
                                    <AdviceTitle numberOfLines={3}>
                                        {content.title}
                                    </AdviceTitle>
                                    <AdviceIcon>
                                        {getContentIcon(content.icon)}
                                    </AdviceIcon>
                                </Advice>
                            </Touch>
                        ))}
                        {contents.length === 0 ? (
                            <Touch>
                                <Advice>
                                    <AdviceTitle numberOfLines={3}>
                                        {translate('advices.empty')}
                                    </AdviceTitle>
                                    <AdviceIcon>
                                        {getContentIcon('virus')}
                                    </AdviceIcon>
                                </Advice>
                            </Touch>
                        ) : null}
                    </AdvicesView>
                </ScrollViewStyled>

                <Modal
                    animationType='fade'
                    transparent
                    visible={modalVisible}
                    onRequestClose={
                        () => setModalVisible(!modalVisible) // Exit to modal view
                    }
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        <DetailsContainer>
                            <Details>
                                <DetailsIcon>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Feather
                                            name='arrow-left-circle'
                                            size={scale(35)}
                                            color='#348eac'
                                        />
                                    </TouchableOpacity>
                                </DetailsIcon>

                                <DetailsTitleWrapper>
                                    <DetailsTitle>
                                        {contentSelected.title}
                                    </DetailsTitle>
                                </DetailsTitleWrapper>

                                <DetailsBodyText>
                                    {contentSelected.body}
                                </DetailsBodyText>
                            </Details>

                            <DetailsSeeMore>
                                <DetailsButton
                                    onPress={() =>
                                        redirectAlert(
                                            translate('advices.moreInformations'),
                                            translate('advices.redirectPermission'),
                                            contentSelected.source_link
                                        )
                                    }
                                >
                                    <DetailsButtonLabel>
                                        {translate('advices.more')}
                                    </DetailsButtonLabel>
                                </DetailsButton>
                            </DetailsSeeMore>
                        </DetailsContainer>
                    </SafeAreaView>
                </Modal>
            </Container>
        </>
    )
}

const advicesText = {
    redirect: {
        title: translate('advices.buttons.messages.title'),
        text: translate('advices.buttons.messages.subtitle'),
    },
}

export default Dicas
