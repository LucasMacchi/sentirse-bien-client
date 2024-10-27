import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Componentes
import App from "./App.tsx";
//Estados
import GlobalState from "./Context/GlobalState.tsx";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { About } from "./Componentes/About/About.tsx";
import { Servicios } from "./Componentes/Servicios/Servicios.tsx";
import { Contact } from "./Componentes/Contact/Contact.tsx";
import ScrollToTop from "./Componentes/Others/ScrollToTop.tsx";
import theme from "./Theme/theme.ts";
import { Profile } from "./Componentes/Profile/Profile.tsx";
import Turnos from "./Componentes/Turnos/Turnos.tsx";
import Empleo from "./Componentes/Empleo/Empleo.tsx";
import Login from "./Componentes/Menus/Login/Login.tsx";
import Register from "./Componentes/Menus/Register/Register.tsx";
import Consult from "./Componentes/Menus/Consult/Consult.tsx";
import Response from "./Componentes/Menus/Consult/Respond.tsx";
import Alerta from "./Componentes/Others/Alert.tsx";
import Review from "./Componentes/Menus/Review/Review.tsx";
import Payment from "./Componentes/Menus/Payment/Payment.tsx";
import Clientes from "./Componentes/Clientes/Clientes.tsx";
import Pagos from "./Componentes/Pagos/Pagos.tsx";
import Ingresos from "./Componentes/Ingresos/Ingresos.tsx";
import InformeServicios from "./Componentes/InformeServicios/InformeServicios.tsx";
import TurnosDia from "./Componentes/TurnosDia/TurnosDia.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CssBaseline>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalState>
            <Review />
            <Response />
            <Consult />
            <Login />
            <Register />
            <Payment />
            <ScrollToTop></ScrollToTop>
            <Routes>
              <Route path="/" element={<App />}></Route>
              <Route path="/about" element={<About></About>}></Route>
              <Route path="/contact" element={<Contact></Contact>}></Route>
              <Route path="/services" element={<Servicios></Servicios>}></Route>
              <Route path="/profile" element={<Profile></Profile>}></Route>
              <Route path="/turnos" element={<Turnos></Turnos>}></Route>
              <Route path="/empleo" element={<Empleo></Empleo>}></Route>
              <Route path="/clientes" element={<Clientes></Clientes>}></Route>
              <Route path="/pagos" element={<Pagos></Pagos>}></Route>
              <Route path="/ingresos" element={<Ingresos></Ingresos>}></Route>
              <Route path="/turnos-dia" element={<TurnosDia></TurnosDia>}></Route>
              <Route path="/informe-servicios" element={<InformeServicios></InformeServicios>}></Route>
            </Routes>
            <Alerta />
          </GlobalState>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
    ,
  </CssBaseline>
);
