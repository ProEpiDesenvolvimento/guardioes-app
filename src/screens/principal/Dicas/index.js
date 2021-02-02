import React, { useCallback, useState } from 'react'
import { TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
    Details,
    DetailsIcon,
    DetailsTitleWrapper,
    DetailsTitle,
    DetailsBodyText,
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
import { Redirect } from '../../../utils/constUtils'
import { scale } from '../../../utils/scallingUtils'
import { useUser } from '../../../hooks/user'
import { getContents } from '../../../api/contents'

Feather.loadFont()

const Dicas = () => {
    const { token, app } = useUser()

    const [isLoaded, setIsLoaded] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [contents, setContents] = useState([])
    const [contentSelected, setContentSelected] = useState({})

    useFocusEffect(
        useCallback(() => {
            getAppContents()
        }, [])
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
        const response = await getContents(token)

        if (response.status === 200) {
            const allContents = response.body.contents
            const appContents = allContents.filter((c) => c.app.id === app.id)
            setContents(sortContents(appContents))
        }

        setIsLoaded(true)
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

    if (!isLoaded) {
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
                                        Redirect(
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
                    <SafeAreaView
                        style={{ flex: 1, backgroundColor: '#348EAC' }}
                    >
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

                        <DetailsButton
                            onPress={() =>
                                Redirect(
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
