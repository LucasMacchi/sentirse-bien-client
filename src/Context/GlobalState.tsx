import { useReducer } from "react";
import { createContext } from "react";
import { IAction, IGlobalContext, IPropsChildren, IUser, IToken, IAlert, IUserToResgister, IConsulta, IReview, ITurno } from "../Interfaces/Interfaces";
import usersMock from "../Mocks/users.json";
import token from "../Mocks/token.json";
import consults from "../Mocks/consults.json"
import reviews from "../Mocks/reviews.json";
import turnosJSON from "../Mocks/turnos.json";
import actions from "./Actions";
import axios from "axios";

export const GlobalContext = createContext<IGlobalContext | null>(null)
const use_mock = import.meta.env.VITE_USE_MOCK
const server_url = import.meta.env.VITE_SERVER_URL

//Reducer
const globalReducer = (state: IGlobalContext, action: IAction): IGlobalContext => {
    const { payload, type } = action
    switch (type) {
        case actions.CHANGE_MENU_RESPONSE:
            return { ...state, MResponse: payload }
        case actions.GET_ID_CONSULT:
            return { ...state, idConsult: payload }
        case actions.GET_TURNS:
            return { ...state, turnosOcupados: payload }
        case actions.CHANGE_MENU_REVIEW:
            return { ...state, MReview: payload }
        case actions.GET_CONSULTS:
            return { ...state, consults: payload }
        case actions.CHANGE_MENU_CONSULT:
            return { ...state, MConsult: payload }
        case actions.CHANGE_MENU_REGISTER:
            return { ...state, MRegister: payload }
        case actions.ALERTSTATUS_CHANGE:
            return { ...state, alert: payload }
        case actions.LOGSTATUS_CHANGE:
            return { ...state, isLog: payload }
        case actions.GET_USER_INFO:
            return { ...state, user: payload };
        case actions.CHANGE_MENU_LOGIN:
            return { ...state, Mlogin: payload }
        default:
            return state;
    }
};

//Estado Global
export default function GlobalState(props: IPropsChildren) {

    //Funciones
    //Funcion que trae toda la informacion el usuario para mostrar
    const getUserInfo = async (session?: boolean) => {
        if (use_mock === "1") {
            const userToMock = usersMock.users[0]
            dispatch({
                payload: userToMock,
                type: actions.GET_USER_INFO
            })
            if (session) {
                dispatch({
                    type: actions.LOGSTATUS_CHANGE,
                    payload: true
                })
            }
        }
        else {
            const tkn = localStorage.getItem('jwToken')
            const user: IUser = await (await axios.get(server_url + '/usuarios/info_usuario/', { headers: { Authorization: "Token " + tkn } })).data
            if (user) {
                dispatch({
                    payload: user,
                    type: actions.GET_USER_INFO
                })
                if (session) {
                    dispatch({
                        type: actions.LOGSTATUS_CHANGE,
                        payload: true
                    })
                }
            }
        }
    }

    //Funcion abre o cierra login
    const changeMenuLogin = (payload: boolean) => {
        dispatch({
            type: actions.CHANGE_MENU_LOGIN,
            payload: payload
        })
    }
    //Funcion para hacer login
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            if (use_mock === "1") {
                if (username === "lu@g.c" && password === "1") {
                    localStorage.setItem('jwToken', token.token);
                    dispatch({
                        payload: true,
                        type: actions.LOGSTATUS_CHANGE
                    })
                    return true
                }
                else return false
            }
            else {
                const access: IToken = await (await axios.post(server_url + '/usuarios/login/', { username: email, password })).data
                if (access.token) {
                    localStorage.setItem('jwToken', access.token);
                    return true
                }
                else return false
            }
        } catch (error) {
            console.log(error)
            return false
        }

    }

    //Logout
    const logout = () => {
        dispatch({
            payload: false,
            type: actions.LOGSTATUS_CHANGE
        })
        dispatch({
            payload: { nombre: "", apellido: "", mail: "", rol: 2 },
            type: actions.GET_USER_INFO
        })
        try {
            axios.get(server_url + "/usuarios/logout/", { headers: { Authorization: "Token " + localStorage.getItem('jwToken') } })
            localStorage.removeItem('jwToken')
            window.location.reload()
        } catch (error) {
            console.log(error)
            localStorage.removeItem('jwToken')
            window.location.reload()
        }

    }

    //define las alertas
    const alertStatus = (status: boolean, type: "success" | "info" | "warning" | "error", msg: string) => {
        const alerta: IAlert = { status, type, msg }
        dispatch({
            type: actions.ALERTSTATUS_CHANGE,
            payload: alerta
        })
    }

    //Abre o cierra el registro
    const changeMenuRegister = (payload: boolean) => {
        dispatch({
            type: actions.CHANGE_MENU_REGISTER,
            payload: payload
        })
    }
    //Registra el usuario
    const register = async (user: IUserToResgister): Promise<boolean> => {
        try {
            if (use_mock === "1") {
                const userlog: IUser = {
                    nombre: user.name,
                    apellido: user.surname,
                    rol: 1,
                    email: user.email
                }
                dispatch({
                    type: actions.LOGSTATUS_CHANGE,
                    payload: true,
                })
                dispatch({
                    type: actions.GET_USER_INFO,
                    payload: userlog
                })
                return true
            }
            else {
                user.adult = true
                user.username = user.email
                const access: boolean = await (await axios.post(server_url + '/usuarios/registro/', user)).data
                if (access) return true
                else return false
            }
        } catch (error) {
            console.log(error)
            return false
        }

    }

    //Session
    const session = async () => {
        console.log("is mock active? " + use_mock)
        try {
            const tkn = localStorage.getItem('jwToken')
            if (tkn) {
                await getUserInfo(true)
            }
            else {
                console.log("No session found")
            }
        } catch (error) {
            console.log("ERROR: ", error)
            localStorage.removeItem('jwToken')
        }
    }
    //Abre o cierra el consultas
    const changeMenuConsult = (payload: boolean) => {
        dispatch({
            type: actions.CHANGE_MENU_CONSULT,
            payload: payload
        })
    }
    //Crea consultas
    const makeConsult = async (consulta: string): Promise<boolean> => {
        try {
            if (use_mock === "1") {
                return true
            }
            else {
                const token = localStorage.getItem('jwToken')
                axios.post(server_url + "/consultas/nueva_consulta/", consulta, { headers: { Authorization: "Token " + token } })
                console.log("CONSULTA HECHA")
                return true
            }
        } catch (error) {
            console.log("ERROR: ", error)
            return false
        }
    }
    //trae consultas
    const getConsult = async () => {
        console.log("Consults requested...")
        try {
            if (use_mock === "1") {
                dispatch({
                    type: actions.GET_CONSULTS,
                    payload: consults.consults
                })
            }
            else {
                const token = localStorage.getItem('jwToken')
                const consultas: IConsulta[] = await (await axios.get(server_url + "/consultas/mostrar_consultas/", { headers: { Authorization: "Token " + token } })).data
                console.log(consultas)
                dispatch({
                    type: actions.GET_CONSULTS,
                    payload: consultas
                })
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    //Responde consultas
    const respondConsult = async (response: string, consult_id: string) => {
        try {
            if (use_mock === "1") {
                console.log("Consulta ID " + consult_id + " respondida")
            }
            else {
                const token = localStorage.getItem('jwToken')
                await axios.patch(server_url + "/consultas/" + consult_id + "/respuesta/", response, { headers: { Authorization: "Token " + token } })
                console.log("Consulta ID " + consult_id + " respondida")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const getIdConsult = (id: string) => {
        dispatch({
            type: actions.GET_ID_CONSULT,
            payload: id
        })
    }

    const changeMenuReview = (payload: boolean) => {
        dispatch({
            type: actions.CHANGE_MENU_REVIEW,
            payload: payload
        })
    }

    const makeReview = async (comment: string, rating: number, name: string): Promise<boolean> => {
        try {
            const review = {
                nombre: name,
                descripcion: comment,
                puntaje: rating
            }
            if (use_mock === "1") {
                return true
            }
            else {
                await axios.post(server_url + "/reseñas/agregar_reseña/", review)
                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const getReviews = async () => {
        console.log("Reviews requested...")
        try {
            if (use_mock === "1") {
                const reviewsAll: IReview[] = reviews.reviews
                dispatch({
                    type: actions.GET_REVIEWS,
                    payload: reviewsAll
                })
            }
            else {
                const reviews = await (await axios.get(server_url + "/reseñas/mostrar_reseñas/")).data
                dispatch({
                    type: actions.GET_REVIEWS,
                    payload: reviews
                })
            }
        } catch (error) {
            console.log(error)
            return []
        }
    }

    const getTurnos = async (): Promise<void> => {
        console.log("Turns requested...")
        try {
            if (use_mock === "1") {
                const array = turnosJSON.fecha.map(f => {
                    return f.fecha + ":" + f.hora.split(':')[0]
                })
                dispatch({
                    type: actions.GET_TURNS,
                    payload: array
                })
            }
            else {
                const turns: ITurno[] = await (await axios.get(server_url + "/turnos/obtener_turnos/", { headers: { Authorization: "Token " + localStorage.getItem('jwToken') } })).data
                const array = turns.map(f => {
                    return f.fecha + ":" + f.hora.split(':')[0]
                })
                dispatch({
                    type: actions.GET_TURNS,
                    payload: array
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
    const makeTurno = async (turno: ITurno): Promise<boolean> => {
        try {
            if (use_mock === "1") return true
            else {
                const token = localStorage.getItem('jwToken')
                await axios.post(server_url + "/turnos/elegir_turno/", turno, { headers: { Authorization: "Token " + token } })
                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //Abre o cierra el respuesta
    const changeMenuResponse = (payload: boolean, consult_id: string) => {
        getIdConsult(consult_id)
        dispatch({
            type: actions.CHANGE_MENU_RESPONSE,
            payload: payload
        })
    }
    //Estado Inicial
    const initialState: IGlobalContext = {
        user: { nombre: "", apellido: "", email: "", rol: 1 },
        alert: { status: false, type: "info", msg: "" },
        Mlogin: false,
        MRegister: false,
        isLog: false,
        idConsult: "",
        MConsult: false,
        MReview: false,
        MResponse: false,
        reviews: [],
        consults: [],
        turnosOcupados: [],
        changeMenuLogin,
        changeMenuRegister,
        changeMenuConsult,
        changeMenuReview,
        changeMenuResponse,
        getUserInfo,
        login,
        logout,
        register,
        session,
        alertStatus,
        makeConsult,
        getConsult,
        respondConsult,
        makeReview,
        getReviews,
        getTurnos,
        makeTurno,
        getIdConsult
    };

    //uso del Reducer
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    );
}
