import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Cinema Project
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/peliculas")
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <img
              src="https://i.ibb.co/d2dT19d/cine-estudio-palomitas-espana-salas-reasonwhy-esjpg.jpg"
              alt="cine"
            />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Encuentra tus peliculas preferidas
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              En Cinema Project te ayudamos a decidir que pelicula veras hoy,
              encuentra las mejores peliculas y forma parte de la comunidad al
              hacer tu propio review y ayudar a los demas a decidir que pelicula
              ver.
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
        <Container sx={{ py: 8 }} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {list.map((lista) => (
              <Grid item key={lista._id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      height: 450,
                    }}
                    image={lista.imagen}
                    alt="pelicula"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="h1"
                      style={{ fontWeight: 900, textAlign: "center" }}
                    >
                      {lista.filme}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      style={{ fontStyle: "italic", textAlign: "center" }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        style={{ fontWeight: 700, fontStyle: "normal" }}
                      >
                        Director
                      </Typography>
                      {lista.director}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      style={{ color: "blue", textAlign: "center" }}
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        style={{
                          fontWeight: 700,
                          fontStyle: "normal",
                          color: "black",
                        }}
                      >
                        Reparto
                      </Typography>
                      {lista.reparto}
                    </Typography>
                    <Typography style={{ textAlign: "justify" }}>
                      {lista.sinopsis}
                    </Typography>
                  </CardContent>
                  <Stack
                    spacing={1}
                    alignItems="left"
                    justifyContent="left"
                    sx={{ m: 2 }}
                  >
                    <Rating
                      name="half-rating"
                      defaultValue={parseInt(lista.rate)}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                  <CardActions>
                    <Button size="small">Mirar Trailer</Button>
                    <Button
                      size="small"
                      onClick={() => navigate(`/movies/${lista._id}`)}
                    >
                      Mas informacion
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
