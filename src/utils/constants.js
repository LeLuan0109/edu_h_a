
export const routes = {
  DEFAULT: '/',
  INFO_TEST_HOLLAND: '/met21080098-mbti-test',
  INFO_TEST_DISC: '/trac-nghiem-Disc',
  TEST_HOLLAND: '/met21080098-mbti-test/test',
  TEST_DISC: '/trac-nghiem-Disc/test',
  ABOUT: '/ve-chung-toi',
  RESULT_HOLLAND: '/met21080098-mbti-test/result',
  RESULT_DISC: '/trac-nghiem-Disc/result'
}

export const env = {
  API_ROOT: process.env.API_ROOT
}

export const validate = {
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phonePattern: /^\d{10}$/
}

export const dataTest = (questions, arrToRequest) => {
  // console.log('🚀 ~ dataTest ~ questions:', questions)
  return {
    disc: {
      name: 'DISC',
      maxScore: 3,
      color: ['#704264', 'gray', '#54B435'],
      answerClass: ['total-disagree', 'normal', 'total-agree'],
      answerLabels: ['Không giống', 'Giống'],
      arrToRequest: arrToRequest,
      statusLabels: ['Tự nhiên', 'Thích ứng'],
      questions: questions
    },
    holland: {
      name: 'Holland',
      maxScore: 5,
      color: ['#704264', '#BB8493', 'gray', '#82CD47', '#54B435'],
      answerClass: ['total-disagree', 'disagree', 'normal', 'agree', 'total-agree'],
      answerLabels: ['Không đồng ý', 'Đồng ý'],
      arrToRequest: arrToRequest,
      double: false,
      questions: questions
    }
  }
}

export const key = [' (E)', ' (I)', ' (S)', ' (N)', ' (T)', ' (F)', ' (J)', ' (P)']

export const numericalData = {
  LIMIT_HOLLAND: 10,
  LIMIT_DISC: 24,
  HEIGHT_PAGE: 8000
}

export const constTest = {
  LIST_TEST: [
    {
      name: 'Trắc nghiệm sở thích nghề nghiệp',
      route: routes.INFO_TEST_HOLLAND
    },
    {
      name: 'Trắc nghiệm nhóm tính cách',
      route: routes.INFO_TEST_DISC
    },
  ]
}