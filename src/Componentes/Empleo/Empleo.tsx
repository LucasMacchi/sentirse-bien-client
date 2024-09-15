import React, { useState } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

// Define los tipos para el formulario
interface Empleo {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
}

const Empleo: React.FC = () => {
  const [formData, setFormData] = useState<Empleo>({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "resume" ? (files ? files[0] : null) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.resume
    ) {
      setError("Todos los campos son requeridos.");
      return;
    }

    // Prepare form data for submission
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("resume", formData.resume);

    try {
      // Replace with your API endpoint
      const response = await fetch("/api/submit-employment-form", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Formulario enviado con éxito");
        // Clear form or handle success
        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: null,
        });
      } else {
        setError("Error al enviar el formulario. Intenta de nuevo.");
      }
    } catch (error) {
      setError("Error al enviar el formulario. Intenta de nuevo.");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="container" style={{padding: '5em'}}>
        <Container component="main" maxWidth="xs">
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{ padding: "2rem" }}
          >
            Formulario de Empleo
          </Typography>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Número de Teléfono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <p>Sube tu curriculum aquí</p>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf, .doc, .docx"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: "#14544E" }}
            >
              Enviar
            </Button>
          </form>
        </Container>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Empleo;
