import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

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

import { useUser } from '../../../hooks/user'
import { getGroupTwitter } from '../../../api/groups'
import { getGroupTweets } from '../../../api/twitter'

const posts = 10

const Noticias = () => {
    const { token, data, app } = useUser()

    const [isLoading, setLoading] = useState(true)
    const [groupTwitter, setGroupTwitter] = useState(null)
    const [twitterOption, setTwitterOption] = useState('')
    const [length, setLength] = useState(posts)
    const [tweets, setTweets] = useState([])
    const [filteredTweets, setFilteredTweets] = useState([])

    // Get group twitter from user
    const fetchGroupTwitter = async () => {
        if (data.group_id !== null) {
            const response = await getGroupTwitter(data.group_id, token)

            if (response.status === 200) {
                setGroupTwitter(response.body.twitter)

                if (response.body.twitter) {
                    setTwitterOption(response.body.twitter)
                } else {
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
        setLoading(true)
        setLength(posts)

        const twitter = {
            username: twitterOption,
        }

        const response = await getGroupTweets(twitter, token)

        if (response.status === 200) {
            setTweets(response.body.twitter_api.tweets)
            setFilteredTweets(response.body.twitter_api.tweets.slice(0, posts))
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchGroupTwitter()
    }, [])

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
                            <NoticiasTitle>Notícias</NoticiasTitle>
                            <FeedTitle>Feed RSS do Guardiões</FeedTitle>

                            {groupTwitter !== null ? (
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
                        setLength(length + 2)
                        setFilteredTweets(tweets.slice(0, length))
                    }}
                    onEndReachedThreshold={0.9}
                />
            </Container>
        </>
    )
}

export default Noticias
