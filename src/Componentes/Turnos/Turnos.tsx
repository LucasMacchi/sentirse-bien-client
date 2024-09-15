import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "./Turnos.css";
import { GlobalContext } from "../../Context/GlobalState";
import { useNavigate } from "react-router-dom";

// Definir las horas disponibles
const START_HOUR = 9; // 9 AM
const END_HOUR = 21; // 9 PM
const INTERVAL = 2; // Intervalo de 2 horas

// Lista de servicios disponibles
const SERVICES = [
  "VelaSlim - $10000",
  "DermoHealth - $10000",
  "Criofrecuencia - $10000",
  "Ultracavitación - $10000",
  "Punta de diamante - $10000",
  "Limpieza Profunda + Hidratación - $10000",
  "Criofrecuencia Facial - $10000",
  "Lifting Pestaña - $10000",
  "Depilación Facial - $10000",
  "Belleza Manos y Pies - $10000",
  "Masaje Anti-stress - $10000",
  "Masaje Descontracturante - $10000",
  "Masaje Piedras Calientes - $10000",
  "Masaje Circulatorio - $10000"
];

const Turnos: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [occupiedTimes, setOccupiedTimes] = useState<Set<string>>(
    new Set(["10:00 AM"]) // Ejemplo de hora ocupada
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const global = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeSlots(generateTimeSlots(START_HOUR, END_HOUR, INTERVAL));

    if (!global?.isLog) {
      global?.changeMenuLogin(true);
      navigate("/");
    }
  }, [global, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Nombre:", name);
    console.log("Fecha:", date);
    console.log("Hora:", time);
    console.log("Servicios:", selectedServices);
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedDate = event.target.value;
    setDate(selectedDate);

    const timesForSelectedDate = getOccupiedTimesForDate(selectedDate);
    setOccupiedTimes(new Set(timesForSelectedDate));
  };

  const getOccupiedTimesForDate = (date: string): string[] => {
    return ["10:00 AM"]; 
  };

  const handleServiceChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    // Asegurarse de que `value` es un array de servicios
    const newValue = value as string[];
    if (newValue.length <= 2) {
      setSelectedServices(newValue);
    } else {
      alert("Puedes seleccionar hasta 2 servicios como máximo.");
    }
  };

  // Obtener la fecha de hoy en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Header />
      <div className="turnos-container">
        <Container component="main" maxWidth="xs">
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={{ padding: "2rem" }}
          >
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Fecha"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={handleDateChange}
                  inputProps={{ min: today }} // Bloquear fechas anteriores a hoy
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Hora"
                  select
                  InputLabelProps={{ shrink: true }}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  helperText="Selecciona una hora"
                >
                  {timeSlots.map((slot, index) => (
                    <MenuItem
                      key={index}
                      value={slot}
                      disabled={occupiedTimes.has(slot)}
                    >
                      {slot} {occupiedTimes.has(slot) ? "(Ocupado)" : ""}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Servicios</InputLabel>
                  <Select
                    multiple
                    value={selectedServices}
                    onChange={handleServiceChange}
                    renderValue={(selected) => (
                      <div>
                        {selected.join(", ")}
                      </div>
                    )}
                    inputProps={{ "aria-label": "Servicios" }}
                  >
                    {SERVICES.map((service, index) => (
                      <MenuItem key={index} value={service}>
                        <Checkbox checked={selectedServices.indexOf(service) > -1} />
                        <ListItemText primary={service} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: "#14544E" }}
            >
              Reservar
            </Button>
          </form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Turnos;

const generateTimeSlots = (
  startHour: number,
  endHour: number,
  interval: number
): string[] => {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour += interval) {
    const formattedHour = `${Math.floor(hour % 12 || 12)}:00 ${
      hour >= 12 ? "PM" : "AM"
    }`;
    slots.push(formattedHour);
  }
  return slots;
};
