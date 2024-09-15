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


  const handleResponderConsultas = () => {
    console.log("Responder consultas");
  };

  console.log("User Role:", global?.user.rol);
  console.log("Consultas:", global?.consults);

  return (
    <>
      <Header />
      <section className="profile">
        <div className="container">
          <div className="profile-welcome">
            <h1>
              Bienvenido, {global?.user?.nombre} {global?.user?.apellido}!
            </h1>
          </div>
          <hr style={{ width: "50%", marginBottom: "1em" }} />
          <Typography variant="h4" sx={{ mb: 3 }}>
            Mis Consultas
          </Typography>

          {global?.consults.length === 0 ? (
            <Typography variant="body1" component="div">
              No tienes consultas.
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {global?.consults.map((consulta) => (
                  <Grid item xs={12} sm={6} md={4} key={consulta.id}>
                    <Card component={Paper}>
                      <CardContent>
                        <Typography variant="body1" component="div">
                          Descripción: {consulta.descripcion}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Respuesta: {consulta.respuesta || "No respondida"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cerrado: {consulta.cerrado ? "Sí" : "No"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {global?.user.rol === 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleResponderConsultas}
                  sx={{ mt: 3, bgcolor: "red", color: "white" }}
                >
                  Responder Consultas
                </Button>
              ) : (
                <Typography variant="body1" component="div">
                  Tú no eres administrador. No puedes responder consultas.
                </Typography>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
