import ContentCardMasonryHome from './ContentCardMasonryHome';
import Content2Cards from './Content2Cards';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f0f0f0',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),

//   color: theme.palette.text.secondary,
// }));

function Home() {
  return (
    <>
      <ContentCardMasonryHome />
      <Content2Cards />
    </>
  );
}

export default Home;
