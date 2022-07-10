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
    ReportsAll,
    ReportsWell,
    ReportsIll,
    ReportData,
    ReportDataTitle,
    ReportDataInfo,
} from './styles'

import translate from '../../../../locales/i18n'
import { LocaleConfig } from '../../../utils/calendaryMonthNames'
import { scale } from '../../../utils/scalling'
import { HappyIcon, SadIcon } from '../../../img/imageConst'
import { getNameParts, handleAvatar, getInitials } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { getUserSurveys } from '../../../api/surveys'

LocaleConfig.defaultLocale = translate('lang.code')

const Diario = () => {
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
    const [allDatesMarked, setAllDatesMarked] = useState([])
    const [datesMarked, setDatesMarked] = useState([])
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
        const personAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

        setPersonAge(personAge)
    }

    const defineMarkedDates = () => {
        const markedDatesGood = []
        const markedDatesBad = []
        const markedDatesAll = []

        surveys.forEach((survey) => {
            if (!person.is_household) {
                if (!survey.household) {
                    if (survey.symptom && survey.symptom.length) {
                        // BadReport
                        markedDatesBad.push(
                            survey.created_at.split('T', 1).toString()
                        )
                        markedDatesAll.push(survey)
                    } else {
                        // GoodReport
                        markedDatesGood.push(
                            survey.created_at.split('T', 1).toString()
                        )
                    }
                }
            } else if (survey.household && survey.household.id === person.id) {
                if (survey.symptom && survey.symptom.length) {
                    // Household BadReport
                    markedDatesBad.push(
                        survey.created_at.split('T', 1).toString()
                    )
                    markedDatesAll.push(survey)
                } else {
                    // Household GoodReport
                    markedDatesGood.push(
                        survey.created_at.split('T', 1).toString()
                    )
                }
            }
        })

        setAllDatesMarked(markedDatesAll)

        const BadReports = markedDatesBad.reduce(
            (c, v) =>
                Object.assign(c, {
                    [v]: { selected: true, selectedColor: '#F18F01' },
                }),
            {}
        )
        const GoodReports = markedDatesGood.reduce(
            (c, v) =>
                Object.assign(c, {
                    [v]: { selected: true, selectedColor: '#5DD39E' },
                }),
            {}
        )

        Object.assign(GoodReports, BadReports)

        const daysMarked = Object.keys(GoodReports).length
        const daysBad = Object.keys(BadReports).length
        const daysGood = daysMarked - daysBad

        setDatesMarked(GoodReports)
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

        setDaysMissing(daysMissing)
        setPercentGood(percentGood)
        setPercentBad(percentBad)
        setPercentMissing(percentMissing)
    }

    const handleCalendarArrows = (direction) => {
        if (direction === 'left') {
            return (
                <Feather name='chevron-left' size={scale(25)} color='#c4c4c4' />
            )
        }
        return <Feather name='chevron-right' size={scale(25)} color='#c4c4c4' />
    }

    if (isLoading) {
        return <ScreenLoader />
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
                                            markedDates={datesMarked}
                                            onDayPress={(day) => {
                                                allDatesMarked.map(
                                                    (symptomMarker) => {
                                                        if (
                                                            symptomMarker.bad_since ===
                                                            day.dateString
                                                        ) {
                                                            console.warn(
                                                                symptomMarker.symptom
                                                            )
                                                        }
                                                    }
                                                )
                                            }}
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

                            <ReportsAll>
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
                                                  translate('diary.report')
                                                : daysGood +
                                                  translate('diary.reports')}
                                        </ReportDataInfo>
                                    </ReportData>
                                </ReportsWell>

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
                                                  translate('diary.report')
                                                : daysBad +
                                                  translate('diary.reports')}
                                        </ReportDataInfo>
                                    </ReportData>
                                </ReportsIll>
                            </ReportsAll>
                        </UserReports>
                    </UserDash>
                </ScrollViewStyled>
            </Container>
        </>
    )
}

export default Diario
