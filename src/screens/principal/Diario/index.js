import React, { useEffect, useCallback, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import { Avatar } from 'react-native-elements'
import { PieChart } from 'react-native-svg-charts'
import { useFocusEffect } from '@react-navigation/native'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    ScrollViewStyled,
    UserData,
    AvatarContainer,
    UserInfo,
    UserName,
    UserDetails,
    UserDash,
    SliderContainer,
    SwiperStyled,
    ChartContainer,
    UserChart,
    LabelContainer,
    LabelWrapper,
    ChartLabelGreen,
    ChartLabelOrange,
    ChartLabelGray,
    ChartLabel,
    ChartTitle,
    Chart,
    CalendarStyled,
    UserReports,
    ReportsTitleWrapper,
    ReportsTitle,
    ReportsSubtitle,
    ReportsWrapper,
    ReportsButton,
    ReportsWell,
    ReportsIll,
    ReportsFull,
    ReportData,
    ReportDataTitle,
    ReportDataInfo,
} from './styles'

import translate from '../../../../locales/i18n'
import { LocaleConfig } from '../../../utils/calendaryMonthNames'
import { scale } from '../../../utils/scalling'
import { HappyIcon, SadIcon, BadgeIcon } from '../../../img/imageConst'
import { getNameParts, handleAvatar, getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { getUserSurveys } from '../../../api/surveys'

LocaleConfig.defaultLocale = translate('lang.code')

const Diario = ({ navigation }) => {
    const {
        isOffline,
        token,
        user,
        surveys,
        storeSurveys,
        getCacheData,
        getCurrentUserInfo,
    } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [personAge, setPersonAge] = useState(12)
    const [datesMarked, setDatesMarked] = useState({})
    const [daysMarked, setDaysMarked] = useState(0)
    const [daysMissing, setDaysMissing] = useState(0)
    const [daysGood, setDaysGood] = useState(0)
    const [daysBad, setDaysBad] = useState(0)
    const [percentGood, setPercentGood] = useState(0)
    const [percentBad, setPercentBad] = useState(0)
    const [percentMissing, setPercentMissing] = useState(100)

    const person = getCurrentUserInfo()

    useFocusEffect(
        useCallback(() => {
            getSurveys()
            getPersonAge()
        }, [isOffline])
    )

    useEffect(() => {
        defineMarkedDates()
    }, [surveys])

    useEffect(() => {
        getUserParticipation()
    }, [daysMarked])

    const getSurveys = async () => {
        if (!isOffline) {
            const response = await getUserSurveys(user.id, token)

            if (response.status === 200) {
                storeSurveys(response.data.surveys)
                setIsLoading(false)
            }
        } else {
            const surveysCache = await getCacheData('surveysData', false)

            if (surveysCache) {
                storeSurveys(surveysCache)
            }
            setIsLoading(false)
        }
    }

    const getPersonAge = () => {
        const todayDate = new Date()
        const birthDate = new Date(person.birthdate)

        birthDate.setHours(0, 0, 0, 0)

        const diff = todayDate.getTime() - birthDate.getTime()
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

        setPersonAge(age)
    }

    const getMarkedWeek = (dateString, markedDates, bad = false) => {
        const date = new Date(`${dateString}T03:00:00.000Z`)
        const dayOfWeek = date.getDay()

        const week = {}

        for (let i = 0; i < 7; i += 1) {
            const diff = i - dayOfWeek
            const otherDate = new Date(date)
            otherDate.setDate(date.getDate() + diff)

            let obj = {}

            switch (i) {
                case 0:
                    obj = {
                        startingDay: true,
                        color: '#5DD39E',
                    }
                    break
                case 6:
                    obj = {
                        endingDay: true,
                        color: '#5DD39E',
                    }
                    break
                default:
                    obj = {
                        color: '#5DD39E',
                    }
            }

            if (diff === 0) {
                obj = {
                    ...obj,
                    selected: true,
                    color: bad ? '#F18F01' : '#5DD39E',
                }

                //if (bad) {
                    console.log(i, diff, bad, otherDate)
                //}
            }

            const dateKey = otherDate.toISOString().slice(0, 10)

            if (!markedDates[dateKey]?.selected) {
                week[dateKey] = obj
            }
        }

        return week
    }

    const defineMarkedDates = () => {
        const datesGood = []
        const datesBad = []
        let markedDatesGood = {}
        let markedDatesBad = {}
        let markedDates = {}
        let date = ''

        surveys.forEach((survey) => {
            if (!person.is_household) {
                if (!survey.household) {
                    if (survey.symptom && survey.symptom.length) {
                        // BadReport
                        date = survey.created_at.split('T', 1).toString()
                        datesBad.push(date)

                        const markedWeek = getMarkedWeek(date, markedDates, true)
                        markedDates = {
                            ...markedDates,
                            ...markedWeek,
                        }
                    } else {
                        // GoodReport
                        date = survey.created_at.split('T', 1).toString()
                        datesGood.push(date)

                        const markedWeek = getMarkedWeek(date, markedDates, false)
                        markedDates = {
                            ...markedDates,
                            ...markedWeek,
                        }
                    }
                }
            } else if (survey.household && survey.household.id === person.id) {
                if (survey.symptom && survey.symptom.length) {
                    // Household BadReport
                    datesBad.push(survey.created_at.split('T', 1).toString())
                } else {
                    // Household GoodReport
                    datesGood.push(survey.created_at.split('T', 1).toString())
                }
            }
        })

        // Object.assign(markedDatesGood, markedDatesBad)
        // console.log('markedDates', markedDates)

        const daysMarked = Object.keys(markedDatesGood).length
        const daysBad = Object.keys(markedDatesBad).length
        const daysGood = daysMarked - daysBad

        setDatesMarked(markedDates)
        setDaysMarked(daysMarked)
        setDaysGood(daysGood)
        setDaysBad(daysBad)
    }

    const getUserParticipation = () => {
        const todayDate = new Date()
        const createdDate = new Date(person.created_at)

        createdDate.setHours(0, 0, 0, 0)

        const diff = todayDate.getTime() - createdDate.getTime()
        const daysTotal = Math.ceil(diff / (1000 * 60 * 60 * 24))
        const daysMissing = daysTotal - daysMarked

        const percentGood = ((daysGood / daysTotal) * 100).toFixed(0)
        const percentBad = ((daysBad / daysTotal) * 100).toFixed(0)
        const percentMissing = ((daysMissing / daysTotal) * 100).toFixed(0)

        setDaysMissing(0)
        setPercentGood(percentGood)
        setPercentBad(percentBad)
        setPercentMissing(0)
    }

    const handleCalendarArrows = (direction) => {
        if (direction === 'left') {
            return (
                <Feather name='chevron-left' size={scale(25)} color='#c4c4c4' />
            )
        }
        return <Feather name='chevron-right' size={scale(25)} color='#c4c4c4' />
    }

    const chartData = [
        {
            key: 1,
            value: daysGood,
            svg: { fill: '#5DD39E' },
            arc: { cornerRadius: 8 },
        },
        {
            key: 2,
            value: daysBad,
            svg: { fill: '#F18F01' },
            arc: { cornerRadius: 8 },
        },
        {
            key: 3,
            value: daysMissing,
            svg: { fill: '#c4c4c4' },
            arc: { cornerRadius: 8 },
        },
    ]

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#348EAC' }} />
            <Container>
                <ScrollViewStyled>
                    <UserData>
                        <AvatarContainer>
                            <Avatar
                                containerStyle={{
                                    borderColor: '#ffffff',
                                    borderWidth: 3,
                                }}
                                size={scale(50)}
                                source={handleAvatar(person.avatar)}
                                title={getInitials(person.name)}
                                rounded
                            />
                        </AvatarContainer>
                        <UserInfo>
                            <UserName>
                                {getNameParts(person.name, true)}
                            </UserName>
                            <UserDetails>
                                {personAge === 1
                                    ? personAge + translate('diary.year')
                                    : personAge + translate('diary.years')}
                            </UserDetails>
                        </UserInfo>
                    </UserData>

                    <UserDash>
                        <SliderContainer>
                            <SwiperStyled showPagination disableGesture={false}>
                                <ChartContainer>
                                    <UserChart>
                                        <CalendarStyled
                                            current={moment().format(
                                                'YYYY-MM-DD'
                                            )}
                                            markingType='period'
                                            markedDates={datesMarked}
                                            renderArrow={(direction) =>
                                                handleCalendarArrows(direction)
                                            }
                                        />
                                    </UserChart>
                                </ChartContainer>
                                <ChartContainer>
                                    <UserChart>
                                        <ChartTitle>
                                            {translate('diary.statisticsTitle')}
                                        </ChartTitle>
                                        <Chart>
                                            <PieChart
                                                style={{
                                                    height: 170,
                                                    marginBottom: scale(12),
                                                }}
                                                outerRadius='100%'
                                                innerRadius='15%'
                                                data={chartData}
                                            />
                                        </Chart>
                                        <LabelContainer>
                                            <View>
                                                <LabelWrapper>
                                                    <ChartLabelGreen />
                                                    <ChartLabel>
                                                        {percentGood}
                                                        {translate(
                                                            'diary.goodPercent'
                                                        )}
                                                    </ChartLabel>
                                                </LabelWrapper>
                                                <LabelWrapper>
                                                    <ChartLabelOrange />
                                                    <ChartLabel>
                                                        {percentBad}
                                                        {translate(
                                                            'diary.badPercent'
                                                        )}
                                                    </ChartLabel>
                                                </LabelWrapper>
                                                <LabelWrapper>
                                                    <ChartLabelGray />
                                                    <ChartLabel>
                                                        {percentMissing}
                                                        {translate(
                                                            'diary.notInformed'
                                                        )}
                                                    </ChartLabel>
                                                </LabelWrapper>
                                            </View>
                                        </LabelContainer>
                                    </UserChart>
                                </ChartContainer>
                            </SwiperStyled>
                        </SliderContainer>

                        <UserReports>
                            <ReportsTitleWrapper>
                                <ReportsTitle>
                                    {translate('diary.participations')}
                                </ReportsTitle>
                                <ReportsSubtitle>
                                    Total: {daysMarked}
                                </ReportsSubtitle>
                            </ReportsTitleWrapper>

                            <ReportsWrapper>
                                <ReportsButton>
                                    <ReportsWell>
                                        <HappyIcon
                                            height={scale(45)}
                                            width={scale(45)}
                                            fill='#ffffff'
                                        />
                                        <ReportData>
                                            <ReportDataTitle>
                                                {translate('diary.good')}
                                            </ReportDataTitle>
                                            <ReportDataInfo>
                                                {daysGood === 1
                                                    ? daysGood +
                                                      translate('diary.day')
                                                    : daysGood +
                                                      translate('diary.days')}
                                            </ReportDataInfo>
                                        </ReportData>
                                    </ReportsWell>
                                </ReportsButton>

                                <ReportsButton>
                                    <ReportsIll>
                                        <SadIcon
                                            height={scale(45)}
                                            width={scale(45)}
                                            fill='#ffffff'
                                        />
                                        <ReportData>
                                            <ReportDataTitle>
                                                {translate('diary.bad')}
                                            </ReportDataTitle>
                                            <ReportDataInfo>
                                                {daysBad === 1
                                                    ? daysBad +
                                                      translate('diary.day')
                                                    : daysBad +
                                                      translate('diary.days')}
                                            </ReportDataInfo>
                                        </ReportData>
                                    </ReportsIll>
                                </ReportsButton>

                                {!person.is_household && (
                                    <ReportsButton
                                        onPress={() =>
                                            navigation.navigate('Ranking')
                                        }
                                    >
                                        <ReportsFull>
                                            <BadgeIcon
                                                height={scale(45)}
                                                width={scale(45)}
                                                fill='#ffffff'
                                            />
                                            <ReportData>
                                                <ReportDataTitle>
                                                    {translate('diary.ranking')}
                                                </ReportDataTitle>
                                                <ReportDataInfo>
                                                    {person.streak === 1
                                                        ? person.streak +
                                                          translate(
                                                              'diary.day'
                                                          ) +
                                                          translate(
                                                              'diary.consecutive'
                                                          )
                                                        : person.streak +
                                                          translate(
                                                              'diary.days'
                                                          ) +
                                                          translate(
                                                              'diary.consecutives'
                                                          )}
                                                </ReportDataInfo>
                                            </ReportData>
                                        </ReportsFull>
                                    </ReportsButton>
                                )}
                            </ReportsWrapper>
                        </UserReports>
                    </UserDash>
                </ScrollViewStyled>
            </Container>
        </>
    )
}

export default Diario
