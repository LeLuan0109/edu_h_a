import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, Modal, TextField, Typography, MenuItem } from '@mui/material'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { routes } from '~/utils/constants'
import { useEffect } from 'react'
import ResultChartHolland from '~/components/resultChartHolland/ResultChartHolland.jsx'
import imgCoreValue from '~/assets/image/card3.png'
import './ResultTestHolland.css'
import { Helmet } from 'react-helmet'
import ENFJ from '~/assets/image/ENFJ.png'
import ENFP from '~/assets/image/ENFP.png'
import ENTJ from '~/assets/image/ENTJ.png'
import ENTP from '~/assets/image/ENTP.png'

import ESFJ from '~/assets/image/ESFJ.png'
import ESFP from '~/assets/image/ESFP.png'
import ESTJ from '~/assets/image/ESTJ.png'

import ESTP from '~/assets/image/ESTP.png'
import INFJ from '~/assets/image/INFJ.png'
import INFP from '~/assets/image/INFP.png'
import INTJ from '~/assets/image/INTJ.png'
import INTP from '~/assets/image/INTP.png'
import ISFJ from '~/assets/image/ISFJ.png'
import ISFP from '~/assets/image/ISFP.png'
import ISTJ from '~/assets/image/ISTJ.png'
import ISTP from '~/assets/image/ISTP.png'

import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '~/firebase';  // file bạn config firestore instance

export const mbtiImages = {
  ENFJ,
  ENFP,
  ENTJ,
  ENTP,
  ESFJ,
  ESFP,
  ESTJ,
  ESTP,
  INFJ,
  INFP,
  INTJ,
  INTP,
  ISFJ,
  ISFP,
  ISTJ,
  ISTP,
}

export const dataMbtiResult = [
  {
    id: 1,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 2,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 3,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 4,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 5,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 6,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 7,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 8,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 9,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 10,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 11,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 12,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 13,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 14,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 15,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 16,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 17,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 18,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 19,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 20,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 21,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 22,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 23,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 24,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 25,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 26,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 27,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 28,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 29,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 30,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 31,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 32,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 33,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 34,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 35,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 36,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 37,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 38,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 39,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 40,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 41,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 42,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 43,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 44,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 45,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 46,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 47,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 48,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 49,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 50,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 51,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 52,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 53,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 54,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 55,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 56,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 57,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 58,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 59,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 60,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 61,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 62,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 63,
    study: 'Công nghệ thông tin',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 64,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 65,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 66,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 67,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 68,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 69,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 70,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 71,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 72,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 73,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 74,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 75,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 76,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 77,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 78,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 79,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 80,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 81,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 82,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 83,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 84,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 85,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 86,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 87,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 88,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 89,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 90,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 91,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 92,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 93,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 94,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 95,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 96,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 97,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 98,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 99,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 100,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 101,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 102,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 103,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 104,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 105,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 106,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 107,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 108,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 109,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 110,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 111,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 112,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 113,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 114,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 115,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 116,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 117,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 118,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 119,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 120,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 121,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 122,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 123,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 124,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 125,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 126,
    study: 'Kinh doanh quốc tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 127,
    study: 'Marketing',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 128,
    study: 'Marketing',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 129,
    study: 'Marketing',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 130,
    study: 'Marketing',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 131,
    study: 'Marketing',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 132,
    study: 'Marketing',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 133,
    study: 'Marketing',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 134,
    study: 'Marketing',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 135,
    study: 'Marketing',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 136,
    study: 'Marketing',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 137,
    study: 'Marketing',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 138,
    study: 'Marketing',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 139,
    study: 'Marketing',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 140,
    study: 'Marketing',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 141,
    study: 'Marketing',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 142,
    study: 'Marketing',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 143,
    study: 'Marketing',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 144,
    study: 'Marketing',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 145,
    study: 'Marketing',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 146,
    study: 'Marketing',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 147,
    study: 'Marketing',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 148,
    study: 'Marketing',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 149,
    study: 'Marketing',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 150,
    study: 'Marketing',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 151,
    study: 'Marketing',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 152,
    study: 'Marketing',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 153,
    study: 'Marketing',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 154,
    study: 'Marketing',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 155,
    study: 'Marketing',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 156,
    study: 'Marketing',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 157,
    study: 'Marketing',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 158,
    study: 'Marketing',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 159,
    study: 'Marketing',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 160,
    study: 'Marketing',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 161,
    study: 'Marketing',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 162,
    study: 'Marketing',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 163,
    study: 'Marketing',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 164,
    study: 'Marketing',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 165,
    study: 'Marketing',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 166,
    study: 'Marketing',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 167,
    study: 'Marketing',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 168,
    study: 'Marketing',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 169,
    study: 'Marketing',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 170,
    study: 'Marketing',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 171,
    study: 'Marketing',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 172,
    study: 'Marketing',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 173,
    study: 'Marketing',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 174,
    study: 'Marketing',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 175,
    study: 'Marketing',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 176,
    study: 'Marketing',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 177,
    study: 'Marketing',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 178,
    study: 'Marketing',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 179,
    study: 'Marketing',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 180,
    study: 'Marketing',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 181,
    study: 'Marketing',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 182,
    study: 'Marketing',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 183,
    study: 'Marketing',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 184,
    study: 'Marketing',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 185,
    study: 'Marketing',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 186,
    study: 'Marketing',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 187,
    study: 'Marketing',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 188,
    study: 'Marketing',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 189,
    study: 'Marketing',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 190,
    study: 'Kế toán',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 191,
    study: 'Kế toán',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 192,
    study: 'Kế toán',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 193,
    study: 'Kế toán',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 194,
    study: 'Kế toán',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 195,
    study: 'Kế toán',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 196,
    study: 'Kế toán',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 197,
    study: 'Kế toán',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 198,
    study: 'Kế toán',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 199,
    study: 'Kế toán',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 200,
    study: 'Kế toán',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 201,
    study: 'Kế toán',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 202,
    study: 'Kế toán',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 203,
    study: 'Kế toán',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 204,
    study: 'Kế toán',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 205,
    study: 'Kế toán',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 206,
    study: 'Kế toán',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 207,
    study: 'Kế toán',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 208,
    study: 'Kế toán',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 209,
    study: 'Kế toán',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 210,
    study: 'Kế toán',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 211,
    study: 'Kế toán',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 212,
    study: 'Kế toán',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 213,
    study: 'Kế toán',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 214,
    study: 'Kế toán',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 215,
    study: 'Kế toán',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 216,
    study: 'Kế toán',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 217,
    study: 'Kế toán',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 218,
    study: 'Kế toán',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 219,
    study: 'Kế toán',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 220,
    study: 'Kế toán',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 221,
    study: 'Kế toán',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 222,
    study: 'Kế toán',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 223,
    study: 'Kế toán',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 224,
    study: 'Kế toán',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 225,
    study: 'Kế toán',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 226,
    study: 'Kế toán',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 227,
    study: 'Kế toán',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 228,
    study: 'Kế toán',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 229,
    study: 'Kế toán',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 230,
    study: 'Kế toán',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 231,
    study: 'Kế toán',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 232,
    study: 'Kế toán',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 233,
    study: 'Kế toán',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 234,
    study: 'Kế toán',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 235,
    study: 'Kế toán',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 236,
    study: 'Kế toán',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 237,
    study: 'Kế toán',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 238,
    study: 'Kế toán',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 239,
    study: 'Kế toán',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 240,
    study: 'Kế toán',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 241,
    study: 'Kế toán',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 242,
    study: 'Kế toán',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 243,
    study: 'Kế toán',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 244,
    study: 'Kế toán',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 245,
    study: 'Kế toán',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 246,
    study: 'Kế toán',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 247,
    study: 'Kế toán',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 248,
    study: 'Kế toán',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 249,
    study: 'Kế toán',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 250,
    study: 'Kế toán',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 251,
    study: 'Kế toán',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 252,
    study: 'Kế toán',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 253,
    study: 'Tài chính',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 254,
    study: 'Tài chính',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 255,
    study: 'Tài chính',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 256,
    study: 'Tài chính',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 257,
    study: 'Tài chính',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 258,
    study: 'Tài chính',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 259,
    study: 'Tài chính',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 260,
    study: 'Tài chính',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 261,
    study: 'Tài chính',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 262,
    study: 'Tài chính',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 263,
    study: 'Tài chính',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 264,
    study: 'Tài chính',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 265,
    study: 'Tài chính',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 266,
    study: 'Tài chính',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 267,
    study: 'Tài chính',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 268,
    study: 'Tài chính',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 269,
    study: 'Tài chính',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 270,
    study: 'Tài chính',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 271,
    study: 'Tài chính',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 272,
    study: 'Tài chính',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 273,
    study: 'Tài chính',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 274,
    study: 'Tài chính',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 275,
    study: 'Tài chính',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 276,
    study: 'Tài chính',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 277,
    study: 'Tài chính',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 278,
    study: 'Tài chính',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 279,
    study: 'Tài chính',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 280,
    study: 'Tài chính',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 281,
    study: 'Tài chính',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 282,
    study: 'Tài chính',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 283,
    study: 'Tài chính',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 284,
    study: 'Tài chính',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 285,
    study: 'Tài chính',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 286,
    study: 'Tài chính',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 287,
    study: 'Tài chính',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 288,
    study: 'Tài chính',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 289,
    study: 'Tài chính',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 290,
    study: 'Tài chính',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 291,
    study: 'Tài chính',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 292,
    study: 'Tài chính',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 293,
    study: 'Tài chính',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 294,
    study: 'Tài chính',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 295,
    study: 'Tài chính',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 296,
    study: 'Tài chính',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 297,
    study: 'Tài chính',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 298,
    study: 'Tài chính',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 299,
    study: 'Tài chính',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 300,
    study: 'Tài chính',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 301,
    study: 'Tài chính',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 302,
    study: 'Tài chính',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 303,
    study: 'Tài chính',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 304,
    study: 'Tài chính',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 305,
    study: 'Tài chính',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 306,
    study: 'Tài chính',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 307,
    study: 'Tài chính',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 308,
    study: 'Tài chính',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 309,
    study: 'Tài chính',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 310,
    study: 'Tài chính',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 311,
    study: 'Tài chính',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 312,
    study: 'Tài chính',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 313,
    study: 'Tài chính',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 314,
    study: 'Tài chính',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 315,
    study: 'Tài chính',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 316,
    study: 'Cơ điện tử',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 317,
    study: 'Cơ điện tử',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 318,
    study: 'Cơ điện tử',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 319,
    study: 'Cơ điện tử',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 320,
    study: 'Cơ điện tử',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 321,
    study: 'Cơ điện tử',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 322,
    study: 'Cơ điện tử',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 323,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 324,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 325,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 326,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 327,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 328,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 329,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 330,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 331,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 332,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 333,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 334,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 335,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 336,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 337,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 338,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 339,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 340,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 341,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 342,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 343,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 344,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 345,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 346,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 347,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 348,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 349,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 350,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 351,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 352,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 353,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 354,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 355,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 356,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 357,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 358,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 359,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 360,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 361,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 362,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 363,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 364,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 365,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 366,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 367,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 368,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 369,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 370,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 371,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 372,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 373,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 374,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 375,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 376,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 377,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 378,
    study: 'Cơ điện tử',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 379,
    study: 'Tự động hóa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 380,
    study: 'Tự động hóa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 381,
    study: 'Tự động hóa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 382,
    study: 'Tự động hóa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 383,
    study: 'Tự động hóa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 384,
    study: 'Tự động hóa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 385,
    study: 'Tự động hóa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 386,
    study: 'Tự động hóa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 387,
    study: 'Tự động hóa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 388,
    study: 'Tự động hóa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 389,
    study: 'Tự động hóa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 390,
    study: 'Tự động hóa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 391,
    study: 'Tự động hóa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 392,
    study: 'Tự động hóa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 393,
    study: 'Tự động hóa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 394,
    study: 'Tự động hóa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 395,
    study: 'Tự động hóa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 396,
    study: 'Tự động hóa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 397,
    study: 'Tự động hóa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 398,
    study: 'Tự động hóa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 399,
    study: 'Tự động hóa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 400,
    study: 'Tự động hóa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 401,
    study: 'Tự động hóa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 402,
    study: 'Tự động hóa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 403,
    study: 'Tự động hóa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 404,
    study: 'Tự động hóa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 405,
    study: 'Tự động hóa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 406,
    study: 'Tự động hóa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 407,
    study: 'Tự động hóa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 408,
    study: 'Tự động hóa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 409,
    study: 'Tự động hóa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 410,
    study: 'Tự động hóa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 411,
    study: 'Tự động hóa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 412,
    study: 'Tự động hóa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 413,
    study: 'Tự động hóa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 414,
    study: 'Tự động hóa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 415,
    study: 'Tự động hóa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 416,
    study: 'Tự động hóa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 417,
    study: 'Tự động hóa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 418,
    study: 'Tự động hóa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 419,
    study: 'Tự động hóa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 420,
    study: 'Tự động hóa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 421,
    study: 'Tự động hóa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 422,
    study: 'Tự động hóa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 423,
    study: 'Tự động hóa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 424,
    study: 'Tự động hóa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 425,
    study: 'Tự động hóa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 426,
    study: 'Tự động hóa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 427,
    study: 'Tự động hóa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 428,
    study: 'Tự động hóa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 429,
    study: 'Tự động hóa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 430,
    study: 'Tự động hóa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 431,
    study: 'Tự động hóa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 432,
    study: 'Tự động hóa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 433,
    study: 'Tự động hóa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 434,
    study: 'Tự động hóa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 435,
    study: 'Tự động hóa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 436,
    study: 'Tự động hóa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 437,
    study: 'Tự động hóa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 438,
    study: 'Tự động hóa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 439,
    study: 'Tự động hóa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 440,
    study: 'Tự động hóa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 441,
    study: 'Tự động hóa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 442,
    study: 'Xây dựng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 443,
    study: 'Xây dựng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 444,
    study: 'Xây dựng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 445,
    study: 'Xây dựng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 446,
    study: 'Xây dựng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 447,
    study: 'Xây dựng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 448,
    study: 'Xây dựng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 449,
    study: 'Xây dựng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 450,
    study: 'Xây dựng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 451,
    study: 'Xây dựng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 452,
    study: 'Xây dựng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 453,
    study: 'Xây dựng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 454,
    study: 'Xây dựng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 455,
    study: 'Xây dựng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 456,
    study: 'Xây dựng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 457,
    study: 'Xây dựng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 458,
    study: 'Xây dựng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 459,
    study: 'Xây dựng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 460,
    study: 'Xây dựng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 461,
    study: 'Xây dựng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 462,
    study: 'Xây dựng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 463,
    study: 'Xây dựng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 464,
    study: 'Xây dựng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 465,
    study: 'Xây dựng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 466,
    study: 'Xây dựng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 467,
    study: 'Xây dựng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 468,
    study: 'Xây dựng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 469,
    study: 'Xây dựng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 470,
    study: 'Xây dựng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 471,
    study: 'Xây dựng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 472,
    study: 'Xây dựng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 473,
    study: 'Xây dựng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 474,
    study: 'Xây dựng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 475,
    study: 'Xây dựng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 476,
    study: 'Xây dựng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 477,
    study: 'Xây dựng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 478,
    study: 'Xây dựng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 479,
    study: 'Xây dựng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 480,
    study: 'Xây dựng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 481,
    study: 'Xây dựng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 482,
    study: 'Xây dựng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 483,
    study: 'Xây dựng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 484,
    study: 'Xây dựng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 485,
    study: 'Xây dựng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 486,
    study: 'Xây dựng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 487,
    study: 'Xây dựng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 488,
    study: 'Xây dựng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 489,
    study: 'Xây dựng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 490,
    study: 'Xây dựng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 491,
    study: 'Xây dựng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 492,
    study: 'Xây dựng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 493,
    study: 'Xây dựng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 494,
    study: 'Xây dựng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 495,
    study: 'Xây dựng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 496,
    study: 'Xây dựng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 497,
    study: 'Xây dựng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 498,
    study: 'Xây dựng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 499,
    study: 'Xây dựng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 500,
    study: 'Xây dựng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 501,
    study: 'Xây dựng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 502,
    study: 'Xây dựng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 503,
    study: 'Xây dựng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 504,
    study: 'Xây dựng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 505,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 506,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 507,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 508,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 509,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 510,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 511,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 512,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 513,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 514,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 515,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 516,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 517,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 518,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 519,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 520,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 521,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 522,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 523,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 524,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 525,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 526,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 527,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 528,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 529,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 530,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 531,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 532,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 533,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 534,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 535,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 536,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 537,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 538,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 539,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 540,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 541,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 542,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 543,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 544,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 545,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 546,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 547,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 548,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 549,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 550,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 551,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 552,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 553,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 554,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 555,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 556,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 557,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 558,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 559,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 560,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 561,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 562,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 563,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 564,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 565,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 566,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 567,
    study: 'Kỹ thuật cơ khí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 568,
    study: 'Y đa khoa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 569,
    study: 'Y đa khoa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 570,
    study: 'Y đa khoa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 571,
    study: 'Y đa khoa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 572,
    study: 'Y đa khoa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 573,
    study: 'Y đa khoa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 574,
    study: 'Y đa khoa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 575,
    study: 'Y đa khoa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 576,
    study: 'Y đa khoa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 577,
    study: 'Y đa khoa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 578,
    study: 'Y đa khoa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 579,
    study: 'Y đa khoa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 580,
    study: 'Y đa khoa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 581,
    study: 'Y đa khoa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 582,
    study: 'Y đa khoa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 583,
    study: 'Y đa khoa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 584,
    study: 'Y đa khoa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 585,
    study: 'Y đa khoa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 586,
    study: 'Y đa khoa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 587,
    study: 'Y đa khoa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 588,
    study: 'Y đa khoa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 589,
    study: 'Y đa khoa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 590,
    study: 'Y đa khoa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 591,
    study: 'Y đa khoa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 592,
    study: 'Y đa khoa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 593,
    study: 'Y đa khoa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 594,
    study: 'Y đa khoa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 595,
    study: 'Y đa khoa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 596,
    study: 'Y đa khoa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 597,
    study: 'Y đa khoa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 598,
    study: 'Y đa khoa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 599,
    study: 'Y đa khoa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 600,
    study: 'Y đa khoa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 601,
    study: 'Y đa khoa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 602,
    study: 'Y đa khoa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 603,
    study: 'Y đa khoa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 604,
    study: 'Y đa khoa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 605,
    study: 'Y đa khoa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 606,
    study: 'Y đa khoa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 607,
    study: 'Y đa khoa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 608,
    study: 'Y đa khoa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 609,
    study: 'Y đa khoa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 610,
    study: 'Y đa khoa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 611,
    study: 'Y đa khoa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 612,
    study: 'Y đa khoa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 613,
    study: 'Y đa khoa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 614,
    study: 'Y đa khoa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 615,
    study: 'Y đa khoa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 616,
    study: 'Y đa khoa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 617,
    study: 'Y đa khoa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 618,
    study: 'Y đa khoa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 619,
    study: 'Y đa khoa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 620,
    study: 'Y đa khoa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 621,
    study: 'Y đa khoa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 622,
    study: 'Y đa khoa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 623,
    study: 'Y đa khoa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 624,
    study: 'Y đa khoa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 625,
    study: 'Y đa khoa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 626,
    study: 'Y đa khoa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 627,
    study: 'Y đa khoa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 628,
    study: 'Y đa khoa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 629,
    study: 'Y đa khoa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 630,
    study: 'Y đa khoa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 631,
    study: 'Điều dưỡng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 632,
    study: 'Điều dưỡng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 633,
    study: 'Điều dưỡng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 634,
    study: 'Điều dưỡng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 635,
    study: 'Điều dưỡng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 636,
    study: 'Điều dưỡng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 637,
    study: 'Điều dưỡng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 638,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 639,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 640,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 641,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 642,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 643,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 644,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 645,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 646,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 647,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 648,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 649,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 650,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 651,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 652,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 653,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 654,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 655,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 656,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 657,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 658,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 659,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 660,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 661,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 662,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 663,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 664,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 665,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 666,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 667,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 668,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 669,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 670,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 671,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 672,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 673,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 674,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 675,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 676,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 677,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 678,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 679,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 680,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 681,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 682,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 683,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 684,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 685,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 686,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 687,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 688,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 689,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 690,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 691,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 692,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 693,
    study: 'Điều dưỡng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 694,
    study: 'Dược học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 695,
    study: 'Dược học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 696,
    study: 'Dược học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 697,
    study: 'Dược học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 698,
    study: 'Dược học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 699,
    study: 'Dược học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 700,
    study: 'Dược học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 701,
    study: 'Dược học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 702,
    study: 'Dược học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 703,
    study: 'Dược học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 704,
    study: 'Dược học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 705,
    study: 'Dược học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 706,
    study: 'Dược học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 707,
    study: 'Dược học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 708,
    study: 'Dược học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 709,
    study: 'Dược học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 710,
    study: 'Dược học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 711,
    study: 'Dược học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 712,
    study: 'Dược học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 713,
    study: 'Dược học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 714,
    study: 'Dược học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 715,
    study: 'Dược học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 716,
    study: 'Dược học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 717,
    study: 'Dược học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 718,
    study: 'Dược học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 719,
    study: 'Dược học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 720,
    study: 'Dược học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 721,
    study: 'Dược học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 722,
    study: 'Dược học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 723,
    study: 'Dược học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 724,
    study: 'Dược học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 725,
    study: 'Dược học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 726,
    study: 'Dược học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 727,
    study: 'Dược học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 728,
    study: 'Dược học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 729,
    study: 'Dược học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 730,
    study: 'Dược học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 731,
    study: 'Dược học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 732,
    study: 'Dược học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 733,
    study: 'Dược học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 734,
    study: 'Dược học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 735,
    study: 'Dược học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 736,
    study: 'Dược học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 737,
    study: 'Dược học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 738,
    study: 'Dược học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 739,
    study: 'Dược học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 740,
    study: 'Dược học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 741,
    study: 'Dược học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 742,
    study: 'Dược học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 743,
    study: 'Dược học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 744,
    study: 'Dược học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 745,
    study: 'Dược học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 746,
    study: 'Dược học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 747,
    study: 'Dược học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 748,
    study: 'Dược học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 749,
    study: 'Dược học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 750,
    study: 'Dược học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 751,
    study: 'Dược học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 752,
    study: 'Dược học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 753,
    study: 'Dược học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 754,
    study: 'Dược học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 755,
    study: 'Dược học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 756,
    study: 'Dược học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 757,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 758,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 759,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 760,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 761,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 762,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 763,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 764,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 765,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 766,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 767,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 768,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 769,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 770,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 771,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 772,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 773,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 774,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 775,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 776,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 777,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 778,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 779,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 780,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 781,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 782,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 783,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 784,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 785,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 786,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 787,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 788,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 789,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 790,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 791,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 792,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 793,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 794,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 795,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 796,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 797,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 798,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 799,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 800,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 801,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 802,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 803,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 804,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 805,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 806,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 807,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 808,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 809,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 810,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 811,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 812,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 813,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 814,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 815,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 816,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 817,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 818,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 819,
    study: 'Kỹ thuật xét nghiệm',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 820,
    study: 'Tâm lý học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 821,
    study: 'Tâm lý học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 822,
    study: 'Tâm lý học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 823,
    study: 'Tâm lý học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 824,
    study: 'Tâm lý học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 825,
    study: 'Tâm lý học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 826,
    study: 'Tâm lý học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 827,
    study: 'Tâm lý học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 828,
    study: 'Tâm lý học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 829,
    study: 'Tâm lý học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 830,
    study: 'Tâm lý học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 831,
    study: 'Tâm lý học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 832,
    study: 'Tâm lý học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 833,
    study: 'Tâm lý học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 834,
    study: 'Tâm lý học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 835,
    study: 'Tâm lý học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 836,
    study: 'Tâm lý học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 837,
    study: 'Tâm lý học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 838,
    study: 'Tâm lý học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 839,
    study: 'Tâm lý học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 840,
    study: 'Tâm lý học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 841,
    study: 'Tâm lý học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 842,
    study: 'Tâm lý học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 843,
    study: 'Tâm lý học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 844,
    study: 'Tâm lý học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 845,
    study: 'Tâm lý học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 846,
    study: 'Tâm lý học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 847,
    study: 'Tâm lý học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 848,
    study: 'Tâm lý học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 849,
    study: 'Tâm lý học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 850,
    study: 'Tâm lý học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 851,
    study: 'Tâm lý học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 852,
    study: 'Tâm lý học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 853,
    study: 'Tâm lý học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 854,
    study: 'Tâm lý học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 855,
    study: 'Tâm lý học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 856,
    study: 'Tâm lý học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 857,
    study: 'Tâm lý học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 858,
    study: 'Tâm lý học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 859,
    study: 'Tâm lý học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 860,
    study: 'Tâm lý học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 861,
    study: 'Tâm lý học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 862,
    study: 'Tâm lý học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 863,
    study: 'Tâm lý học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 864,
    study: 'Tâm lý học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 865,
    study: 'Tâm lý học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 866,
    study: 'Tâm lý học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 867,
    study: 'Tâm lý học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 868,
    study: 'Tâm lý học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 869,
    study: 'Tâm lý học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 870,
    study: 'Tâm lý học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 871,
    study: 'Tâm lý học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 872,
    study: 'Tâm lý học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 873,
    study: 'Tâm lý học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 874,
    study: 'Tâm lý học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 875,
    study: 'Tâm lý học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 876,
    study: 'Tâm lý học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 877,
    study: 'Tâm lý học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 878,
    study: 'Tâm lý học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 879,
    study: 'Tâm lý học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 880,
    study: 'Tâm lý học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 881,
    study: 'Tâm lý học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 882,
    study: 'Tâm lý học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 883,
    study: 'Xã hội học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 884,
    study: 'Xã hội học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 885,
    study: 'Xã hội học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 886,
    study: 'Xã hội học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 887,
    study: 'Xã hội học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 888,
    study: 'Xã hội học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 889,
    study: 'Xã hội học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 890,
    study: 'Xã hội học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 891,
    study: 'Xã hội học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 892,
    study: 'Xã hội học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 893,
    study: 'Xã hội học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 894,
    study: 'Xã hội học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 895,
    study: 'Xã hội học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 896,
    study: 'Xã hội học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 897,
    study: 'Xã hội học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 898,
    study: 'Xã hội học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 899,
    study: 'Xã hội học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 900,
    study: 'Xã hội học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 901,
    study: 'Xã hội học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 902,
    study: 'Xã hội học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 903,
    study: 'Xã hội học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 904,
    study: 'Xã hội học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 905,
    study: 'Xã hội học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 906,
    study: 'Xã hội học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 907,
    study: 'Xã hội học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 908,
    study: 'Xã hội học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 909,
    study: 'Xã hội học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 910,
    study: 'Xã hội học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 911,
    study: 'Xã hội học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 912,
    study: 'Xã hội học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 913,
    study: 'Xã hội học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 914,
    study: 'Xã hội học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 915,
    study: 'Xã hội học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 916,
    study: 'Xã hội học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 917,
    study: 'Xã hội học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 918,
    study: 'Xã hội học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 919,
    study: 'Xã hội học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 920,
    study: 'Xã hội học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 921,
    study: 'Xã hội học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 922,
    study: 'Xã hội học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 923,
    study: 'Xã hội học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 924,
    study: 'Xã hội học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 925,
    study: 'Xã hội học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 926,
    study: 'Xã hội học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 927,
    study: 'Xã hội học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 928,
    study: 'Xã hội học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 929,
    study: 'Xã hội học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 930,
    study: 'Xã hội học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 931,
    study: 'Xã hội học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 932,
    study: 'Xã hội học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 933,
    study: 'Xã hội học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 934,
    study: 'Xã hội học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 935,
    study: 'Xã hội học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 936,
    study: 'Xã hội học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 937,
    study: 'Xã hội học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 938,
    study: 'Xã hội học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 939,
    study: 'Xã hội học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 940,
    study: 'Xã hội học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 941,
    study: 'Xã hội học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 942,
    study: 'Xã hội học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 943,
    study: 'Xã hội học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 944,
    study: 'Xã hội học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 945,
    study: 'Xã hội học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 946,
    study: 'Giáo dục học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 947,
    study: 'Giáo dục học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 948,
    study: 'Giáo dục học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 949,
    study: 'Giáo dục học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 950,
    study: 'Giáo dục học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 951,
    study: 'Giáo dục học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 952,
    study: 'Giáo dục học',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 953,
    study: 'Giáo dục học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 954,
    study: 'Giáo dục học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 955,
    study: 'Giáo dục học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 956,
    study: 'Giáo dục học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 957,
    study: 'Giáo dục học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 958,
    study: 'Giáo dục học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 959,
    study: 'Giáo dục học',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 960,
    study: 'Giáo dục học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 961,
    study: 'Giáo dục học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 962,
    study: 'Giáo dục học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 963,
    study: 'Giáo dục học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 964,
    study: 'Giáo dục học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 965,
    study: 'Giáo dục học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 966,
    study: 'Giáo dục học',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 967,
    study: 'Giáo dục học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 968,
    study: 'Giáo dục học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 969,
    study: 'Giáo dục học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 970,
    study: 'Giáo dục học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 971,
    study: 'Giáo dục học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 972,
    study: 'Giáo dục học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 973,
    study: 'Giáo dục học',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 974,
    study: 'Giáo dục học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 975,
    study: 'Giáo dục học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 976,
    study: 'Giáo dục học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 977,
    study: 'Giáo dục học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 978,
    study: 'Giáo dục học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 979,
    study: 'Giáo dục học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 980,
    study: 'Giáo dục học',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 981,
    study: 'Giáo dục học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 982,
    study: 'Giáo dục học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 983,
    study: 'Giáo dục học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 984,
    study: 'Giáo dục học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 985,
    study: 'Giáo dục học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 986,
    study: 'Giáo dục học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 987,
    study: 'Giáo dục học',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 988,
    study: 'Giáo dục học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 989,
    study: 'Giáo dục học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 990,
    study: 'Giáo dục học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 991,
    study: 'Giáo dục học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 992,
    study: 'Giáo dục học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 993,
    study: 'Giáo dục học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 994,
    study: 'Giáo dục học',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 995,
    study: 'Giáo dục học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 996,
    study: 'Giáo dục học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 997,
    study: 'Giáo dục học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 998,
    study: 'Giáo dục học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 999,
    study: 'Giáo dục học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1000,
    study: 'Giáo dục học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1001,
    study: 'Giáo dục học',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1002,
    study: 'Giáo dục học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1003,
    study: 'Giáo dục học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1004,
    study: 'Giáo dục học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1005,
    study: 'Giáo dục học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1006,
    study: 'Giáo dục học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1007,
    study: 'Giáo dục học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1008,
    study: 'Giáo dục học',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1009,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1010,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1011,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1012,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1013,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1014,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1015,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1016,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1017,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1018,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1019,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1020,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1021,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1022,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1023,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1024,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1025,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1026,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1027,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1028,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1029,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1030,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1031,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1032,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1033,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1034,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1035,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1036,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1037,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1038,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1039,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1040,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1041,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1042,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1043,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1044,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1045,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1046,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1047,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1048,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1049,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1050,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1051,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1052,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1053,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1054,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1055,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1056,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1057,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1058,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1059,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1060,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1061,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1062,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1063,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1064,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1065,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1066,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1067,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1068,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1069,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1070,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1071,
    study: 'Thiết kế đồ họa',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1072,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1073,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1074,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1075,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1076,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1077,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1078,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1079,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1080,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1081,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1082,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1083,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1084,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1085,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1086,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1087,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1088,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1089,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1090,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1091,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1092,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1093,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1094,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1095,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1096,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1097,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1098,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1099,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1100,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1101,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1102,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1103,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1104,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1105,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1106,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1107,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1108,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1109,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1110,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1111,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1112,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1113,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1114,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1115,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1116,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1117,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1118,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1119,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1120,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1121,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1122,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1123,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1124,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1125,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1126,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1127,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1128,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1129,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1130,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1131,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1132,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1133,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1134,
    study: 'Mỹ thuật công nghiệp',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1135,
    study: 'Âm nhạc',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1136,
    study: 'Âm nhạc',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1137,
    study: 'Âm nhạc',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1138,
    study: 'Âm nhạc',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1139,
    study: 'Âm nhạc',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1140,
    study: 'Âm nhạc',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1141,
    study: 'Âm nhạc',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1142,
    study: 'Âm nhạc',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1143,
    study: 'Âm nhạc',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1144,
    study: 'Âm nhạc',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1145,
    study: 'Âm nhạc',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1146,
    study: 'Âm nhạc',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1147,
    study: 'Âm nhạc',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1148,
    study: 'Âm nhạc',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1149,
    study: 'Âm nhạc',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1150,
    study: 'Âm nhạc',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1151,
    study: 'Âm nhạc',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1152,
    study: 'Âm nhạc',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1153,
    study: 'Âm nhạc',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1154,
    study: 'Âm nhạc',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1155,
    study: 'Âm nhạc',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1156,
    study: 'Âm nhạc',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1157,
    study: 'Âm nhạc',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1158,
    study: 'Âm nhạc',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1159,
    study: 'Âm nhạc',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1160,
    study: 'Âm nhạc',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1161,
    study: 'Âm nhạc',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1162,
    study: 'Âm nhạc',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1163,
    study: 'Âm nhạc',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1164,
    study: 'Âm nhạc',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1165,
    study: 'Âm nhạc',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1166,
    study: 'Âm nhạc',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1167,
    study: 'Âm nhạc',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1168,
    study: 'Âm nhạc',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1169,
    study: 'Âm nhạc',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1170,
    study: 'Âm nhạc',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1171,
    study: 'Âm nhạc',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1172,
    study: 'Âm nhạc',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1173,
    study: 'Âm nhạc',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1174,
    study: 'Âm nhạc',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1175,
    study: 'Âm nhạc',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1176,
    study: 'Âm nhạc',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1177,
    study: 'Âm nhạc',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1178,
    study: 'Âm nhạc',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1179,
    study: 'Âm nhạc',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1180,
    study: 'Âm nhạc',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1181,
    study: 'Âm nhạc',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1182,
    study: 'Âm nhạc',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1183,
    study: 'Âm nhạc',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1184,
    study: 'Âm nhạc',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1185,
    study: 'Âm nhạc',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1186,
    study: 'Âm nhạc',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1187,
    study: 'Âm nhạc',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1188,
    study: 'Âm nhạc',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1189,
    study: 'Âm nhạc',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1190,
    study: 'Âm nhạc',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1191,
    study: 'Âm nhạc',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1192,
    study: 'Âm nhạc',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1193,
    study: 'Âm nhạc',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1194,
    study: 'Âm nhạc',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1195,
    study: 'Âm nhạc',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1196,
    study: 'Âm nhạc',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1197,
    study: 'Âm nhạc',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1198,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1199,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1200,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1201,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1202,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1203,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1204,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1205,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1206,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1207,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1208,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1209,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1210,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1211,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1212,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1213,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1214,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1215,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1216,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1217,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1218,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1219,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1220,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1221,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1222,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1223,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1224,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1225,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1226,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1227,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1228,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1229,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1230,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1231,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1232,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1233,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1234,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1235,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1236,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1237,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1238,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1239,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1240,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1241,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1242,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1243,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1244,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1245,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1246,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1247,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1248,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1249,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1250,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1251,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1252,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1253,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1254,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1255,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1256,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1257,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1258,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1259,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1260,
    study: 'Ngôn ngữ Anh',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1261,
    study: 'Báo chí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1262,
    study: 'Báo chí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1263,
    study: 'Báo chí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1264,
    study: 'Báo chí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1265,
    study: 'Báo chí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1266,
    study: 'Báo chí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1267,
    study: 'Báo chí',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1268,
    study: 'Báo chí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1269,
    study: 'Báo chí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1270,
    study: 'Báo chí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1271,
    study: 'Báo chí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1272,
    study: 'Báo chí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1273,
    study: 'Báo chí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1274,
    study: 'Báo chí',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1275,
    study: 'Báo chí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1276,
    study: 'Báo chí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1277,
    study: 'Báo chí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1278,
    study: 'Báo chí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1279,
    study: 'Báo chí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1280,
    study: 'Báo chí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1281,
    study: 'Báo chí',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1282,
    study: 'Báo chí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1283,
    study: 'Báo chí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1284,
    study: 'Báo chí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1285,
    study: 'Báo chí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1286,
    study: 'Báo chí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1287,
    study: 'Báo chí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1288,
    study: 'Báo chí',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1289,
    study: 'Báo chí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1290,
    study: 'Báo chí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1291,
    study: 'Báo chí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1292,
    study: 'Báo chí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1293,
    study: 'Báo chí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1294,
    study: 'Báo chí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1295,
    study: 'Báo chí',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1296,
    study: 'Báo chí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1297,
    study: 'Báo chí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1298,
    study: 'Báo chí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1299,
    study: 'Báo chí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1300,
    study: 'Báo chí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1301,
    study: 'Báo chí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1302,
    study: 'Báo chí',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1303,
    study: 'Báo chí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1304,
    study: 'Báo chí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1305,
    study: 'Báo chí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1306,
    study: 'Báo chí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1307,
    study: 'Báo chí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1308,
    study: 'Báo chí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1309,
    study: 'Báo chí',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1310,
    study: 'Báo chí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1311,
    study: 'Báo chí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1312,
    study: 'Báo chí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1313,
    study: 'Báo chí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1314,
    study: 'Báo chí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1315,
    study: 'Báo chí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1316,
    study: 'Báo chí',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1317,
    study: 'Báo chí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1318,
    study: 'Báo chí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1319,
    study: 'Báo chí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1320,
    study: 'Báo chí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1321,
    study: 'Báo chí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1322,
    study: 'Báo chí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1323,
    study: 'Báo chí',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1324,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1325,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1326,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1327,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1328,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1329,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1330,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1331,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1332,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1333,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1334,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1335,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1336,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1337,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1338,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1339,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1340,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1341,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1342,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1343,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1344,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1345,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1346,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1347,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1348,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1349,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1350,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1351,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1352,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1353,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1354,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1355,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1356,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1357,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1358,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1359,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1360,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1361,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1362,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1363,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1364,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1365,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1366,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1367,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1368,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1369,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1370,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1371,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1372,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1373,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1374,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1375,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1376,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1377,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1378,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1379,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1380,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1381,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1382,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1383,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1384,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1385,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1386,
    study: 'Quan hệ công chúng',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1387,
    study: 'Luật kinh tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1388,
    study: 'Luật kinh tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1389,
    study: 'Luật kinh tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1390,
    study: 'Luật kinh tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1391,
    study: 'Luật kinh tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1392,
    study: 'Luật kinh tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1393,
    study: 'Luật kinh tế',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1394,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1395,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1396,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1397,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1398,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1399,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1400,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1401,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1402,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1403,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1404,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1405,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1406,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1407,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1408,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1409,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1410,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1411,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1412,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1413,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1414,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1415,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1416,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1417,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1418,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1419,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1420,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1421,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1422,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1423,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1424,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1425,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1426,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1427,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1428,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1429,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1430,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Workshop Điện ảnh độc lập',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink: 'https://www.eeas.europa.eu/euffvietnam2024-workshop1_vi',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1431,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1432,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1433,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1434,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1435,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1436,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1437,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1438,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1439,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1440,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1441,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1442,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1443,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1444,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1445,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1446,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1447,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1448,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1449,
    study: 'Luật kinh tế',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1450,
    study: 'Hành chính công',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1451,
    study: 'Hành chính công',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1452,
    study: 'Hành chính công',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1453,
    study: 'Hành chính công',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1454,
    study: 'Hành chính công',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1455,
    study: 'Hành chính công',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1456,
    study: 'Hành chính công',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1457,
    study: 'Hành chính công',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1458,
    study: 'Hành chính công',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1459,
    study: 'Hành chính công',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1460,
    study: 'Hành chính công',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1461,
    study: 'Hành chính công',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1462,
    study: 'Hành chính công',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1463,
    study: 'Hành chính công',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1464,
    study: 'Hành chính công',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1465,
    study: 'Hành chính công',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1466,
    study: 'Hành chính công',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1467,
    study: 'Hành chính công',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1468,
    study: 'Hành chính công',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1469,
    study: 'Hành chính công',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'CLB Giáo dục trẻ',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: 'https://www.facebook.com/clbtritueviet/',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1470,
    study: 'Hành chính công',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1471,
    study: 'Hành chính công',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1472,
    study: 'Hành chính công',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1473,
    study: 'Hành chính công',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1474,
    study: 'Hành chính công',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1475,
    study: 'Hành chính công',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1476,
    study: 'Hành chính công',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Talkshow nghề kế toán',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://www.tckt.edu.vn/tin-tuc/chi-tiet/khoa-ke-toan-kiem-toan-to-chuc-talkshow-ky-nang-nghe-nghiep-ke-toan-kiem-toan-va-startup-co-hoi-va-thach-thuc-voi-sinh-vien-trong-boi-canh-chuyen-doi-so',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1477,
    study: 'Hành chính công',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1478,
    study: 'Hành chính công',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1479,
    study: 'Hành chính công',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1480,
    study: 'Hành chính công',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1481,
    study: 'Hành chính công',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1482,
    study: 'Hành chính công',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1483,
    study: 'Hành chính công',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1484,
    study: 'Hành chính công',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1485,
    study: 'Hành chính công',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1486,
    study: 'Hành chính công',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1487,
    study: 'Hành chính công',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1488,
    study: 'Hành chính công',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1489,
    study: 'Hành chính công',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Triển lãm Design Week',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1490,
    study: 'Hành chính công',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Tham gia cuộc thi poster sinh viên',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://ptit.edu.vn/thong-bao-sinh-vien/tham-gia-cuoc-thi-poster-contest',
  },
  {
    id: 1491,
    study: 'Hành chính công',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1492,
    study: 'Hành chính công',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Tham gia casting phim ngắn',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink:
      'https://www.facebook.com/p/Tuy%E1%BB%83n-di%E1%BB%85n-vi%C3%AAn-cho-d%E1%BB%B1-%C3%A1n-phim-ng%E1%BA%AFn-qu%E1%BB%91c-t%E1%BA%BF-100063556842035/',
  },
  {
    id: 1493,
    study: 'Hành chính công',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1494,
    study: 'Hành chính công',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1495,
    study: 'Hành chính công',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1496,
    study: 'Hành chính công',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1497,
    study: 'Hành chính công',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1498,
    study: 'Hành chính công',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1499,
    study: 'Hành chính công',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1500,
    study: 'Hành chính công',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Y học cộng đồng',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1501,
    study: 'Hành chính công',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1502,
    study: 'Hành chính công',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1503,
    study: 'Hành chính công',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1504,
    study: 'Hành chính công',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Sơ cứu và chăm sóc cơ bản',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink:
      'https://safi.asia/danh-sach-so-cuu?gad_source=1&gad_campaignid=22022728224&gbraid=0AAAAA-SfONWcdSX_sJGUFUBCJ61Z5f-p7&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMiKc677glrgvpSEi9_8vDeOruk80HfrQyzr8NXEGOmhS7e5blHWkkaAkDZEALw_wcB',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1505,
    study: 'Hành chính công',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1506,
    study: 'Hành chính công',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1507,
    study: 'Hành chính công',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'AutoCAD cơ bản',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1508,
    study: 'Hành chính công',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1509,
    study: 'Hành chính công',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1510,
    study: 'Hành chính công',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1511,
    study: 'Hành chính công',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1512,
    study: 'Hành chính công',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1513,
    study: 'Chưa xác định',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Tìm việc',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1514,
    study: 'Chưa xác định',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1515,
    study: 'Chưa xác định',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'SQL cho người mới bắt đầu - MindX',
    Step2: 'Webinar AI & Dữ liệu lớn',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink: 'https://mindx.edu.vn/course/khoa-hoc-data-analyst',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/342203-webinar-07-24-cach-ung-dung-ai-trong-website-ban-hang',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1516,
    study: 'Chưa xác định',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Nộp CV cho vị trí Dev Intern',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://www.topcv.vn/tong-hop-cv-tham-khao-cho-lap-trinh-vien',
  },
  {
    id: 1517,
    study: 'Chưa xác định',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1518,
    study: 'Chưa xác định',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Khóa học Python cơ bản - FUNiX',
    Step2: 'Tham gia CLB IT tại UAN',
    Step3: 'Tham gia dự án GitHub',
    Step1hyperlink:
      'https://funix.edu.vn/chia-se-kien-thuc/khoa-hoc-lap-trinh-python/',
    Step2hyperlink: 'https://www.facebook.com/ITPTIT/?locale=vi_VN',
    Step3hyperlink:
      'https://codegym.cc/vi/groups/posts/vi.383.8-du-an-github-ma-nguon-mo-hang-au-e-nang-cao-kha-nang-ma-hoa-cua-ban',
  },
  {
    id: 1519,
    study: 'Chưa xác định',
    AreasOfInterest: 'IT – Công nghệ',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Data Analysis từ A-Z - FPT',
    Step2: 'Hackathon sinh viên toàn quốc',
    Step3: 'Đăng ký thi chứng chỉ Google IT Support',
    Step1hyperlink:
      'https://www.coderschool.vn/vi/data-science-course?utm_source=Google&utm_campaign=Search-DS-Course-170223&ad_name=144553819325&ad_id=703537192446&matchtype=b&utm_content=kh%C3%B3a%20h%E1%BB%8Dc%20data%20analyst%20fpt&device=c&gad_source=1&gad_campaignid=19699506463&gbraid=0AAAAAC4cVO2caoS8Xiwsbw7ks23Y_FSzg&gclid=Cj0KCQjwoNzABhDbARIsALfY8VN34DrtwLZY30mJFyeWGIVgnvP73SDmruNUu-0XxliC6h4lK6vGYzQaAu9IEALw_wcB',
    Step2hyperlink:
      'https://www.facebook.com/fet.uet/posts/-fpt-hackathon-2025-ch%C3%ADnh-th%E1%BB%A9c-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-ch%E1%BB%A7-%C4%91%E1%BB%81-chip-ai-logistics-on-edge-cu%E1%BB%99c-t/1199966832135240/',
    Step3hyperlink:
      'https://grow.google/intl/ALL_vn/it-support-certified-course/?tab=trung-c%E1%BA%A5p',
  },
  {
    id: 1520,
    study: 'Chưa xác định',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1521,
    study: 'Chưa xác định',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1522,
    study: 'Chưa xác định',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Content Marketing - Tomorrow marketer',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink:
      'https://www.tomorrowmarketers.org/content-marketing-course',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1523,
    study: 'Chưa xác định',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'CLB Sáng tạo nội dung',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://dcca.org.vn/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1524,
    study: 'Chưa xác định',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Talkshow Marketing tại Brands ',
    Step3: 'Nộp CV thực tập Digital tại TopCV',
    Step1hyperlink: '',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/339602-moi-tham-du-talkshow-from-marketing-to-management-tu-marketing-len-quan-tri',
    Step3hyperlink: 'https://www.topcv.vn/cv-digital-marketing',
  },
  {
    id: 1525,
    study: 'Chưa xác định',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Growth Hacking 101 - MindX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Thử thách 28 ngày viết content',
    Step1hyperlink: 'https://web.mindx.edu.vn/',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://dangmylinh.com/thu-thach-28-ngay-luyen-viet-content-cho-newbie/',
  },
  {
    id: 1526,
    study: 'Chưa xác định',
    AreasOfInterest: 'Marketing – Quảng cáo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học Digital Marketing cơ bản - FUNiX',
    Step2: 'Tham gia sự kiện Brand Camp',
    Step3: 'Đăng ký cuộc thi sáng tạo quảng cáo',
    Step1hyperlink: '',
    Step2hyperlink: 'https://www.brandcamp.asia/blogs/notice/',
    Step3hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/chinh-thuc-mo-don-dang-ky-cuoc-thi-marketing-va-sang-tao-phim-quang-cao-tvcreate-2025',
  },
  {
    id: 1527,
    study: 'Chưa xác định',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Làm tình nguyện viên chương trình học bổng',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink: 'https://ivolunteervietnam.com/',
  },
  {
    id: 1528,
    study: 'Chưa xác định',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1529,
    study: 'Chưa xác định',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng sư phạm hiện đại - Ued',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink: 'https://cct.ued.vnu.edu.vn/Nghiep-vu-su-pham/',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1530,
    study: 'Chưa xác định',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1531,
    study: 'Chưa xác định',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Thiết kế bài giảng online - YBOX',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/topcourse-khoa-hoc-online-mien-phi-ve-thiet-ke-powerpoint-bai-thuyet-trinh-60e941fa3f75b92deb6f6708',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1532,
    study: 'Chưa xác định',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Tọa đàm đổi mới giáo dục NEU',
    Step3: 'Đăng ký trợ giảng tại trung tâm',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink:
      'https://www.neu.edu.vn/vi/tin-tuc-moi-nhat/toa-dam-doi-moi-phuong-phap-giang-day-hoc-tap-thich-ung-voi-su-phat-trien-cua-cong-nghe-va-tri-tue-nhan-tao',
    Step3hyperlink:
      'https://www.topcv.vn/tim-viec-lam-tro-giang-tai-ha-noi-kl1',
  },
  {
    id: 1533,
    study: 'Chưa xác định',
    AreasOfInterest: 'Giáo dục – Đào tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Tư duy phản biện trong dạy học Udemy',
    Step2: 'Workshop Edtech tại MindX',
    Step3: 'Tham gia mạng lưới giáo viên trẻ',
    Step1hyperlink:
      'https://www.udemy.com/vi/topic/critical-thinking/?srsltid=AfmBOopBwkx1jg7upHDDXqXqCNzGn62rh5IquzC68la4Ti7MNA50CmoG',
    Step2hyperlink: '',
    Step3hyperlink:
      'https://www.vietnamplus.vn/dai-dien-lanh-dao-tre-viet-nam-tham-gia-mang-luoi-ket-noi-thanh-nien-toan-cau-post962515.vnp',
  },
  {
    id: 1534,
    study: 'Chưa xác định',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Tìm việc',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1535,
    study: 'Chưa xác định',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'Webinar về Fintech',
    Step3: 'Nộp đơn thực tập tài chính',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kcr206',
  },
  {
    id: 1536,
    study: 'Chưa xác định',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1537,
    study: 'Chưa xác định',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1538,
    study: 'Chưa xác định',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khóa học Tài chính cho người mới bắt đầu - Udemy',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://www.udemy.com/vi/courses/finance-and-accounting/?srsltid=AfmBOoqt3x5alVKiHOEuzf4iENJbH_iiezpqlgq-xXG28j3aa3VwSFGn',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1539,
    study: 'Chưa xác định',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Excel nâng cao cho kế toán - Gitiho',
    Step2: 'CLB Phân tích đầu tư Tôn Đức Thắng',
    Step3: 'Học mô phỏng đầu tư online',
    Step1hyperlink:
      'https://khoahocexcel01.gitiho.com/?utm_source=GA&utm_campaign=ComboEVBA&utm_medium=GA_ComboEVBA_Namnq_Search_49_GG_01_1&gad_source=1&gad_campaignid=20917601164&gbraid=0AAAAADD_6Nsg82_30sICYO8Fq_aTjTjm5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNvy6tuG_EZFDwZcuES010bDxKxfFdIncuRVy3lJMsc6mMgc7ZRko4aAplTEALw_wcB',
    Step2hyperlink:
      'https://student.tdtu.edu.vn/clb-doi-nhom/clb-dau-tu-chung-khoan-tre-truong-dai-hoc-ton-duc-thang',
    Step3hyperlink: 'https://www.dsc.com.vn/dich-vu/dao-tao',
  },
  {
    id: 1540,
    study: 'Chưa xác định',
    AreasOfInterest: 'Tài chính – Kế toán',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Phân tích báo cáo tài chính',
    Step2: 'Webinar về Fintech',
    Step3: 'Tham gia cuộc thi CFA Challenge',
    Step1hyperlink:
      'https://ketoanleanh.edu.vn/khoa-hoc/khoa-hoc-tai-chinh-cho-nguoi-khong-chuyen',
    Step2hyperlink: 'https://kinhtetre.net/duoi-goc-nhin-nganh-fintech/',
    Step3hyperlink: 'https://sapp.edu.vn/bai-viet-cfa/cfa-research-challenge/',
  },
  {
    id: 1541,
    study: 'Chưa xác định',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Tìm việc',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1542,
    study: 'Chưa xác định',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1543,
    study: 'Chưa xác định',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1544,
    study: 'Chưa xác định',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Sự kiện Startup Zone',
    Step3: 'Nộp đơn vào chương trình ươm tạo MindX',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://www.brandsvietnam.com/congdong/topic/343463-phat-dong-cuoc-thi-startup-zone-2024-lan-thu-8-ecotech',
    Step3hyperlink:
      'https://vovworld.vn/vi-VN/viet-nam-quoc-gia-khoi-nghiep/mindx-uom-mam-tai-nang-cong-nghe-viet-1270548.vov',
  },
  {
    id: 1545,
    study: 'Chưa xác định',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Khởi nghiệp tinh gọn - YBOX',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Pitch ý tưởng với mentor',
    Step1hyperlink:
      'https://ybox.vn/ky-nang/khoa-hoc-online-mien-phi-ve-khoi-nghiep-tinh-gon-the-lean-startup-talk-at-stanford-e-corner-tu-udemy-608405a42f6c072ca19f0b6b',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink: 'https://pitch.com/',
  },
  {
    id: 1546,
    study: 'Chưa xác định',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lập kế hoạch kinh doanh - PTi',
    Step2: 'CLB Doanh nhân trẻ',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://khoahocpti.edu.vn/tiep-thi-ban-hang/khoa-hoc-online-thiet-lap-va-xay-dung-ke-hoach-kinh-doanh/',
    Step2hyperlink: 'https://vyea.org.vn/',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1547,
    study: 'Chưa xác định',
    AreasOfInterest: 'Khởi nghiệp – Kinh doanh',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Kỹ năng pitching hiệu quả',
    Step2: 'Talkshow gọi vốn thành công',
    Step3: 'Tham gia gọi vốn cộng đồng',
    Step1hyperlink:
      'https://www.udemy.com/course/soin-ky-nang-pitching-thuyet-trinh-goi-von-khoa-810/?srsltid=AfmBOoq0C5AdqNN33Q42THbv60wIl8K7nO4cnci1otWEBguKy0ZQkqYu',
    Step2hyperlink:
      'https://ybox.vn/su-kien/talkshow-gian-nan-hanh-trinh-goi-von-608',
    Step3hyperlink:
      'https://insight.isb.edu.vn/cac-trang-web-goi-von-cong-dong-crowd-funding/',
  },
  {
    id: 1548,
    study: 'Chưa xác định',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Tìm việc',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1549,
    study: 'Chưa xác định',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'UI/UX Foundation',
    Step2: 'Workshop thiết kế tại DPI',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink:
      'https://www.dpicenter.edu.vn/hoat-dong/workshop-graphic-design-digital-painting-dinh-cao-thiet-ke-sang-tao-bang-ky-thuat-ve-wacom/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1550,
    study: 'Chưa xác định',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1551,
    study: 'Chưa xác định',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1552,
    study: 'Chưa xác định',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Thiết kế Canva cho người mới',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Thử thách thiết kế trong 48h',
    Step1hyperlink:
      'https://csc.edu.vn/khoa-hoc-thieu-nien/canva-for-social-media_276',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink: 'https://www.canva.com/vi_vn/design-challenge/',
  },
  {
    id: 1553,
    study: 'Chưa xác định',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'UI/UX Foundation',
    Step2: 'CLB Thiết kế sáng tạo',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink: 'https://telos.vn/khoa-hoc-nen-tang-ve-ui-design/',
    Step2hyperlink: 'https://www.facebook.com/groups/284707948320198/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1554,
    study: 'Chưa xác định',
    AreasOfInterest: 'Thiết kế – Sáng tạo',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Photoshop cơ bản - BKACAD',
    Step2: 'Triển lãm Design Week',
    Step3: 'Nộp CV vào studio thiết kế',
    Step1hyperlink:
      'https://thietkedohoa.bkacad.edu.vn/?utm_source=GGADS&utm_medium=thietkedohoa&gad_source=1&gad_campaignid=20918096079&gbraid=0AAAAADqB5w8z5aqwp4SuLFfFgXJpKQRGK&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNxzUN7buVZSUZ9gFCnRAC5emR4ALYHWe8bxO56mCBRM3spD13BzzAaAixREALw_wcB',
    Step2hyperlink: 'https://vi.vietnamdesignweek.org/',
    Step3hyperlink:
      'https://vn.joboko.com/blog/cach-viet-cv-xin-viec-nhan-vien-thiet-ke-nwi3690',
  },
  {
    id: 1555,
    study: 'Chưa xác định',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Tìm việc',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1556,
    study: 'Chưa xác định',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1557,
    study: 'Chưa xác định',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1558,
    study: 'Chưa xác định',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1559,
    study: 'Chưa xác định',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Sáng tác nhạc cho người mới',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Gửi portfolio tới gallery độc lập',
    Step1hyperlink:
      'https://thuamviet.com/khoa-hoc/sang-tac-nhac?gad_source=1&gad_campaignid=21725513461&gbraid=0AAAAAC5qmgmDVwK2QiLi2po3rMHh-2lvi&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNEyu7NeAVFLdPxB638mLC-n6BKgDTKi7hW1KXumCJHL74c_TgIf88aAiyoEALw_wcB',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://www.topcv.vn/portfolio-xin-viec-la-gi',
  },
  {
    id: 1560,
    study: 'Chưa xác định',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Lịch sử nghệ thuật hiện đại',
    Step2: 'CLB Âm nhạc học đường',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.academiccourses.vn/khoa-hoc/l%E1%BB%8Bch-s%E1%BB%AD-ngh%E1%BB%87-thu%E1%BA%ADt',
    Step2hyperlink:
      'https://hes.vnu.edu.vn/chuong-trinh-dao-tao/sinh-hoat-clb/298-clb-am-nhac-noi-ket-noi-dam-me/',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1561,
    study: 'Chưa xác định',
    AreasOfInterest: 'Nghệ thuật – Văn hóa',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Khóa học làm phim cơ bản',
    Step2: 'Talkshow Nghệ thuật & Đời sống',
    Step3: 'Biểu diễn tại sân khấu mở',
    Step1hyperlink:
      'https://www.huongnghiepaau.com/khoa-hoc-san-xuat-phim-ky-thuat-so',
    Step2hyperlink:
      'https://caodang.fpt.edu.vn/tin-tuc-poly/talkshow-nghe-thuat-can-bang-cuoc-song-hoc-cach-song-healthy-tu-trong-tam-cung-sinh-vien-fpt-polytechnic-can-tho.html',
    Step3hyperlink: 'https://hanoioperahouse.org.vn/chuong-trinh-bieu-dien/',
  },
  {
    id: 1562,
    study: 'Chưa xác định',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Tìm việc',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1563,
    study: 'Chưa xác định',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Dinh dưỡng học ',
    Step2: 'Tập huấn sơ cứu ban đầu',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink:
      'https://socapcuu.com.vn/?gad_source=1&gad_campaignid=21458963902&gbraid=0AAAAApf3LJXKujD7VfYBDpIs6URg_8Cot&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOedcMbFHqLB0CgfkYwG2RPLjS2O5T00jaqes-7Wsdj06lJkmmll4saAv7sEALw_wcB',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1564,
    study: 'Chưa xác định',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1565,
    study: 'Chưa xác định',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1566,
    study: 'Chưa xác định',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Dinh dưỡng học ',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Nộp đơn thực tập bệnh viện',
    Step1hyperlink: 'https://nreci.org/thong-tin-khoa-hoc-dinh-duong-co-ban/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://www.fvhospital.com/vi/thong-tin-tuyen-dung/moi-truong-lam-viec/chuong-trinh-thuc-tap-va-dao-tao-noi-tru/',
  },
  {
    id: 1567,
    study: 'Chưa xác định',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Y học cộng đồng',
    Step2: 'CLB sức khỏe học đường',
    Step3: 'Thi lấy chứng chỉ sơ cấp y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink: 'https://www.facebook.com/lqdYHC/',
    Step3hyperlink:
      'https://daotaosupham.com/tin-tuc/chung-chi-so-cap-dieu-duong-380.html',
  },
  {
    id: 1568,
    study: 'Chưa xác định',
    AreasOfInterest: 'Y tế – Chăm sóc sức khỏe',
    '6Month Goal': 'Chưa xác định',
    Step1: 'Y học cộng đồng',
    Step2: 'Webinar nghề Điều dưỡng',
    Step3: 'Tham gia tình nguyện viên y tế',
    Step1hyperlink: 'https://spmph.edu.vn/',
    Step2hyperlink:
      'https://bernard.vn/webinar-nghin-le-mot-dem-ca-k-ky-32-chu-de-du-phong-va-cham-soc-loet-ti-de-b-461',
    Step3hyperlink: 'https://operationsmile.org.vn/volunteer-tieng-viet/',
  },
  {
    id: 1569,
    study: 'Chưa xác định',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Tìm việc',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1570,
    study: 'Chưa xác định',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Học thêm kỹ năng mới',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'CLB kỹ thuật sáng tạo',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://www.facebook.com/SangtaoEureka/',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1571,
    study: 'Chưa xác định',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuyển ngành',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1572,
    study: 'Chưa xác định',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Khởi nghiệp',
    Step1: 'Kỹ thuật cơ điện tử',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink: 'https://codientu.online/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
  {
    id: 1573,
    study: 'Chưa xác định',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chuẩn bị du học',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Talkshow ngành xây dựng',
    Step3: 'Tham gia dự án kỹ thuật cộng đồng',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink:
      'https://www.youtube.com/playlist?list=PLVRzvTFBr9_wsTQpR7HV1jBxKW5rXdyUc',
    Step3hyperlink:
      'https://lvcfund.org.vn/cac-du-an-cong-dong-noi-bat-nam-hoc-2023-2024/',
  },
  {
    id: 1574,
    study: 'Chưa xác định',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Thi lấy chứng chỉ chuyên ngành',
    Step1: 'Vật liệu & công nghệ mới',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thực tập tại công ty kỹ thuật',
    Step1hyperlink:
      'https://tuyensinh.usth.edu.vn/nganh-khoa-hoc-vat-lieu-tien-tien-cong-nghe-nano-235/',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink:
      'https://www.jobstreet.vn/vi%E1%BB%87c-l%C3%A0m-Th%E1%BB%B1c-T%E1%BA%ADp-Sinh-K%E1%BB%B9-Thu%E1%BA%ADt-t%E1%BA%A1i-H%C3%A0-N%E1%BB%99i',
  },
  {
    id: 1575,
    study: 'Chưa xác định',
    AreasOfInterest: 'Công nghiệp – Kỹ thuật',
    '6Month Goal': 'Chưa xác định',
    Step1: 'AutoCAD cơ bản',
    Step2: 'Tham quan nhà máy',
    Step3: 'Thi thử tay nghề',
    Step1hyperlink:
      'https://vnskills.edu.vn/khoa-hoc-autocad/?gad_source=1&gad_campaignid=14839108277&gbraid=0AAAAAoKkzP6-P65-zp3f2GUTA7AjL27bd&gclid=Cj0KCQjwoNzABhDbARIsALfY8VM5_3hN2cGCPcOMrS3AaorfPCfJIqzUnXdLyXAMS9TXfJpWRvtQsnIaAuUeEALw_wcB',
    Step2hyperlink: 'https://thamquannhamay.ajinomoto.com.vn/',
    Step3hyperlink: 'https://dcoht.edu.vn/de-thi-tay-nghe-quoc-gia/',
  },
];

// const [selected, setSelected] = useState < 'yes' | 'no' | null > (null);

const ResultTestHolland = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const { result } = location.state || {}

  const [selectedBar, setSelectedBar] = useState(null)
  const [form, setForm] = useState({
    study: null,
    interest: null,
    goal: null,
  });
  const [data, setData] = useState([{}])
  const [selected, setSelected] = useState(null);
  const [showInterest, setShowInterest] = useState(false);
  const [input, setInput] = useState(null);

  const formatDateTime = (date) => {
    const pad = (n) => (n < 10 ? '0' + n : n);

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Tháng từ 0-11 nên +1
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year}-${hours}:${minutes}:${seconds}`;
  }



  const handleButtonClick = async (key) => {
    console.log('🚀 ~ ResultTestHolland ~ dataMbtiResult:', result);

    const input = {
      act: data.Step3 ?? '',        // fallback nếu undefined
      explore: data.Step2 ?? '',
      goal: form.goal ?? '',
      interest: form.interest ?? '',
      learn: data.Step1 ?? '',
      name: result.username ?? '',
      email: result.email ?? '',
      phone: result.phone ?? '',
      option: key,
      study: form.study ?? '',
      createAt: formatDateTime(new Date()),
    };
    try {
      await addDoc(collection(firestore, 'info'), input);
      console.log('🚀 ~ handleButtonClick ~ input:', input);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
  const getButtonStyles = (key) => ({
    backgroundColor: selected === key ? '#4CAF50' : 'white', // xanh lá cây
    color: selected === key ? 'white' : 'black',
    borderColor: '#BDBDBD', // tương đương 'grey.400'
    '&:hover': {
      borderColor: '#4CAF50',
      backgroundColor: selected === key ? '#388E3C' : 'white', // xanh lá đậm
    },
  });



  const code = result.value[0].code?.toUpperCase(); // ví dụ: 'INFJ'

  const getMbtiImage = (code) => {
    if (!code) return undefined;

    return mbtiImages[code] ?? ENFJ;
  };

  // Dùng:
  const imgSrc = getMbtiImage(result.value[0].code);
  useEffect(() => {
    console.log('🚀 ~ ResultTestHolland ~ imgSrc:', result);

    if (!result) {
      toast.error('Không tìm thấy kết quả bài test', {
        onClose: () => navigate(routes.INFO_TEST_HOLLAND)
      })
    }
  }, [result, navigate])

  if (!result) {
    return null
  }

  const handleBarClick = (event) => {
    // console.log('🚀 ~ handleBarClick ~ event:', result[event.point.index])
    setSelectedBar(result[event.point.index].resultDetail)
  }


  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const normalize = (str) =>
    str?.toString().trim().replace(/\s+/g, ' ').normalize('NFC');

  const handleSubmit = () => {
    console.log('🚀 ~ handleSubmit ~ form:', form);
    setShowInterest(true);
    dataMbtiResult.forEach((item) => {
      if (
        normalize(item.study) === normalize(form.study) &&
        normalize(item.AreasOfInterest) === normalize(form.interest) &&
        normalize(item['6Month Goal']) === normalize(form.goal)
      ) {
        setData(item);
        console.log('✅ Found match:', item);
      }
    });
  };


  return (
    <div className='result-container'>
      <Helmet>
        <title>Trắc nghiệm Holland</title>
      </Helmet>
      <h2>Kết quả của bạn</h2>
      <Grid spacing={{ xs: 2, sm: 2, md: 2, lg: 10, xl: 10 }} container columns={{ xs: 6, sm: 6, md: 13, lg: 13, xl: 13 }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box className='chart-holland-container' sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' } }}>
            <Box className='chart-holland' sx={{ width: '100%', height: '300px' }}>
              <ResultChartHolland
                resData={result.chart}
                handleClick={handleBarClick}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box className='reason-container' >
            <Box className='reason-title'>  Bạn thuộc nhóm  <span > {result.value[0].name}</span></Box>
            <Box className="reason-content" sx={{ lineHeight: 1.6, fontSize: '16px' }}>
              <Box
                component="img"
                src={imgSrc}
                alt="Logo"
                sx={{
                  float: 'right',
                  width: '200px',      // tuỳ chỉnh size ảnh
                  height: 'auto',
                  marginLeft: 2,
                  marginBottom: 1,
                }}
              />
              {result.value[0].value}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <h2>Thông tin bổ sung </h2>

      <Box className="" marginBottom={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              Bạn đang học ngành gì?
            </Typography>
            <TextField
              select
              fullWidth
              value={form.study}
              onChange={handleChange('study')}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Công nghệ thông tin">Công nghệ thông tin</MenuItem>
              <MenuItem value="Kinh doanh quốc tế">Kinh doanh quốc tế</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Kế toán">Kế toán</MenuItem>
              <MenuItem value="Tài chính">Tài chính</MenuItem>
              <MenuItem value="Cơ điện tử">Cơ điện tử</MenuItem>
              <MenuItem value="Tự động hóa">Tự động hóa</MenuItem>
              <MenuItem value="Xây dựng">Xây dựng</MenuItem>
              <MenuItem value="Kỹ thuật cơ khí">Kỹ thuật cơ khí</MenuItem>
              <MenuItem value="Y đa khoa">Y đa khoa</MenuItem>
              <MenuItem value="Điều dưỡng">Điều dưỡng</MenuItem>
              <MenuItem value="Dược học">Dược học</MenuItem>
              <MenuItem value="Kỹ thuật xét nghiệm">Kỹ thuật xét nghiệm</MenuItem>
              <MenuItem value="Tâm lý học">Tâm lý học</MenuItem>
              <MenuItem value="Xã hội học">Xã hội học</MenuItem>
              <MenuItem value="Giáo dục học">Giáo dục học</MenuItem>
              <MenuItem value="Thiết kế đồ họa">Thiết kế đồ họa</MenuItem>
              <MenuItem value="Mỹ thuật công nghiệp">Mỹ thuật công nghiệp</MenuItem>
              <MenuItem value="Âm nhạc">Âm nhạc</MenuItem>
              <MenuItem value="Ngôn ngữ Anh">Ngôn ngữ Anh</MenuItem>
              <MenuItem value="Báo chí">Báo chí</MenuItem>
              <MenuItem value="Quan hệ công chúng">Quan hệ công chúng</MenuItem>
              <MenuItem value="Luật kinh tế">Luật kinh tế</MenuItem>
              <MenuItem value="Hành chính công">Hành chính công</MenuItem>
              <MenuItem value="Chưa xác định">Chưa xác định</MenuItem>

            </TextField>

            <Typography variant="h6" gutterBottom>
              Bạn quan tâm lĩnh vực nào?
            </Typography>
            <TextField
              select
              fullWidth
              value={form.interest}
              onChange={handleChange('interest')}
              sx={{ mb: 2 }}
            >
              <MenuItem value="IT – Công nghệ">IT – Công nghệ</MenuItem>
              <MenuItem value="Marketing – Quảng cáo">Marketing – Quảng cáo</MenuItem>
              <MenuItem value="Giáo dục – Đào tạo">Giáo dục – Đào tạo</MenuItem>
              <MenuItem value="Tài chính – Kế toán">Tài chính – Kế toán</MenuItem>
              <MenuItem value="Khởi nghiệp – Kinh doanh">Khởi nghiệp – Kinh doanh</MenuItem>
              <MenuItem value="Thiết kế – Sáng tạo">Thiết kế – Sáng tạo</MenuItem>
              <MenuItem value="Nghệ thuật – Văn hóa">Nghệ thuật – Văn hóa</MenuItem>
              <MenuItem value="Y tế – Chăm sóc sức khỏe">Y tế – Chăm sóc sức khỏe</MenuItem>
              <MenuItem value="Công nghiệp – Kỹ thuật">Công nghiệp – Kỹ thuật</MenuItem>

            </TextField>

            <Typography variant="h6" gutterBottom>
              Bạn muốn đạt mục tiêu gì trong 6 tháng tới?
            </Typography>
            <TextField
              select
              fullWidth
              value={form.goal}
              onChange={handleChange('goal')}
              sx={{ mb: 3 }}
            >
              <MenuItem value="Chưa xác định">Chưa xác định</MenuItem>
              <MenuItem value="Chuẩn bị du học">Chuẩn bị du học</MenuItem>
              <MenuItem value="Học thêm kĩ năng mới">Học thêm kĩ năng mới</MenuItem>
              <MenuItem value="Khởi nghiệp">Khởi nghiệp</MenuItem>
              <MenuItem value="Thi lấy bằng chứng chỉ chuyên ngành">Thi lấy bằng chứng chỉ chuyên ngành</MenuItem>
              <MenuItem value="Tìm việc">Tìm việc</MenuItem>
            </TextField>

            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Continue
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 2,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                CAREER ROADMAP
              </Typography>

              {/* Step 1 */}
              <Box mb={3}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: '#1976d2',
                      color: '#fff',
                      fontSize: 12,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1,
                    }}
                  >
                    1
                  </Box>
                  <Typography fontWeight={600}>Step 1: LEARN</Typography>
                </Box>
                <Typography fontSize={14} gutterBottom>
                  Học gì?
                </Typography>
                <Typography fontSize={13} color="text.secondary" gutterBottom>
                  Gợi ý: Khóa học {data.Step1}
                </Typography>
                <a
                  href={data.Step1hyperlink}
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                    Đăng ký ngay
                  </Button>
                </a>

              </Box>

              {/* Step 2 */}
              <Box mb={3}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: '#1976d2',
                      color: '#fff',
                      fontSize: 12,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1,
                    }}
                  >
                    2
                  </Box>
                  <Typography fontWeight={600}>Step 2: EXPLORE</Typography>
                </Box>
                <Typography fontSize={14} gutterBottom>
                  Khám phá gì?
                </Typography>
                <Typography fontSize={13} color="text.secondary" gutterBottom>
                  Gợi ý: Tham gia {data.Step2}
                </Typography>
                {/* <Link to={data.Step2hyperlink} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                    Xem sự kiện
                  </Button>
                </Link> */}
                <a
                  href={data.Step2hyperlink}
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                    Xem sự kiện
                  </Button>
                </a>
              </Box>

              {/* Step 3 */}
              <Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Box
                    sx={{

                      width: 24,
                      height: 24,
                      bgcolor: '#1976d2',
                      color: '#fff',
                      fontSize: 12,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1,
                    }}
                  >
                    3
                  </Box>
                  <Typography fontWeight={600}>Step 3: ACT</Typography>
                </Box>
                <Typography fontSize={14} gutterBottom>
                  Hành động gì?
                </Typography>
                <Typography fontSize={13} color="text.secondary" gutterBottom>
                  Gợi ý: Nộp đơn {data.Step3}
                </Typography>
                {/* <Link to={data.Step2hyperlink} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                    Nộp đơn
                  </Button>
                </Link> */}
                <a
                  href={data.Step3hyperlink}
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                    Xem sự kiện
                  </Button>
                </a>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {showInterest && <Box
        p={2}
        border={1}
        borderRadius={2}
        borderColor="grey.300"
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={400}
        marginBottom={10}
      >
        <Typography variant="subtitle1">Bạn có thấy hữu ích không?</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            onClick={() => {
              setSelected('yes');
              handleButtonClick('Có, tôi cảm thấy hữu ích');
            }}
            sx={getButtonStyles('yes')}
          >
            Có, tôi cảm thấy hữu ích
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setSelected('no');
              handleButtonClick('Không hữu ích');
            }
            }
            sx={getButtonStyles('no')}
          >
            Không hữu ích
          </Button>
        </Box>
      </Box>}
    </div>
  )
}

export default ResultTestHolland