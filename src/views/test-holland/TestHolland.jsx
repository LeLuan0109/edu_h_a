import Box from '@mui/material/Box'
import TitleTest from '~/components/title-test/TitleTest'
import MainTest from '~/components/main-test/MainTest'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { filterQuestions } from '~/apis'
import { useState } from 'react'
import { dataTest, numericalData } from '~/utils/constants'
import Loading from '~/components/loading/Loading'
import './TestHolland.css'
export default function TestHolland() {
  const [arrToRequest, setArrToRequest] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])

const questionsData = [
  {
   questionId: 1,
    questionName: 'Bạn muốn làm việc ở môi trường nào hơn?',
    options: [
      {
        answer: 'Nơi đông người, giao tiếp và hợp tác liên tục với đồng nghiệp',
        personalityType: 'E'
      },
      {
        answer: 'Nơi yên tĩnh, cho phép bạn làm việc độc lập và tập trung',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 2,
    questionName: 'Khi gặp đồng nghiệp mới, bạn cảm thấy thế nào?',
    options: [
      {
        answer: 'Thoải mái và dễ dàng bắt chuyện để xây dựng quan hệ',
        personalityType: 'E'
      },
      {
        answer: 'Hơi dè dặt và cần thời gian để làm quen trước khi hợp tác',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 3,
    questionName: 'Bạn muốn làm việc theo cách nào?',
    options: [
      {
        answer: 'Trong nhóm, nơi bạn có thể trao đổi ý kiến và brainstorm',
        personalityType: 'E'
      },
      {
        answer: 'Một mình, nơi bạn tự do suy nghĩ và hoàn thành nhiệm vụ',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 4,
    questionName: 'Khi có ý tưởng mới trong công việc, bạn làm gì?',
    options: [
      {
        answer: 'Chia sẻ ngay với đồng nghiệp để lấy phản hồi',
        personalityType: 'E'
      },
      {
        answer: 'Suy nghĩ kỹ và hoàn thiện trước khi trình bày',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 5,
    questionName: 'Điều gì giúp bạn tràn đầy năng lượng trong công việc?',
    options: [
      {
        answer: 'Giao tiếp và làm việc cùng nhiều người',
        personalityType: 'E'
      },
      {
        answer: 'Có thời gian yên tĩnh để tập trung và tái tạo sức lực',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 6,
    questionName: 'Bạn muốn giao tiếp trong công việc bằng cách nào?',
    options: [
      {
        answer: 'Nói chuyện trực tiếp để giải quyết nhanh vấn đề',
        personalityType: 'E'
      },
      {
        answer: 'Viết email hoặc báo cáo để trình bày chính xác ý tưởng',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 7,
    questionName: 'Bạn muốn dành thời gian nghỉ giữa giờ làm việc như thế nào?',
    options: [
      {
        answer: 'Trò chuyện với đồng nghiệp hoặc tham gia hoạt động nhóm',
        personalityType: 'E'
      },
      {
        answer: 'Nghỉ ngơi một mình để thư giãn và nạp lại năng lượng',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 8,
    questionName: 'Trong một nhóm làm việc, bạn muốn vai trò nào?',
    options: [
      {
        answer: 'Người dẫn dắt, kết nối mọi người và thúc đẩy tiến độ',
        personalityType: 'E'
      },
      {
        answer: 'Người hỗ trợ, tập trung vào nhiệm vụ cá nhân và quan sát',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 9,
    questionName: 'Khi làm việc một mình quá lâu, bạn cảm thấy thế nào?',
    options: [
      {
        answer: 'Chán nản và muốn giao tiếp với ai đó',
        personalityType: 'E'
      },
      {
        answer: 'Thoải mái và tận hưởng sự tự do',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 10,
    questionName: 'Khi tham gia họp nhóm, bạn phản ứng ra sao?',
    options: [
      {
        answer: 'Thích nói lên ý kiến ngay để đóng góp',
        personalityType: 'E'
      },
      {
        answer: 'Lắng nghe trước và chỉ phát biểu khi cần thiết',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 11,
    questionName: 'Khi làm việc với một dự án, bạn chú ý điều gì?',
    options: [
      {
        answer: 'Các chi tiết cụ thể như số liệu, thời gian, quy trình',
        personalityType: 'S'
      },
      {
        answer: 'Ý nghĩa tổng thể và tiềm năng phát triển của dự án',
        personalityType: 'N'
      }
    ]
  }
  ,
  {
   questionId: 12,
    questionName: 'Bạn muốn công việc nào hơn?',
    options: [
      {
        answer: 'Làm việc với dữ liệu thực tế và quy trình rõ ràng',
        personalityType: 'S'
      },
      {
        answer: 'Làm việc với ý tưởng sáng tạo và khám phá khả năng mới',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 13,
    questionName: 'Khi đưa ra quyết định trong công việc, bạn dựa vào đâu?',
    options: [
      {
        answer: 'Kinh nghiệm thực tế từ các dự án trước',
        personalityType: 'S'
      },
      {
        answer: 'Linh cảm về xu hướng hoặc cơ hội trong tương lai',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 14,
    questionName: 'Bạn muốn nhận hướng dẫn công việc như thế nào?',
    options: [
      {
        answer: 'Rõ ràng, từng bước để dễ dàng thực hiện',
        personalityType: 'S'
      },
      {
        answer: 'Tự do khám phá và tìm cách làm theo ý mình',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 15,
    questionName: 'Bạn thường nghĩ về điều gì khi làm việc?',
    options: [
      {
        answer: 'Những nhiệm vụ cụ thể cần hoàn thành ngay',
        personalityType: 'S'
      },
      {
        answer: 'Những khả năng và mục tiêu lớn trong tương lai',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 16,
    questionName: 'Bạn tiếp cận một nhiệm vụ công việc như thế nào?',
    options: [
      {
        answer: 'Làm từng bước một cách có hệ thống',
        personalityType: 'S'
      },
      {
        answer: 'Nhảy vào ý tưởng lớn và thử nghiệm linh hoạt',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 17,
    questionName: 'Bạn muốn công việc tập trung vào đâu?',
    options: [
      {
        answer: 'Thực tế hiện tại và những gì bạn có thể kiểm soát',
        personalityType: 'S'
      },
      {
        answer: 'Tương lai và những gì bạn có thể tưởng tượng',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 18,
    questionName: 'Khi học một kỹ năng mới cho công việc, bạn thích cách nào?',
    options: [
      {
        answer: 'Áp dụng phương pháp đã được chứng minh hiệu quả',
        personalityType: 'S'
      },
      {
        answer: 'Thử nghiệm cách tiếp cận mới và sáng tạo',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 19,
    questionName: 'Bạn tin tưởng điều gì hơn trong công việc?',
    options: [
      {
        answer: 'Dữ liệu cụ thể và bằng chứng rõ ràng',
        personalityType: 'S'
      },
      {
        answer: 'Trực giác và cảm nhận cá nhân về vấn đề',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 20,
    questionName: 'Khi báo cáo một dự án, bạn tập trung vào đâu?',
    options: [
      {
        answer: 'Những kết quả cụ thể đã đạt được',
        personalityType: 'S'
      },
      {
        answer: 'Ý nghĩa dài hạn hoặc cảm hứng từ dự án',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 21,
    questionName: 'Khi đưa ra quyết định trong công việc, bạn ưu tiên gì?',
    options: [
      {
        answer: 'Phân tích logic và hiệu quả của dự án',
        personalityType: 'T'
      },
      {
        answer: 'Cảm xúc của bạn và sự hài lòng của đồng nghiệp',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 22,
    questionName: 'Trong một cuộc họp tranh luận, bạn làm gì?',
    options: [
      {
        answer: 'Tập trung vào sự thật và logic, dù có bất đồng',
        personalityType: 'T'
      },
      {
        answer: 'Cố gắng giữ hòa khí và quan tâm đến cảm xúc mọi người',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 23,
    questionName: 'Bạn xử lý vấn đề khó trong công việc dựa trên đâu?',
    options: [
      {
        answer: 'Nguyên tắc công bằng và hợp lý',
        personalityType: 'T'
      },
      {
        answer: 'Sự thấu hiểu và hỗ trợ đồng nghiệp',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 24,
    questionName: 'Khi đánh giá hiệu suất của ai đó, bạn làm thế nào?',
    options: [
      {
        answer: 'Đưa ra nhận xét thẳng thắn dựa trên kết quả',
        personalityType: 'T'
      },
      {
        answer: 'Cẩn thận để không làm tổn thương tinh thần họ',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 25,
    questionName: 'Bạn đánh giá một dự án dựa trên đâu?',
    options: [
      {
        answer: 'Kết quả khách quan và logic chặt chẽ',
        personalityType: 'T'
      },
      {
        answer: 'Giá trị cá nhân và cảm nhận của nhóm',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 26,
    questionName: 'Khi đối mặt với lựa chọn khó trong công việc, bạn làm gì?',
    options: [
      {
        answer: 'Dựa vào lý trí để tìm giải pháp tối ưu',
        personalityType: 'T'
      },
      {
        answer: 'Cân nhắc cảm xúc của bản thân và người khác',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 27,
    questionName: 'Bạn tiếp cận vấn đề công việc như thế nào?',
    options: [
      {
        answer: 'Phân tích nguyên nhân và hậu quả một cách logic',
        personalityType: 'T'
      },
      {
        answer: 'Đồng cảm và tìm cách hỗ trợ nhóm',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 28,
    questionName: 'Bạn muốn công việc dựa trên giá trị nào?',
    options: [
      {
        answer: 'Nguyên tắc rõ ràng và nhất quán',
        personalityType: 'T'
      },
      {
        answer: 'Tình cảm và sự kết nối giữa con người',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 29,
    questionName: 'Trong tình huống căng thẳng tại công việc, bạn làm gì?',
    options: [
      {
        answer: 'Giữ bình tĩnh và tập trung vào giải pháp',
        personalityType: 'T'
      },
      {
        answer: 'Dễ bị ảnh hưởng bởi cảm xúc của mình hoặc nhóm',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 30,
    questionName: 'Khi đánh giá một tình huống công việc, bạn làm gì?',
    options: [
      {
        answer: 'Xem xét dữ kiện và yếu tố logic',
        personalityType: 'T'
      },
      {
        answer: 'Quan tâm đến cảm giác và nhu cầu của mọi người',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 31,
    questionName: 'Bạn muốn công việc của mình như thế nào?',
    options: [
      {
        answer: 'Có kế hoạch rõ ràng và lịch trình cố định',
        personalityType: 'J'
      },
      {
        answer: 'Linh hoạt và tự do thay đổi theo tình hình',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 32,
    questionName: 'Khi công việc bị rối loạn, bạn cảm thấy thế nào?',
    options: [
      {
        answer: 'Khó chịu và muốn sắp xếp lại ngay',
        personalityType: 'J'
      },
      {
        answer: 'Bình thường và dễ dàng thích nghi',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 33,
    questionName: 'Bạn làm việc tốt nhất khi nào?',
    options: [
      {
        answer: 'Có deadline cụ thể để hoàn thành đúng hạn',
        personalityType: 'J'
      },
      {
        answer: 'Được tự do làm việc theo nhịp độ riêng',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 34,
    questionName: 'Bạn muốn môi trường làm việc ra sao?',
    options: [
      {
        answer: 'Có cấu trúc rõ ràng và dễ dự đoán',
        personalityType: 'J'
      },
      {
        answer: 'Thoải mái và đầy bất ngờ thú vị',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 35,
    questionName: 'Khi bắt đầu một dự án công việc, bạn làm gì?',
    options: [
      {
        answer: 'Lập kế hoạch chi tiết và đặt mục tiêu cụ thể',
        personalityType: 'J'
      },
      {
        answer: 'Bắt đầu ngay và điều chỉnh theo tình hình',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 36,
    questionName: 'Bạn thích làm việc theo cách nào?',
    options: [
      {
        answer: 'Theo lịch trình cố định để mọi thứ ổn định',
        personalityType: 'J'
      },
      {
        answer: 'Tùy hứng, dựa vào cảm hứng lúc đó',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 37,
    questionName: 'Khi kế hoạch công việc thay đổi, bạn phản ứng thế nào?',
    options: [
      {
        answer: 'Thấy khó chịu và muốn quay lại kế hoạch ban đầu',
        personalityType: 'J'
      },
      {
        answer: 'Thấy bình thường và sẵn sàng thích nghi',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 38,
    questionName: 'Bạn ra quyết định trong công việc như thế nào?',
    options: [
      {
        answer: 'Quyết định nhanh để mọi thứ rõ ràng',
        personalityType: 'J'
      },
      {
        answer: 'Để ngỏ lựa chọn để cân nhắc thêm',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 39,
    questionName: 'Bạn cảm thấy thế nào khi công việc được tổ chức tốt?',
    options: [
      {
        answer: 'Thoải mái và hài lòng',
        personalityType: 'J'
      },
      {
        answer: 'Không quan trọng, bạn vẫn ổn nếu mọi thứ ngẫu nhiên',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 40,
    questionName: 'Khi làm nhiều nhiệm vụ cùng lúc, bạn làm gì?',
    options: [
      {
        answer: 'Hoàn thành từng việc một cách tuần tự',
        personalityType: 'J'
      },
      {
        answer: 'Chuyển đổi linh hoạt giữa các nhiệm vụ',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 41,
    questionName: 'Bạn muốn dành thời gian nghỉ giữa giờ làm việc như thế nào?',
    options: [
      {
        answer: 'Giao lưu với đồng nghiệp để nạp năng lượng',
        personalityType: 'E'
      },
      {
        answer: 'Nghỉ ngơi một mình để tập trung lại',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 42,
    questionName: 'Khi xử lý một vấn đề công việc, bạn tập trung vào đâu?',
    options: [
      {
        answer: 'Dữ liệu cụ thể và thực tế hiện tại',
        personalityType: 'S'
      },
      {
        answer: 'Khả năng tiềm ẩn và ý tưởng mới',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 43,
    questionName: 'Khi làm việc nhóm, bạn ưu tiên gì?',
    options: [
      {
        answer: 'Đảm bảo hiệu quả và logic trong công việc',
        personalityType: 'T'
      },
      {
        answer: 'Quan tâm đến cảm xúc và sự hài lòng của nhóm',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 44,
    questionName: 'Bạn muốn phong cách làm việc hàng ngày ra sao?',
    options: [
      {
        answer: 'Có tổ chức và theo kế hoạch rõ ràng',
        personalityType: 'J'
      },
      {
        answer: 'Linh hoạt và thay đổi theo hoàn cảnh',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 45,
    questionName: 'Bạn muốn công việc nào hơn?',
    options: [
      {
        answer: 'Giao tiếp với nhiều người và hợp tác nhóm',
        personalityType: 'E'
      },
      {
        answer: 'Làm việc độc lập và tập trung cá nhân',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 46,
    questionName: 'Khi học kỹ năng mới cho công việc, bạn chú ý gì?',
    options: [
      {
        answer: 'Những kỹ năng thực tế, áp dụng ngay được',
        personalityType: 'S'
      },
      {
        answer: 'Những ý tưởng sáng tạo và tầm nhìn lớn',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 47,
    questionName: 'Bạn giải quyết xung đột trong công việc như thế nào?',
    options: [
      {
        answer: 'Dựa vào lý lẽ và sự công bằng',
        personalityType: 'T'
      },
      {
        answer: 'Thấu hiểu và hòa giải cảm xúc của mọi người',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 48,
    questionName: 'Bạn làm việc hiệu quả nhất khi nào?',
    options: [
      {
        answer: 'Có lịch trình và mục tiêu rõ ràng',
        personalityType: 'J'
      },
      {
        answer: 'Được tự do làm việc theo cách riêng',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 49,
    questionName: 'Trong một cuộc họp đông người, bạn cảm thấy thế nào?',
    options: [
      {
        answer: 'Thoải mái và thích giao tiếp',
        personalityType: 'E'
      },
      {
        answer: 'Hơi ngượng và thích làm việc một mình',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 50,
    questionName: 'Bạn muốn làm việc với điều gì?',
    options: [
      {
        answer: 'Dữ liệu cụ thể và thông tin rõ ràng',
        personalityType: 'S'
      },
      {
        answer: 'Ý tưởng trừu tượng và sáng tạo',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 51,
    questionName: 'Khi đồng nghiệp cần giúp đỡ, bạn làm gì?',
    options: [
      {
        answer: 'Đưa ra giải pháp thực tế và logic',
        personalityType: 'T'
      },
      {
        answer: 'Lắng nghe và đồng cảm với họ',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 52,
    questionName: 'Bạn muốn công việc của mình thế nào?',
    options: [
      {
        answer: 'Có tổ chức và theo kế hoạch rõ ràng',
        personalityType: 'J'
      },
      {
        answer: 'Linh hoạt và đầy bất ngờ thú vị',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 53,
    questionName: 'Bạn muốn giờ nghỉ trưa tại công sở ra sao?',
    options: [
      {
        answer: 'Ra ngoài trò chuyện với đồng nghiệp',
        personalityType: 'E'
      },
      {
        answer: 'Ở lại thư giãn một mình',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 54,
    questionName: 'Bạn dựa vào đâu để xử lý công việc?',
    options: [
      {
        answer: 'Thực tế và những gì xác nhận được',
        personalityType: 'S'
      },
      {
        answer: 'Trực giác và cảm nhận về tương lai',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 55,
    questionName: 'Khi đưa ra quyết định quan trọng trong công việc, bạn làm gì?',
    options: [
      {
        answer: 'Xem xét logic và yếu tố khách quan',
        personalityType: 'T'
      },
      {
        answer: 'Lắng nghe cảm xúc của mình và nhóm',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 56,
    questionName: 'Bạn làm việc tốt nhất trong hoàn cảnh nào?',
    options: [
      {
        answer: 'Khi mọi thứ được lên kế hoạch rõ ràng',
        personalityType: 'J'
      },
      {
        answer: 'Khi bạn có thể tự do thay đổi',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 57,
    questionName: 'Bạn muốn làm việc với ai?',
    options: [
      {
        answer: 'Nhiều người để trao đổi ý tưởng',
        personalityType: 'E'
      },
      {
        answer: 'Bản thân hoặc một vài người thân thiết',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 58,
    questionName: 'Bạn quan tâm hơn đến điều gì trong công việc?',
    options: [
      {
        answer: 'Nhiệm vụ hiện tại trước mắt',
        personalityType: 'S'
      },
      {
        answer: 'Khả năng phát triển trong tương lai',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 59,
    questionName: 'Khi giải quyết vấn đề công việc, bạn làm gì?',
    options: [
      {
        answer: 'Phân tích nguyên nhân một cách logic',
        personalityType: 'T'
      },
      {
        answer: 'Cân nhắc cảm xúc của những người liên quan',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 60,
    questionName: 'Bạn muốn phong cách làm việc nào hơn?',
    options: [
      {
        answer: 'Theo kế hoạch để mọi thứ ổn định',
        personalityType: 'J'
      },
      {
        answer: 'Tùy hứng để tận hưởng sự tự do',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 61,
    questionName: 'Bạn cảm thấy thế nào khi gặp khách hàng hoặc đối tác?',
    options: [
      {
        answer: 'Hào hứng và dễ dàng kết nối',
        personalityType: 'E'
      },
      {
        answer: 'Cần thời gian để cảm thấy thoải mái',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 62,
    questionName: 'Bạn muốn làm việc với điều gì hơn?',
    options: [
      {
        answer: 'Sự thật cụ thể và rõ ràng',
        personalityType: 'S'
      },
      {
        answer: 'Khái niệm trừu tượng và đầy cảm hứng',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 63,
    questionName: 'Bạn tiếp cận vấn đề công việc dựa trên đâu?',
    options: [
      {
        answer: 'Lý trí và các nguyên tắc logic',
        personalityType: 'T'
      },
      {
        answer: 'Cảm xúc và giá trị cá nhân',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 64,
    questionName: 'Bạn muốn ngày làm việc của mình ra sao?',
    options: [
      {
        answer: 'Được sắp xếp gọn gàng và có kế hoạch',
        personalityType: 'J'
      },
      {
        answer: 'Linh hoạt và thay đổi theo tâm trạng',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 65,
    questionName: 'Bạn muốn làm gì trong giờ nghỉ tại công sở?',
    options: [
      {
        answer: 'Gặp đồng nghiệp và tham gia hoạt động nhóm',
        personalityType: 'E'
      },
      {
        answer: 'Ở một mình để suy nghĩ hoặc thư giãn',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 66,
    questionName: 'Bạn tập trung vào điều gì khi học kỹ năng công việc?',
    options: [
      {
        answer: 'Những gì thực tế và áp dụng được',
        personalityType: 'S'
      },
      {
        answer: 'Những ý tưởng mới lạ và sáng tạo',
        personalityType: 'N'
      }
    ]
  },
  {
   questionId: 67,
    questionName: 'Khi đồng nghiệp gặp khó khăn, bạn phản ứng thế nào?',
    options: [
      {
        answer: 'Đưa ra giải pháp thực tế để hỗ trợ',
        personalityType: 'T'
      },
      {
        answer: 'Lắng nghe và an ủi bằng sự đồng cảm',
        personalityType: 'F'
      }
    ]
  },
  {
   questionId: 68,
    questionName: 'Bạn làm việc hiệu quả hơn khi nào?',
    options: [
      {
        answer: 'Có mục tiêu và thời gian cụ thể',
        personalityType: 'J'
      },
      {
        answer: 'Được tự do làm việc theo cách riêng',
        personalityType: 'P'
      }
    ]
  },
  {
   questionId: 69,
    questionName: 'Bạn muốn giao tiếp trong công việc ra sao?',
    options: [
      {
        answer: 'Nói chuyện trực tiếp với đồng nghiệp',
        personalityType: 'E'
      },
      {
        answer: 'Suy nghĩ kỹ và giao tiếp qua văn bản',
        personalityType: 'I'
      }
    ]
  },
  {
   questionId: 70,
    questionName: 'Bạn muốn phong cách làm việc hàng ngày thế nào?',
    options: [
      {
        answer: 'Có kế hoạch rõ ràng để kiểm soát',
        personalityType: 'J'
      },
      {
        answer: 'Tự do và thoải mái để khám phá',
        personalityType: 'P'
      }
    ]
  }
];

  useEffect(() => {
    // setIsLoading(true)
    // filterQuestions(1, numericalData.LIMIT_HOLLAND).then(res => {
    //   setQuestions(res.data.question)
    //   const arrData = res.data.question
    //   const arrTmp = []
    //   for (let i = 0; i < arrData.length; i++) {
    //     arrTmp.push({
    //       resultCategoryId: arrData[i].resultId,
    //       maxScore: arrData[i].maxScore,
    //       questionId: arrData[i].id,
    //       score: 0
    //     })
    //   }
    //   setArrToRequest(arrTmp)
    //   console.log(arrToRequest , 'arrToRequest')
    //       console.log(questions , 'questions')
    // }).finally(() => {
    //   setIsLoading(false)
    // } )
     setQuestions(questionsData);
           const arrTmp = []
      for (let i = 0; i < questionsData.length; i++) {  
         arrTmp.push({
          questionId: questionsData[i].questionId,
          resultPersonalityType: null
        }) 
      } 
      setArrToRequest(arrTmp)

  }, [])
  return (
    <>
      { isLoading === true && <Loading /> }
      <Box sx={{ width: '100%', p:1 }}>
        <Helmet>
          <title>TRẮC NGHIỆM ĐÁNH GIÁ PHÂN LOẠI TÍNH CÁCH</title>
        </Helmet>
        <TitleTest testName='MBTI ' />
        <Box className='instruct-title'>Hướng dẫn:</Box>
        <Box >
          <Box>• Thời gian hoàn thành dự kiến: 10 - 15 phút</Box>
          <Box>• Click chọn đáp án mô tả đặc điểm phù hợp với mình</Box>
          {/* <Box>• Đáp án được sắp xếp theo mức độ từ <span style={{ fontWeight:'600', color:'#704264' }}>Không đồng ý - </span> <span style={{ fontWeight:'600', color:'#54B435' }}>Đồng ý</span></Box> */}
          <Box>• Không cần suy nghĩ quá nhiều khi lựa chọn câu trả lời</Box>
          <Box>• Click <span style={{ fontWeight:'600', color:'#e8751a' }}>Nộp bài</span> để xem kết quả</Box>
        </Box>
        <MainTest
          questions={questions}
          arrToRequestInit={arrToRequest}
          detailTest={dataTest(questions, arrToRequest).holland}
        />
      </Box>
    </>
  )
}