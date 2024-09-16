import { useContext } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { GlobalContext } from "../../Context/GlobalState";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import "./Profile.css";

export function Profile() {
  const global = useContext(GlobalContext);

  const handleResponderConsultas = (id: string) => {
    global?.changeMenuResponse(true, id);
  };

  return (
    <>
      <Header />
      <section className="profile">
        <div className="container">
          <div className="profile-welcome">
            <Typography variant="h3" component="h1">
              Bienvenido, {global?.user?.nombre} {global?.user?.apellido}!
            </Typography>
          </div>
          <hr style={{ width: "50%", margin: "1em auto" }} />
          <Typography variant="h4" sx={{ mb: 3 }}>
            Mis Consultas
          </Typography>

          {global?.consults.length === 0 ? (
            <Typography variant="body1">
              No tienes consultas.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {global?.consults.map((consulta) => (
                <Grid item xs={12} sm={6} md={4} key={consulta.id}>
                  <Card component={Paper} elevation={3} sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="body1" gutterBottom>
                        <strong>Descripción:</strong> {consulta.descripcion}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Respuesta:</strong> {consulta.respuesta || "No respondida"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Cerrado:</strong> {consulta.cerrado ? "Sí" : "No"}
                      </Typography>
                    </CardContent>
                    {global?.user.rol === 1 && !consulta.cerrado && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleResponderConsultas(consulta.id)}
                        sx={{ m: 2 }}
                      >
                        Responder
                      </Button>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
