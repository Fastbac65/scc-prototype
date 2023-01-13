import { Box } from '@mui/material';
import { Container } from '@mui/system';

import { useValue } from './context/ContextProvider';

import scc1 from '../static/imgs/scc-fb-grp.jpeg';

const Test = () => {
  const { theme } = useValue();

  // const profile = 'https://www.instagram.com/fastbac65/channel/?__a=1&__d=dis';
  // const serverx = 'https://192.168.0.220:5001/image/';
  const server = 'https://scc-auth.cyclic.app/image/';

  // const resp = fetch(serverx + profile, {
  //   method: 'GET',
  //   mode: 'no-cors',
  // });

  const url =
    'https://instagram.fsyd7-1.fna.fbcdn.net/v/t51.2885-19/319599394_1294096694657733_2010438183614683485_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsyd7-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=lb_dpEPL-AQAX9_ti2L&edm=AAWvnRQBAAAA&ccb=7-5&oh=00_AfBhnDdv-bSyVCG-IS2mHQm9gs94tNRGL3uSHwgGTQj7eA&oe=63BFA451&_nc_sid=e7738c';

  // const urlx =
  //   'https://scontent.fsyd8-1.fna.fbcdn.net/v/t51.2885-15/319599394_1294096694657733_2010438183614683485_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=86c713&_nc_ohc=BNx9YwzkbtQAX8ZxSWM&_nc_ht=scontent.fsyd8-1.fna&oh=00_AfC1AAuFsDxVlyFbN8yFG4CAIywNrO2k63I0Jas72qNsgg&oe=63C34839';

  // const urly =
  //   'https://instagram.fsyd8-1.fna.fbcdn.net/v/t51.2885-19/319599394_1294096694657733_2010438183614683485_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fsyd8-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=SGHjI4V5ZIAAX-_cjbG&edm=AAWvnRQBAAAA&ccb=7-5&oh=00_AfB7y5Lb6ImFB3OICIMFPvCn-oG5Eu0WDPEW-kLIrZPsIg&oe=63C398D1&_nc_sid=e7738c';

  return (
    <>
      <Container maxWidth='lg' sx={{ textAlign: 'center', justifyContent: 'center' }}>
        <Box sx={{ backgroundImage: `url(${scc1})` }}>
          <Box sx={{ background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)' }}>
            <p>************ Component Test Page *****************</p>

            <div>
              <img src={server + url} />
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Test;
