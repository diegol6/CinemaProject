import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Cinema Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();


export default function SignIn() {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

   const handleSubmit =  (event) => {
    event.preventDefault();
    const qs = require('qs');
    const data = { user, password}
      axios.post('http://localhost:3000/api/autenticar', qs.stringify(data)).then( res => {
          dispatch(authActions.login({username: res.data.username, access: res.data.tipo}));   
          navigate("/home", { replace: true });
          console.log(res.data) 
      }).catch( error => {
        console.log(error);
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cinema Project
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="user"
              autoFocus
              value={user}
              onChange={ e => setUser(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={ e => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuerdame"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"No tienes cuenta? Crea tu cuenta"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}