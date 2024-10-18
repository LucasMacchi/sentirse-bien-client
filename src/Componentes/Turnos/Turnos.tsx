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
import { ITurno } from "../../Interfaces/Interfaces"


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
    const [btn] = useState(false)
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const timeSlots = ["09", "11", "13", "15", "19", "21"]
    const [occupiedTimes, setOccupiedTimes] = useState<Set<string>>(
        new Set(["10:00 AM"]) // Ejemplo de hora ocupada
    );
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const global = useContext(GlobalContext);
    const navigate = useNavigate();


    useEffect(() => {
        //setTimeSlots(generateTimeSlots(START_HOUR, END_HOUR, INTERVAL));

        if (global?.isLog === false) {
            navigate("/");
        }
    }, [navigate, global]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const turno: ITurno = {
            servicio: selectedServices[0] + ", " + selectedServices[1],
            fecha: date,
            hora: time,
            pagado: false,
            price: selectedServices.length === 1 ? 10000 : 20000
        }
        global?.changeMenuPayment(true, turno)
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
        const times: string[] = []
        global?.turnosOcupados.forEach((t) => {
            const revision = t.split(":")
            if (revision[0] === date) {
                times.push(revision[1])
            }
        })
        return times;
    };

    const handleServiceChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        // Asegurarse de que `value` es un array de servicios
        const newValue = value as string[];
        if (newValue.length <= 2) {
            setSelectedServices(newValue);
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
                                            {parseInt(slot) >= 13 ? slot + ":00 PM" : slot + ":00 AM"} {occupiedTimes.has(slot) ? "(Ocupado)" : ""}
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
                                    <Typography variant="body1">Seleccione hasta dos servicios</Typography>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, bgcolor: "#14544E" }}
                            disabled={btn}
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
