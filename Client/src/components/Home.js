import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Rating from "@mui/material/Rating";
import { useSelector } from 'react-redux';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Cinema Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  const auth = useSelector(state => state.auth);
  const [list, setList] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:3000/api/peliculas').then( res =>{
      setList(res.data);
    }).catch( error => {
      console.log(error)
    })
  },[setList])

  console.log(auth);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Cinema Project
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
             {auth.username}  
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Encuentra tus peliculas preferidas
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              En Cinema Project te ayudamos a decidir que pelicula veras hoy, encuentra las mejores peliculas y forma parte de la comunidad al hacer tu propio review y ayudar a los demas a decidir que pelicula ver. 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Watch list</Button>
              <Button variant="outlined">Perfil</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {list.map((lista) => (
              <Grid item key={lista._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={lista.imagen}
                    alt="pelicula"
                  />
                   <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h4" component="h1">
                      {lista.filme}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3">
                      Director: {lista.director}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3">
                      Reparto: {lista.reparto}
                    </Typography>
                    <Typography>
                      {lista.sinopsis}
                    </Typography>                
                  </CardContent>
                  <Stack spacing={1} alignItems="left"
  justifyContent="left" sx={{ m: 2}}>
                      <Rating name="half-rating" defaultValue={parseInt(lista.rate)} precision={0.5} readOnly />
                    </Stack>
                  <CardActions>
                    <Button size="small">Mirar Trailer</Button>
                    <Button size="small">Comentar</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}