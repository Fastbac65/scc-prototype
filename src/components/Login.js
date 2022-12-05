import ContentCard from './ContentCard';
import Content2Cards from './Content2Cards';
import SccLogin from './user/SccLogin';

const Login = () => {
  return (
    <>
      {/* <Zoom in={1}> */}
      <SccLogin />
      {/* </Zoom> */}
      <Content2Cards />
    </>
  );
};

export default Login;
