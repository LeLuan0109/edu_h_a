import { Button, Modal, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { saveExam, saveExam2 } from '~/apis'
import Label from '~/components/labelDatePicker/LabelDatePicker'
import { routes, validate } from '~/utils/constants'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: { xs: '95%', sm: 'auto' },
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 20,
  p: 2,
  borderRadius: '30px'
}


export default function InfomationForm({ answeredQuestions, totalQuestions, arrToRequest, isOpen, handleClose }) {
  const initFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    dob: ''
  }

  const dataResult = [
    {
      code: 'INTJ',
      name: 'Kiến trúc sư',
      value: 'INTJ (Kiến trúc sư): INTJ là những người có tư duy chiến lược, độc lập, và luôn hướng tới tương lai với tầm nhìn dài hạn. Họ thích phân tích vấn đề phức tạp, lập kế hoạch chi tiết, và tìm cách tối ưu hóa mọi thứ. Trong doanh nghiệp, INTJ phù hợp làm quản lý chiến lược, nơi họ có thể xây dựng các kế hoạch phát triển 5-10 năm, dự đoán xu hướng thị trường, và định hướng doanh nghiệp vượt qua cạnh tranh bằng cách sử dụng dữ liệu và logic sắc bén. Họ cũng giỏi làm phân tích kinh doanh (Business Analyst), nhờ khả năng đào sâu vào số liệu, đánh giá hiệu suất hiện tại, và đề xuất các giải pháp cải tiến quy trình để tăng hiệu quả. Ngoài ra, vai trò giám đốc công nghệ (CTO) rất lý tưởng, vì INTJ có thể kết hợp tư duy hệ thống với sự sáng tạo để dẫn dắt đội ngũ phát triển công nghệ mới, đảm bảo doanh nghiệp luôn đi đầu trong đổi mới. Họ thích làm việc một mình hoặc với nhóm nhỏ, tập trung vào các mục tiêu lớn thay vì bị cuốn vào chi tiết hàng ngày.'
    },
    {
      code: 'INTP',
      name: 'Nhà tư duy',
      value: 'INTP (Nhà tư duy): INTP là những người tò mò trí tuệ, yêu thích phân tích sâu sắc, và không ngừng tìm kiếm câu trả lời cho các câu hỏi phức tạp. Họ có xu hướng thách thức hiện trạng và khám phá ý tưởng mới mà không bị ràng buộc bởi quy tắc cứng nhắc. Trong doanh nghiệp, INTP phát huy tốt khi làm chuyên viên phân tích dữ liệu, nơi họ có thể sử dụng tư duy logic để phân tích số liệu lớn (big data), phát hiện xu hướng ẩn, và cung cấp thông tin chi tiết giúp doanh nghiệp ra quyết định. Họ cũng phù hợp với nghiên cứu và phát triển (R&D), vì khả năng thử nghiệm các khái niệm mới, phát triển sản phẩm hoặc dịch vụ sáng tạo, và không ngại thất bại để tìm ra giải pháp tối ưu. Vai trò lập trình viên cũng là lựa chọn tuyệt vời, khi INTP có thể viết mã phức tạp, tối ưu hóa hệ thống phần mềm, và giải quyết các vấn đề kỹ thuật bằng cách tiếp cận sáng tạo. Họ cần môi trường tự do để suy nghĩ và không thích bị quản lý quá chặt chẽ.'
    },
    {
      code: 'ENTJ',
      name: 'Nhà lãnh đạo',
      value: 'ENTJ (Nhà lãnh đạo): ENTJ là những nhà lãnh đạo bẩm sinh với sự quyết đoán, tự tin, và khả năng tổ chức vượt trội. Họ thích kiểm soát, đặt mục tiêu lớn, và thúc đẩy người khác cùng đạt được thành công. Trong doanh nghiệp, ENTJ lý tưởng làm giám đốc điều hành (CEO), nơi họ có thể đưa ra các quyết định quan trọng, định hình chiến lược tổng thể, và dẫn dắt công ty vượt qua thách thức bằng sự mạnh mẽ và tầm nhìn rõ ràng. Họ cũng giỏi làm quản lý dự án, nhờ khả năng lập kế hoạch chi tiết, phân bổ nguồn lực hiệu quả, và đảm bảo mọi thứ hoàn thành đúng hạn với chất lượng cao. Vai trò trưởng phòng kinh doanh cũng rất phù hợp, vì ENTJ có thể truyền động lực cho đội ngũ, xây dựng chiến lược bán hàng, và đạt doanh số vượt trội nhờ kỹ năng thuyết phục và sự kiên định. Họ phát huy tốt trong môi trường cạnh tranh, nơi họ có thể lãnh đạo và tạo ra kết quả cụ thể.'
    },
    {
      code: 'ENTP',
      name: 'Nhà tranh luận',
      value: 'ENTP (Nhà tranh luận): ENTP là những người sáng tạo, nhanh trí, và luôn sẵn sàng thử nghiệm ý tưởng mới. Họ thích tranh luận, tìm kiếm cơ hội, và không ngại thay đổi cách tiếp cận để đạt được mục tiêu. Trong doanh nghiệp, ENTP phù hợp làm quản lý sáng tạo (Creative Director), nơi họ có thể dẫn dắt đội ngũ thiết kế các chiến dịch quảng cáo đột phá, kết hợp ý tưởng táo bạo với xu hướng thị trường để thu hút khách hàng. Họ cũng giỏi làm chuyên viên marketing, nhờ khả năng brainstorm chiến lược tiếp thị độc đáo, thử nghiệm các kênh mới, và thích nghi nhanh với phản hồi từ thị trường. Vai trò tư vấn khởi nghiệp cũng lý tưởng, vì ENTP có thể giúp các doanh nghiệp mới xây dựng mô hình kinh doanh, nhận diện cơ hội tăng trưởng, và vượt qua giai đoạn đầu đầy thách thức bằng sự linh hoạt và sáng tạo. Họ cần môi trường năng động, nơi họ có thể tự do khám phá mà không bị gò bó.'
    },
    {
      code: 'INFJ',
      name: 'Người bảo vệ',
      value: 'INFJ (Người bảo vệ): INFJ là những người sâu sắc, lý tưởng, và nhạy cảm với nhu cầu của người khác. Họ có tầm nhìn dài hạn, khả năng thấu hiểu sâu sắc, và luôn muốn tạo ra tác động tích cực. Trong doanh nghiệp, INFJ phù hợp làm chuyên viên đào tạo, nơi họ có thể thiết kế các chương trình phát triển kỹ năng, truyền cảm hứng cho nhân viên, và giúp họ đạt được tiềm năng tối đa bằng cách kết hợp sự đồng cảm với mục tiêu tổ chức. Họ cũng giỏi làm quản lý nhân sự (HR), nhờ khả năng xây dựng văn hóa doanh nghiệp hòa hợp, giải quyết xung đột nội bộ, và hỗ trợ nhân viên trong các vấn đề cá nhân lẫn nghề nghiệp. Vai trò tư vấn nội bộ cũng rất phù hợp, vì INFJ có thể cải thiện giao tiếp giữa các phòng ban, nâng cao tinh thần làm việc, và đảm bảo mọi người cùng hướng tới mục tiêu chung. Họ thích công việc có ý nghĩa và tránh các vai trò chỉ tập trung vào lợi nhuận.'
    },
    {
      code: 'INFP',
      name: 'Người lý tưởng',
      value: 'INFP (Người lý tưởng): INFP là những người sáng tạo, giàu cảm xúc, và sống theo giá trị cá nhân. Họ thích làm việc tự do, tránh áp lực cứng nhắc, và luôn tìm kiếm ý nghĩa trong công việc. Trong doanh nghiệp, INFP phát huy khi làm chuyên viên nội dung (Content Writer), nơi họ có thể viết bài quảng cáo, blog, hoặc câu chuyện thương hiệu đầy cảm hứng, kết nối cảm xúc với khách hàng bằng sự chân thành và sáng tạo. Họ cũng phù hợp làm thiết kế thương hiệu, nhờ khả năng tạo ra logo, hình ảnh, hoặc phong cách trực quan độc đáo, phản ánh giá trị cốt lõi của doanh nghiệp. Vai trò nhân viên CSR (Trách nhiệm xã hội doanh nghiệp) cũng lý tưởng, vì INFP có thể phát triển các dự án cộng đồng, tổ chức hoạt động từ thiện, và giúp doanh nghiệp tạo tác động xã hội tích cực. Họ cần môi trường linh hoạt, nơi họ có thể thể hiện bản thân và làm việc vì điều họ tin tưởng.'
    },
    {
      code: 'ENFJ',
      name: 'Người dẫn dắt',
      value: 'ENFJ (Người dẫn dắt): ENFJ là những người nhiệt tình, truyền cảm hứng, và có khả năng kết nối tuyệt vời. Họ luôn muốn giúp người khác phát triển và tạo ra môi trường tích cực. Trong doanh nghiệp, ENFJ phù hợp làm quản lý nhân sự (HR), nơi họ có thể tuyển dụng nhân tài, xây dựng đội ngũ gắn kết, và tổ chức các hoạt động nâng cao tinh thần làm việc bằng sự ấm áp và kỹ năng giao tiếp. Họ cũng giỏi làm trưởng phòng dịch vụ khách hàng, nhờ khả năng lắng nghe, giải quyết khiếu nại, và đảm bảo khách hàng cảm thấy được quan tâm, từ đó nâng cao uy tín doanh nghiệp. Vai trò chuyên viên quan hệ công chúng (PR) cũng rất phù hợp, vì ENFJ có thể xây dựng mối quan hệ với truyền thông, tổ chức sự kiện công chúng, và quảng bá hình ảnh doanh nghiệp một cách tự nhiên và cuốn hút. Họ phát huy tốt trong các công việc cần tương tác và lãnh đạo cảm xúc.'
    },
    {
      code: 'ENFP',
      name: 'Người truyền cảm hứng',
      value: 'ENFP (Người truyền cảm hứng): ENFP là những người năng động, sáng tạo, và luôn cởi mở với ý tưởng mới. Họ thích khám phá, truyền cảm hứng, và làm việc trong môi trường linh hoạt. Trong doanh nghiệp, ENFP lý tưởng làm chuyên viên marketing, nơi họ có thể tạo ra các chiến dịch tiếp thị sáng tạo, thử nghiệm ý tưởng mới như video viral hoặc nội dung mạng xã hội, và thu hút khách hàng bằng sự nhiệt tình. Họ cũng phù hợp làm quản lý sự kiện, nhờ khả năng tổ chức các buổi ra mắt sản phẩm, hội thảo, hoặc team-building đầy năng lượng, mang lại trải nghiệm đáng nhớ. Vai trò nhân viên bán hàng sáng tạo cũng rất hợp, vì ENFP có thể tiếp cận khách hàng bằng cách cá nhân hóa, sử dụng sự cuốn hút để chốt giao dịch. Họ cần công việc cho phép tự do sáng tạo và giao tiếp thường xuyên.'
    },
    {
      code: 'ISTJ',
      name: 'Người trách nhiệm',
      value: 'ISTJ (Người trách nhiệm): ISTJ là những người cẩn thận, đáng tin cậy, và thích làm việc theo quy trình rõ ràng. Họ chú trọng chi tiết, tuân thủ quy định, và luôn hoàn thành nhiệm vụ đúng hạn. Trong doanh nghiệp, ISTJ phù hợp làm kế toán, nơi họ có thể quản lý sổ sách, đảm bảo số liệu chính xác, và tuân thủ các quy định tài chính với độ tin cậy cao. Họ cũng giỏi làm quản lý chuỗi cung ứng, nhờ khả năng tổ chức logistics, theo dõi hàng hóa, và đảm bảo mọi thứ vận hành trơn tru từ nhà cung cấp đến khách hàng. Vai trò chuyên viên kiểm toán nội bộ cũng lý tưởng, vì ISTJ có thể kiểm tra quy trình, phát hiện sai sót, và đề xuất cải tiến để giảm rủi ro cho doanh nghiệp. Họ thích môi trường có cấu trúc và không thích sự thay đổi đột ngột.'
    },
    {
      code: 'ISFJ',
      name: 'Người che chở',
      value: 'ISFJ (Người che chở): ISFJ là những người chu đáo, tận tâm, và luôn sẵn sàng hỗ trợ người khác. Họ giỏi làm việc với chi tiết, tạo sự ổn định, và quan tâm đến nhu cầu của mọi người. Trong doanh nghiệp, ISFJ phát huy khi làm trợ lý hành chính, nơi họ có thể tổ chức lịch trình, chuẩn bị tài liệu, và hỗ trợ quản lý với sự tỉ mỉ và đáng tin cậy. Họ cũng phù hợp làm chuyên viên chăm sóc khách hàng, nhờ khả năng lắng nghe, giải quyết vấn đề một cách kiên nhẫn, và mang lại sự hài lòng cho khách hàng. Vai trò nhân viên nhân sự (HR) cũng rất hợp, vì ISFJ có thể xử lý phúc lợi, hỗ trợ nhân viên trong các vấn đề cá nhân, và duy trì môi trường làm việc ấm áp. Họ cần công việc cho phép họ chăm sóc và tạo sự thoải mái cho người khác.'
    },
    {
      code: 'ESTJ',
      name: 'Người quản lý',
      value: 'ESTJ (Người quản lý): ESTJ là những người hiệu quả, thực tế, và có kỹ năng tổ chức xuất sắc. Họ thích lãnh đạo theo quy tắc, đạt kết quả cụ thể, và duy trì trật tự trong công việc. Trong doanh nghiệp, ESTJ phù hợp làm quản lý sản xuất, nơi họ có thể giám sát dây chuyền, đảm bảo sản phẩm đạt chất lượng, và tối ưu hóa hiệu suất bằng cách áp dụng quy trình chặt chẽ. Họ cũng giỏi làm trưởng phòng tài chính, nhờ khả năng lập kế hoạch ngân sách, quản lý dòng tiền, và giữ cho doanh nghiệp ổn định tài chính. Vai trò quản lý bán hàng cũng lý tưởng, vì ESTJ có thể dẫn dắt đội ngũ, đặt mục tiêu doanh số, và duy trì kỷ luật để đạt kết quả cao. Họ phát huy tốt trong môi trường có cấu trúc, nơi họ có thể kiểm soát và đo lường thành công.'
    },
    {
      code: 'ESFJ',
      name: 'Người hỗ trợ',
      value: 'ESFJ (Người hỗ trợ): ESFJ là những người hòa đồng, tận tâm, và thích làm việc nhóm. Họ quan tâm đến nhu cầu của người khác, giỏi giao tiếp, và luôn tạo không khí tích cực. Trong doanh nghiệp, ESFJ lý tưởng làm nhân viên bán hàng, nơi họ có thể xây dựng mối quan hệ lâu dài với khách hàng, thuyết phục bằng sự thân thiện, và chốt giao dịch hiệu quả. Họ cũng phù hợp làm chuyên viên dịch vụ khách hàng, nhờ khả năng xử lý khiếu nại nhanh chóng, mang lại trải nghiệm tích cực, và giữ chân khách hàng. Vai trò quản lý văn phòng cũng rất hợp, vì ESFJ có thể tổ chức công việc hàng ngày, hỗ trợ đội ngũ, và duy trì môi trường làm việc hài hòa. Họ cần công việc cho phép tương tác thường xuyên và tạo sự gắn kết.'
    },
    {
      code: 'ISTP',
      name: 'Người thợ thủ công',
      value: 'ISTP (Người thợ thủ công): ISTP là những người thực tế, thích hành động, và giỏi giải quyết vấn đề kỹ thuật. Họ độc lập, linh hoạt, và có tay nghề cao trong việc xử lý công cụ hoặc hệ thống. Trong doanh nghiệp, ISTP phù hợp làm kỹ sư hệ thống, nơi họ có thể bảo trì máy chủ, sửa chữa thiết bị, và đảm bảo công nghệ hoạt động ổn định với cách tiếp cận thực tiễn. Họ cũng giỏi làm chuyên viên IT, nhờ khả năng xử lý sự cố mạng, cài đặt phần mềm, và thích nghi nhanh với các vấn đề kỹ thuật bất ngờ. Vai trò quản lý bảo trì thiết bị cũng lý tưởng, vì ISTP có thể giám sát máy móc, thực hiện bảo dưỡng định kỳ, và tối ưu hóa hiệu suất sản xuất. Họ thích công việc cụ thể, nơi họ có thể thấy kết quả tức thì từ nỗ lực của mình.'
    },
    {
      code: 'ISFP',
      name: 'Người nghệ sĩ',
      value: 'ISFP (Người nghệ sĩ): ISFP là những người sáng tạo, nhạy cảm, và thích làm việc tự do. Họ có con mắt thẩm mỹ, chú trọng chi tiết trực quan, và sống trong hiện tại. Trong doanh nghiệp, ISFP phát huy khi làm nhà thiết kế đồ họa, nơi họ có thể tạo ra logo, banner, hoặc hình ảnh thương hiệu đẹp mắt, phản ánh phong cách riêng và thu hút khách hàng. Họ cũng phù hợp làm chuyên viên truyền thông hình ảnh, nhờ khả năng sản xuất video, ảnh, hoặc nội dung trực quan để quảng bá sản phẩm một cách nghệ thuật. Vai trò nhân viên tổ chức sự kiện cũng rất hợp, vì ISFP có thể thiết kế không gian sự kiện sáng tạo, mang lại trải nghiệm độc đáo và cảm xúc cho người tham dự. Họ cần môi trường linh hoạt, nơi họ có thể thể hiện cá tính và tài năng.'
    },
    {
      code: 'ESTP',
      name: 'Người hành động',
      value: 'ESTP (Người hành động): ESTP là những người năng động, thực tế, và thích rủi ro. Họ giỏi ứng biến, hành động nhanh, và luôn tìm kiếm cơ hội trong hiện tại. Trong doanh nghiệp, ESTP phù hợp làm nhân viên kinh doanh, nơi họ có thể đàm phán hợp đồng, thuyết phục khách hàng, và chốt giao dịch với sự tự tin và tốc độ. Họ cũng giỏi làm quản lý bán lẻ, nhờ khả năng xử lý tình huống tại cửa hàng, tối ưu hóa trải nghiệm khách hàng, và điều chỉnh chiến lược bán hàng ngay lập tức. Vai trò chuyên viên đàm phán hợp đồng cũng lý tưởng, vì ESTP có thể thương lượng với đối tác, đạt thỏa thuận có lợi, và thích nghi với các tình huống bất ngờ. Họ phát huy tốt trong môi trường cạnh tranh, nơi họ có thể hành động và thấy kết quả nhanh chóng.'
    },
    {
      code: 'ESFP',
      name: 'Người biểu diễn',
      value: 'ESFP (Người biểu diễn): ESFP là những người vui vẻ, nhiệt tình, và yêu thích giao tiếp. Họ sống trong hiện tại, giỏi tạo không khí tích cực, và có sức hút tự nhiên. Trong doanh nghiệp, ESFP lý tưởng làm nhân viên tiếp thị sự kiện, nơi họ có thể tổ chức các buổi ra mắt sản phẩm, hội thảo, hoặc hoạt động quảng bá đầy năng lượng, thu hút sự chú ý của khách hàng. Họ cũng phù hợp làm chuyên viên chăm sóc khách hàng, nhờ khả năng giao tiếp thân thiện, giải quyết vấn đề nhanh, và mang lại ấn tượng tốt cho doanh nghiệp. Vai trò nhân viên bán hàng trực tiếp cũng rất hợp, vì ESFP có thể sử dụng sự cuốn hút để thuyết phục khách hàng, tạo mối quan hệ tức thì, và tăng doanh số. Họ cần công việc năng động, nơi họ có thể tương tác và lan tỏa niềm vui.'
    }
  ]

  const navigate = useNavigate()
  const [formData, setFormData] = useState(initFormData)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    console.log('arrToRequest', arrToRequest);
    event.preventDefault();

    const dataTarget = new FormData(event.target);
    const data = {
      'name': dataTarget.get('name'),
      'email': dataTarget.get('email'),
      'phone': dataTarget.get('phoneNumber'),
    };

    if (!validate.emailPattern.test(data.email)) {
      toast.error('Email không hợp lệ!');
      return;
    }

    if (!validate.phonePattern.test(data.phone)) {
      toast.error('Số điện thoại không hợp lệ!');
      return;
    }

    if (answeredQuestions.length < totalQuestions) {
      toast.error('Vui lòng trả lời hết các câu hỏi!');
      return;
    }
    let acc = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0
    };

    let total = 0;
    const countMap = arrToRequest.reduce((acc, item) => {
      const type = item.resultPersonalityType;
      // Tăng số lần xuất hiện của loại trong acc
      acc[type] = (acc[type] || 0) + 1;
      total += 1;
      return acc;
    }, {});

    const getPersonalityType = (countMap) => {
      // Mảng các cặp ký tự cần so sánh
      const pairs = [
        ['E', 'I'],  // E hoặc I
        ['S', 'N'],  // S hoặc N
        ['T', 'F'],  // T hoặc F
        ['J', 'P']   // J hoặc P
      ];

      // Kết quả là một chuỗi
      let result = '';

      // Duyệt qua các cặp và chọn chữ cái có số lần xuất hiện cao nhất
      for (const [first, second] of pairs) {
        if (countMap[first] >= countMap[second]) {
          result += first;
        } else {
          result += second;
        }
      }

      return result;
    };

    const personalityType = getPersonalityType(countMap);

    const filteredResults = dataResult.filter(el => {
      // Define your filter criteria here. For example:
      return el.code === personalityType; // Filtering based on code
    });
    console.log('filteredResults', filteredResults);
    const result = {
      username: data.name,
      phone: data.phone,
      email: data.email,
      chart: [
        {
          resultScore: {
            name: 'Hướng ngoại',
            ratioScore: (countMap.E / countMap.E + countMap.I) * 100,
          },
        },
        {
          resultScore: {
            name: 'Hướng nội',
            ratioScore: (countMap.I / countMap.E + countMap.I) * 100,
          },
        },
        {
          resultScore: {
            name: 'Giác quan',
            ratioScore: (countMap.S / countMap.S + countMap.N) * 100,
          },
        },
        {
          resultScore: {
            name: 'Trực giác',
            ratioScore: (countMap.N / countMap.S + countMap.N) * 100,
          },
        },
        {
          resultScore: {
            name: 'Lý trí',
            ratioScore: (countMap.T / countMap.T + countMap.F) * 100,
          },
        },
        {
          resultScore: {
            name: 'Cảm xúc',
            ratioScore: (countMap.F / countMap.T + countMap.F) * 100,
          },
        },
        {
          resultScore: {
            name: 'Nguyên tắc',
            ratioScore: (countMap.J / countMap.J + countMap.P) * 100,
          },
        },
        {
          resultScore: {
            name: 'Linh hoạt',
            ratioScore: (countMap.P / countMap.J + countMap.P) * 100,
          },
        },
      ],
      value: filteredResults
    };

    navigate(routes.RESULT_HOLLAND, { state: { result: result } });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '100%', border: '1px solid #7bb151', borderRadius: '30px', padding: 3, bgcolor: 'white' }}>
              <Box sx={{ typography: 'h4', mb: 2, color: '#7bb151' }}>
                Thông tin cá nhân
              </Box>
              <TextField sx={{ width: '100%', mb: 2 }} value={formData.name} name='name' onChange={handleChange} required id="outlined-basic" label="Họ và tên" variant="outlined" />
              <TextField sx={{ width: '100%', mb: 2 }} value={formData.email} name='email' onChange={handleChange} required id="outlined-basic" label="Email" variant="outlined" />
              <TextField sx={{ width: '100%', mb: 2 }} value={formData.phoneNumber} name='phoneNumber' onChange={handleChange} required id="outlined-basic" label="Số điện thoại" variant="outlined" />
              <Box className='submit-test-button-container' >
                <Button type='submit' variant="contained" color="primary" className="submit-test-button" >Nộp bài</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </Modal>

  )
}