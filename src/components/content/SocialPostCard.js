import { memo } from 'react';

import { InstagramEmbed, FacebookEmbed } from 'react-social-media-embed';

import { Paper } from '@mui/material';

function SocialPostCard({ socialUrl, script }) {
  // const { login } = useValue();

  return (
    <Paper
      elevation={1}
      sx={{
        py: 0,
        px: 0,
        // width: { xs: 350, sm: 'auto' },
        maxWidth: 380,
        minWidth: 328,
      }}
      // sx={{ px: 0, pt: 0, border: theme.palette.mode === 'dark' ? 0 : 1, borderColor: 'lightgray' }}
    >
      <div></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {socialUrl.includes('instagram') && (
          <InstagramEmbed url={socialUrl} width={'100%'} captioned placeholderDisabled scriptLoadDisabled={script} />
        )}
        {socialUrl.includes('facebook') && (
          <FacebookEmbed url={socialUrl} width={'100%'} placeholderDisabled scriptLoadDisabled={false} />
        )}
      </div>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={0} sx={{ width: '92%' }}>
            <TextField
              color='secondary'
              sx={{ mb: 3 }}
              variant='standard'
              size='small'
              type='text'
              fullWidth
              inputRef={captionRef}
              label='Add a reaction.. ❤️💕😂👍🏽'
              required
              multiline
              InputProps={{ style: { fontSize: 14 } }}
            />
          </Stack>
         </Box> */}
    </Paper>

    // <Card sx={{ display: 'flex', maxWidth: 380, minWidth: 328 }}>
    //   <CardHeader
    //     avatar={
    //       <Tooltip placement='top' title={doc.data?.uName}>
    //         <Avatar
    //           sx={{ bgcolor: red[500] }}
    //           src={doc.data?.uAvatar}
    //           alt={doc.data?.uName}
    //           aria-label={doc.data?.uName}
    //         >
    //           {doc.data?.uName?.charAt(0)}
    //         </Avatar>
    //       </Tooltip>
    //     }
    //     action={<PostOptions postDoc={doc} />}
    //     title={doc.data?.title}
    //     subheader={doc.data?.subtitle}
    //   />
    //   {doc.data?.postType === 'Instagram' && embedToggle && (
    //     <InstagramEmbed url={doc.data?.postUrl} width={'100%'} retryDelay={1000} />
    //   )}
    //   <CardContent>
    //     <Typography variant='body2' color='text.primary'>
    //       {doc.data?.caption}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing sx={{ py: 0 }}>
    //     {login && (
    //       <>
    //         <IconButton onClick={handleLikeClick} aria-label='add to favorites'>
    //           <FavoriteIcon sx={{ color: like }} />
    //         </IconButton>
    //         <IconButton aria-label='share'>
    //           <ShareIcon />
    //         </IconButton>
    //       </>
    //     )}
    //   </CardActions>
    // </Card>
  );
}

export default memo(SocialPostCard);
