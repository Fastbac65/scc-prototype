import { CardMedia, Grid, ImageList, ImageListItem, Link, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Footer = () => {
  const sponsors = [
    {
      href: 'https://sydneybeachhomes.com.au/',
      src: 'https://southcurlcurlslsc.org/wp-content/uploads/2018/02/Sydney-Beach-Homes-LOGO.jpg',
    },
    {
      href: 'http://www.bendigobank.com.au/about_us/locate_us/locator_detail.asp?BranchNumber=9238',
      src: 'https://southcurlcurlslsc.org/wp-content/uploads/2021/09/Landscape-White-Bendigo-Aug21.jpg',
    },

    {
      href: 'https://www.stonerealestate.com.au',
      src: 'https://southcurlcurlslsc.org/wp-content/uploads/2018/10/Stone-Dee-Why-Logo.png',
    },
  ];

  return (
    //sponsors
    <>
      <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ background: 'white', boxShadow: 0, borderRadius: 0 }}>
          <Grid container sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
            {sponsors.map((sponsor) => (
              <Grid item key={sponsor.src} xs={12} sm={4}>
                <a href={sponsor.href} target='_blank'>
                  <CardMedia href={sponsors.href} component='img' alt='' src={sponsor.src} />
                </a>
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Paper sx={{ boxShadow: 0, borderRadius: 0 }}>
          <Typography pt={1} mb={1} paragraph color='text-primary' variant='caption'>
            Email:{' '}
            <Link color='secondary' href='mailto:mail@southcurlcurlslsc.org'>
              {' '}
              mail@southcurlcurlslsc.org
            </Link>
            &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Tel: +61-2-9938 5430&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; Mail:
            Postal address P.O. Box 18, Freshwater NSW 2096
          </Typography>
          <Typography color='text-primary' pb={1} paragraph variant='caption'>
            © Copyright 2022 | South Curl Curl Surf Lifesaving club &nbsp;&nbsp;&nbsp;&nbsp;{' '}
            <Link color='secondary' target='_blank' href='https://southcurlcurlslsc.org/terms-conditions'>
              Terms & Conditions
            </Link>{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;{' '}
            <Link color='secondary' target='_blank' href='https://southcurlcurlslsc.org/privacy'>
              Privacy
            </Link>{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Web Site developed by TezD
          </Typography>
        </Paper>
      </Box>
    </>
  );
};
export default Footer;
