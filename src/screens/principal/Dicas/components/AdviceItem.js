import React from 'react';
import { Advice, AdviceTitle, AdviceIcon } from '../styles';

import { scale } from '../../../../utils/scallingUtils';
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
} from '../../../../img/imageConst';

const ICON_SIZE = scale(50);

const AdviceItem = ({ title, icon }) => {
  const getContentIcon = {
    bed: <BedIcon height={ICON_SIZE} width={ICON_SIZE} />,
    doctor: <DoctorIcon height={ICON_SIZE} width={ICON_SIZE} />,
    germ: <GermIcon height={ICON_SIZE} width={ICON_SIZE} />,
    helpline: <HelplineIcon height={ICON_SIZE} width={ICON_SIZE} />,
    homework: <HomeworkIcon height={ICON_SIZE} width={ICON_SIZE} />,
    hospital: <HospitalIcon height={ICON_SIZE} width={ICON_SIZE} />,
    insect: <InsectIcon height={ICON_SIZE} width={ICON_SIZE} />,
    mask: <MaskIcon height={ICON_SIZE} width={ICON_SIZE} />,
    'no-flight': <NoFlightIcon height={ICON_SIZE} width={ICON_SIZE} />,
    protection: <ProtectionIcon height={ICON_SIZE} width={ICON_SIZE} />,
    sick: <SickIcon height={ICON_SIZE} width={ICON_SIZE} />,
    tent: <TentIcon height={ICON_SIZE} width={ICON_SIZE} />,
    thermometer: <ThermometerIcon height={ICON_SIZE} width={ICON_SIZE} />,
    vaccine: <VaccineIcon height={ICON_SIZE} width={ICON_SIZE} />,
    virus: <VirusIcon height={ICON_SIZE} width={ICON_SIZE} />,
    wash: <WashIcon height={ICON_SIZE} width={ICON_SIZE} />,
  };

  return (
    <Advice>
      <AdviceTitle numberOfLines={3}>{title}</AdviceTitle>
      <AdviceIcon>{getContentIcon[icon] || getContentIcon.sick}</AdviceIcon>
    </Advice>
  );
};

export default AdviceItem;
