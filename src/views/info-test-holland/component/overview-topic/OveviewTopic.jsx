import Box from '@mui/material/Box'
import { ngheThuat, nghiepVu, nghienCuu, quanLy, thucTe, xaHoi } from '~/utils/text'

export default function OverviewTopic () {
  const topic = ['• Thực tế (R) - ', '• Nghiên cứu (I) - ', '• Nghệ thuật (A) - ', '• Xã hội (S) - ', '• Quản lý (E) - ', '• Nghiệp vụ (C) - ']
  const content = [thucTe, nghienCuu, ngheThuat, xaHoi, quanLy, nghiepVu]
  return (
    <Box sx={{ mb:2 }}>
      {topic.map((item, index) => (
        <Box key={`topic${index}`}>
          <span style={{ color: '#394867', fontWeight:'bold' }}>{item}</span>
          <span>{content[index]}</span>
        </Box>
      ))}
    </Box>
  )
}