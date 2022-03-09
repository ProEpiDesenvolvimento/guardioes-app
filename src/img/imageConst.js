import React from 'react'
import Emoji from 'react-native-emoji'

import { scale } from '../utils/scalling'

// Logos
export const GDSLogoBR = require('./logos/gds-pt-branca.png')
export const GDSLogoES = require('./logos/gds-es-branca.png')
export const ProEpiLogo = require('./logos/proepi.png')
export const ProEpiLogo2 = require('./logos/proepi-branca.png')
export const UnBLogo = require('./logos/unb.png')
export const UnBLogo2 = require('./logos/unb-branca.png')

// First Screens
export { default as UserIcon } from './icons/user.svg'
export { default as PasswordIcon } from './icons/password.svg'

// Help
export { default as TermsIcon } from './icons/terms-and-conditions.svg'
export { default as FAQIcon } from './icons/faq.svg'
export { default as TutorialIcon } from './icons/online-learning.svg'
export { default as InfoIcon } from './icons/info.svg'

// Diary Icons
export { default as HappyIcon } from './icons/happy.svg'
export { default as SadIcon } from './icons/sad.svg'

// Map Marker
export const greenMarker = require('./mapIcons/green-marker.png')
export const redMarker = require('./mapIcons/red-marker.png')

// Advices Icons
export { default as BedIcon } from './advices/bed.svg'
export { default as DoctorIcon } from './advices/doctor.svg'
export { default as GermIcon } from './advices/germ.svg'
export { default as HelplineIcon } from './advices/helpline.svg'
export { default as HomeworkIcon } from './advices/homework.svg'
export { default as HospitalIcon } from './advices/hospital.svg'
export { default as InsectIcon } from './advices/insect.svg'
export { default as MaskIcon } from './advices/mask.svg'
export { default as NoFlightIcon } from './advices/no-flight.svg'
export { default as ProtectionIcon } from './advices/protection.svg'
export { default as SickIcon } from './advices/sick.svg'
export { default as TentIcon } from './advices/tent.svg'
export { default as ThermometerIcon } from './advices/thermometer.svg'
export { default as VaccineIcon } from './advices/vaccine.svg'
export { default as VirusIcon } from './advices/virus.svg'
export { default as WashIcon } from './advices/wash.svg'

// Emojis
export const Emojis = {
    cloud: (
        <Emoji // Emoji cloud
            name='cloud'
            style={{ fontSize: scale(15) }}
        />
    ),
    tada: (
        <Emoji // Emoji tada
            name='tada'
            style={{ fontSize: scale(15) }}
        />
    ),
    warning: (
        <Emoji // Emoji warning
            name='warning'
            style={{ fontSize: scale(15) }}
        />
    ),
    heart: (
        <Emoji // Emoji heart up
            name='heart'
            style={{ fontSize: scale(15) }}
        />
    ),
    heart_eyes: (
        <Emoji // Emoji heart eyes
            name='heart_eyes'
            style={{ fontSize: scale(15) }}
        />
    ),
    sweat_smile: (
        <Emoji // Emoji smile face
            name='sweat_smile'
            style={{ fontSize: scale(15) }}
        />
    ),
    confused: (
        <Emoji // Emoji confused face
            name='confused'
            style={{ fontSize: scale(15) }}
        />
    ),
}
