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
    Box,
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
        const token = localStorage.getItem('jwToken')
        if (!token) {
            navigate("/");
            global?.changeMenuLogin(true);
        }
    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const turno: ITurno = {
            servicio: selectedServices[0] + ", " + selectedServices[1],
            fecha: date,
            hora: time,
            pagado: false,
            monto: selectedServices.length === 1 ? 10000 : 20000
        }
        const turn = await global?.makeTurno(turno)
        console.log(turn)
        if(turn){
            global?.alertStatus(true, "success", "Gracias por sacar su turno!")
            setTimeout(() => {
                global?.changeMenuPayment(true, {...turn, monto: turno.monto})
            }, 1500);
        }
        else{
            global?.alertStatus(true, "error", "Error al crear turno")
        }
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
        const newValue = value as string[];
        if (newValue.length <= 2) {
            setSelectedServices(newValue);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <Header />
            <Box>
                <Container component="main" maxWidth="xs">
                    <Typography
                        component="h1"
                        variant="h5"
                        align="center"
                    >
                        Reserva de Turno
                    </Typography>
                    <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{marginBottom: 2}}
                        />
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
                            sx={{marginBottom: 2}}
                            />
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
                                sx={{marginBottom: 2}}
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
            </Box>
        </>
    );
};

export default Turnos;
