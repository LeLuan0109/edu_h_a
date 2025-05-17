import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function CardService({ card, label, content }) {
  return (
    <Card sx={{ maxWidth: 345, marginRight:'10px', borderRadius:'30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        sx={{ height: 220 }}
        image={card}
        title="green iguana"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
          {`${content.trainingConsulting || content}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignItems:'center', justifyContent:'center', bottom:30 }}>
        <Button size="small" sx={{ borderRadius: '40px', mb:2 }}>Tìm hiểu thêm</Button>
      </CardActions>
    </Card>
  )
}