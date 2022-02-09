import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'

import ScreenLoader from '../../../components/ScreenLoader'
import NoticiasComponent from './NoticiasComponent'
import {
    Container,
    NoticiasList,
    NoticiasTitle,
    FeedTitle,
    TwitterOption,
    OptionLeft,
    OptionRight,
    OptionText,
} from './styles'

import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { getUserGroupTwitter } from '../../../api/groups'
import { getGroupTweets } from '../../../api/twitter'

const posts = 10

const Noticias = () => {
    const { token, user, app } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [groupTwitter, setGroupTwitter] = useState(null)
    const [twitterOption, setTwitterOption] = useState('')
    const [length, setLength] = useState(posts)
    const [tweets, setTweets] = useState([])
    const [filteredTweets, setFilteredTweets] = useState([])

    // Get group twitter from user
    const getGroupTwitter = async () => {
        if (user.group_id) {
            const response = await getUserGroupTwitter(user.group_id, token)

            if (response.status === 200) {
                setGroupTwitter(response.data.twitter)

                if (
                    response.data.twitter &&
                    response.data.twitter !== app.twitter
                ) {
                    setTwitterOption(response.data.twitter)
                } else {
                    setGroupTwitter(null)
                    setTwitterOption(app.twitter)
                }
            } else {
                setGroupTwitter(null)
                setTwitterOption(app.twitter)
            }
        } else {
            setTwitterOption(app.twitter)
        }
    }

    // Get tweets to show
    const fetchTweets = async () => {
        setLength(posts)

        const twitter = {
            username: twitterOption,
        }

        const response = await getGroupTweets(twitter, token)

        if (response.status === 200) {
            setTweets(response.data.twitter_api.tweets)
            setFilteredTweets(response.data.twitter_api.tweets.slice(0, posts))
        }

        setIsLoading(false)
    }

    useEffect(() => {
        getGroupTwitter()
    }, [user.group_id, app.twitter])

    useEffect(() => {
        if (twitterOption !== '') {
            fetchTweets()
        }
    }, [twitterOption])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#348EAC' }} />
            <Container>
                <NoticiasList
                    ListHeaderComponent={
                        <>
                            <NoticiasTitle>
                                {translate('news.title')}
                            </NoticiasTitle>
                            <FeedTitle>{translate('news.subtitle')}</FeedTitle>

                            {groupTwitter ? (
                                <TwitterOption>
                                    <OptionLeft
                                        onPress={() => {
                                            setTwitterOption(app.twitter)
                                        }}
                                        selected={twitterOption === app.twitter}
                                    >
                                        <OptionText>{app.twitter}</OptionText>
                                    </OptionLeft>
                                    <OptionRight
                                        onPress={() => {
                                            setTwitterOption(groupTwitter)
                                        }}
                                        selected={
                                            twitterOption === groupTwitter
                                        }
                                    >
                                        <OptionText>{groupTwitter}</OptionText>
                                    </OptionRight>
                                </TwitterOption>
                            ) : null}
                        </>
                    }
                    data={filteredTweets}
                    keyExtractor={(tweet) => tweet.id_str}
                    renderItem={({ item }) => <NoticiasComponent data={item} />}
                    onEndReached={() => {
                        const newLenght = length + 4
                        setLength(newLenght)
                        setFilteredTweets(tweets.slice(0, newLenght))
                    }}
                    onEndReachedThreshold={0.9}
                />
            </Container>
        </>
    )
}

export default Noticias
