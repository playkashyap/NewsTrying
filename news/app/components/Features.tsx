"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Features(data: any) {

  const Data = data.data;

  function openSource(url: string) {
    window.open(url, '_blank');
  }



  return (
    <Container id="features" sx={{ pt: { xs: 8, sm: 16 } }}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Button variant="text" onClick={() => openSource(Data.url)} endIcon={<OpenInNewIcon />}>
          {Data.source.name}
        </Button>
        <Typography variant="body2" color="text.secondary">
          Author : {Data.author}
        </Typography>
      </Stack>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              {Data.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              {Data.description}
            </Typography>
          </div>
          <Card
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
              position: 'relative',
            }}
          >
            <img
              src={Data.urlToImage}
              alt={Data.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Ensure the image covers the entire container
              }}
            />
            {/* <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box> */}
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >

            <img
              src={Data.urlToImage}
              alt={Data.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}