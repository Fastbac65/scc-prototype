import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import scc1 from '../../static/imgs/rockbox.jpg';

export default function SimpleActionCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component='img' height='140' image={scc1} alt='rockbox' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            RockBox ~ 28th Jan 2023
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Due the to the popularity iof the recent RockBox event we are hosting another night of anthems!!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
