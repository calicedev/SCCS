const color = {
  // 모드 관련 없는 배경 색상, 아래와 같이 이름 규칙을 맞춰줘야함
  primaryColor: '#4B91F1',
  deepPrimaryColor: '#1464D1',
  lightPrimaryColor: '#84B6FB',

  secondaryColor: '#A8D5FF',
  deepSecondaryColor: '#69A9E4',
  lightSecondaryColor: '#D7ECFF',

  tertiaryColor: '#97A7BD',
  deepTertiaryColor: '#788AA4',
  lightTertiaryColor: '#CBD3DE',

  blackColor: '#1D1D1D',
  deepBlackColor: '#000000',
  lightBlackColor: '#303030',

  grayColor: '#979797',
  deepGrayColor: '#696969',
  lightGrayColor: '#EBEBEB',

  dangerColor: '#D03434',
  deepDangerColor: '#AC2626',
  lightDangerColor: '#F36363',

  whiteColor: '#FDFDFD',
  deepWhiteColor: '#FFFFFF',
  lightWhiteColor: '#F3F3F3',

  // 모드 관련 없는 폰트 색상
  primaryFontColor: '#1364D1',
  secondaryFontColor: '#6FABFD',
  tertiaryFontColor: '#596B84',
  whiteFontColor: '#FFFFFF',
  grayFontColor: '#666666',
  passFontColor: '#1C6FBC',
  errorFontColor: '#EF0A0A',
}

export const light = {
  // 모드 관련 있는 배경 색상
  baseBgColor: '#FFFFFF', // 최하단 화면 배경색
  bgColor: '#FFFFFF', // 컨텐츠 화면 배경색
  bluishBgColor: '#F6FAFF', // 사이드바 화면 배경색

  fontColor: '#000000', // 폰트 색상
  ...color,
}

export const dark = {
  // 모드 관련 있는 배경 색상
  baseBgColor: '#34424E', // 최하단 화면 배경색
  bgColor: '#46535F', // 컨텐츠 화면 배경색
  bluishBgColor: '#5F738C', // 사이드바 화면 배경색

  fontColor: '#FFFFFF', // 폰트 색상
  ...color,
}
