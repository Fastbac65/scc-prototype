import { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import scc1 from '../../static/imgs/scc-beach-pool.jpeg';

import Fade from '@mui/material/Fade';

import { useValue } from '../context/ContextProvider';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CmplxReviewCardMembers2 = () => {
  const [expanded, setExpanded] = useState(false);
  const { currentUser, theme } = useValue();

  const [like, setLike] = useState();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    if (like === 'red') setLike('');
    else setLike('red');
  };

  return (
    <>
      <div>
        <div id='title-element' style={{ position: 'relative' }}>
          <div id='members2' style={{ position: 'absolute', top: '-100px' }}></div>
        </div>

        <Fade timeout={500} in={true}>
          <Card sx={{ maxWidth: 550 }}>
            <CardHeader
              avatar={
                <Tooltip placement='top' title={currentUser?.displayName}>
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    src={currentUser?.photoURL}
                    alt={currentUser?.displayName}
                    aria-label={currentUser?.displayName}
                  >
                    {currentUser?.displayName?.charAt(0)}
                  </Avatar>
                </Tooltip>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='South Curl Curl Committee 2023/2024'
              subheader='Our awesome team for the coming season'
            />
            <CardMedia component='img' height='200' src={scc1} alt='scc-ocean' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                We are grateful to the following individuals who have volunteered their time as committee members for
                the 2023/24 Season. Please contact them using the emails indicated below...
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
                <FavoriteIcon sx={{ color: like }} />
              </IconButton>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>

              <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography variant='caption' color='text.secondary'>
                  <table width='100%'>
                    <tbody>
                      <tr>
                        <td width='146'>
                          <strong>Role</strong>
                        </td>
                        <td width='213'>
                          <strong>Name</strong>
                        </td>
                        <td width='258'>
                          <strong>Contact Details</strong>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>President</td>
                        <td width='213'>Matthew Campbell</td>
                        <td width='258'>
                          <a
                            href='mailto:President@southcurlcurlslsc.com.au'
                            style={{ color: `${theme.palette.info.main}` }}
                          >
                            President@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Deputy President</td>
                        <td width='213'>Dave Alldis</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:davidalldis13@gmail.com'>
                            Deputypresident@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Secretary</td>
                        <td width='213'>Jono Beavon</td>
                        <td width='258'>
                          <a
                            style={{ color: `${theme.palette.info.main}` }}
                            href='mailto:jono.beavon@sydneybeachhomes.com.au'
                          >
                            Secretary@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Treasurer</td>
                        <td width='213'>Paul Brittain</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:paul_brittain@ymail.com'>
                            Treasurer@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Club Captain</td>
                        <td width='213'>Kevin Moffat</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:lianehm1@gmail.com'>
                            Captain@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Nippers President</td>
                        <td width='213'>Frank Tol</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:tolfm@hotmail.com'>
                            Nippers@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Nippers Deputy</td>
                        <td width='213'>Steve Rudd</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:steverudd1@hotmail.com'>
                            Nippers@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Patrol Supervisor</td>
                        <td width='213'>David O&#8217;Reilly</td>
                        <td width='258'>
                          <a
                            style={{ color: `${theme.palette.info.main}` }}
                            href='mailto:PatrolSup@southcurlcurlslsc.com.au'
                          >
                            PatrolSup@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Chief Instructor</td>
                        <td width='213'>Natalie Neary</td>
                        <td width='258'>
                          <a
                            style={{ color: `${theme.palette.info.main}` }}
                            href='mailto:Chiefinstructor@southcurlcurlslsc.com.au'
                          >
                            Chiefinstructor@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Boat Captain 1</td>
                        <td width='213'>Julian McKay</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:Julian.McKay18@gmail.com'>
                            Boatcaptain@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Boat Captain 2</td>
                        <td width='213'>Mali Warneford</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:MaliWarneford@icloud.com'>
                            Boatcaptain@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>First Aid Officer</td>
                        <td width='213'>Lisa Holland</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:Lisa.Holland99@gmail.com'>
                            Firstaid@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Safety Officer</td>
                        <td width='213'>Guy Waddilove</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:guy@waddiloveyachts.com'>
                            OHS@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Gym Officer</td>
                        <td width='213'>Bjorn Shearer</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:bjorn_shearer@hotmail.com'>
                            Gym@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Powercraft Captain</td>
                        <td width='213'>Michael Berry</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:IRB@southcurlcurlslsc.com.au'>
                            IRB@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>IRB Engineer</td>
                        <td width='213'>Terry Durnin</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:terry.durnin@yahoo.com'>
                            IRB@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Craft Captain</td>
                        <td width='213'>Peter Allen</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:freshiepete@gmail.com'>
                            Craft@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Social Secretary</td>
                        <td width='213'>Trish Byrne</td>
                        <td width='258'>
                          <a
                            style={{ color: `${theme.palette.info.main}` }}
                            href='mailto:Social@southcurlcurlslsc.com.au'
                          >
                            Social@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Cadets</td>
                        <td width='213'>Saul Carroll</td>
                        <td width='258'>
                          <a
                            style={{ color: `${theme.palette.info.main}` }}
                            href='mailto:Cadets@southcurlcurlslsc.com.au'
                          >
                            Cadets@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Sponsor Coordinator</td>
                        <td width='213'>Graeme Dominish</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:DominGr@cba.com.au'>
                            Sponsorship@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Club Admin</td>
                        <td width='213'>Lisa Settree</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:Mail@southcurlcurlslsc.org'>
                            Mail@southcurlcurlslsc.org
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Technology Officer</td>
                        <td width='213'>Graham Smith</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:ICT@southcurlcurlslsc.com.au'>
                            ICT@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Gear Steward</td>
                        <td width='213'>Steve Birch</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:SBirch@flamestop.com.au'>
                            Gear@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Handicapper</td>
                        <td width='213'>Dave Platter</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:Dave@daveplatter.com'>
                            Handicapper@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Tour Manager</td>
                        <td width='213'>Michelle Lowery</td>
                        <td width='258'>
                          <a
                            style={{ color: `${theme.palette.info.main}` }}
                            href='mailto:Michelle@limephotography.com.au'
                          >
                            TourManager@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Competition Manager</td>
                        <td width='213'>Michela Verwey</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:MichelaVerwey@gmail.com'>
                            Competition@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td width='146'>Complaints or Grievances</td>
                        <td width='213'>Jenny Drury</td>
                        <td width='258'>
                          <a style={{ color: `${theme.palette.info.main}` }} href='mailto:jennydrury@statcom.com.au'>
                            Complaints@southcurlcurlslsc.com.au
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Typography>

                <CardActions disableSpacing>
                  <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
                    <FavoriteIcon sx={{ color: like }} />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <ShareIcon />
                  </IconButton>

                  <ExpandMore
                    href='#members2'
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
              </CardContent>
            </Collapse>
          </Card>
        </Fade>
      </div>
    </>
  );
};

export default CmplxReviewCardMembers2;
