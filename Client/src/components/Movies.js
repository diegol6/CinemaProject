import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Comments from "./Comments";
import Chip from "@mui/material/Chip";
import { useParams } from "react-router-dom";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="">
        Cinema Project
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Movies = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/peliculas/${id}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movie.length]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <img alt="movie" width="600" height="800" src={movie.imagen} />

        <Stack direction="row" spacing={1}>
          <Chip label={movie.categoria} variant="outlined" />
        </Stack>

        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          style={{ fontWeight: 900, textAlign: "center" }}
        >
          {movie.filme}
        </Typography>
        <Typography style={{ fontWeight: 900, textAlign: "left" }}>
          Director
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {movie.director}
        </Typography>
        <Typography style={{ fontWeight: 900, textAlign: "left" }}>
          Reparto
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {movie.reparto}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {movie.sinopsis}
        </Typography>
        <Stack
          spacing={1}
          alignItems="left"
          justifyContent="left"
          sx={{ m: 2 }}
        >
          <Rating
            name="half-rating"
            value={parseInt(movie.rate)}
            precision={0.5}
            readOnly
          />
        </Stack>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Comments />
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default Movies;
