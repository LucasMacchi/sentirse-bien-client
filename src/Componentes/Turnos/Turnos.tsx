import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./Turnos.css";
import { GlobalContext } from "../../Context/GlobalState";
import { useNavigate } from "react-router-dom";

const Turnos: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Nombre:", name);
  };

  const global = useContext(GlobalContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!global?.isLog ){
        global?.changeMenuLogin(true);
        navigate('/');
    } 
  }, [global, navigate]);

  return (
    <>
      <Header></Header>
      <div className="turnos-container">
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5" align="center" sx={{padding: '2rem'}}>
            Reserva de Turno
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: '#14544E'}}
            >
              Reservar
            </Button>
          </form>
        </Container>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Turnos;
