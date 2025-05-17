export default function convertQuestions (data) {
  const result = {}

  data.forEach(question => {
    const [mainQuestionName, subQuestionName] = question.questionName.split(' - ')

    if (!result[mainQuestionName]) {
      result[mainQuestionName] = {
        questionName: mainQuestionName,
        items: []
      }
    }

    result[mainQuestionName].items.push({
      id: question.id,
      resultId: question.resultId,
      questionName: subQuestionName,
      maxScore: question.maxScore
    })
  })

  return Object.values(result)
}

export function extractContentInParentheses(text) {
  const regex = /\(([^)]+)\)/ // Biểu thức chính quy để tìm nội dung trong ngoặc đơn
  const match = text.match(regex)
  if (match) {
    return match[1] // Trả về nội dung bên trong ngoặc đơn
  }
  return null // Trả về null nếu không tìm thấy nội dung trong ngoặc đơn
}