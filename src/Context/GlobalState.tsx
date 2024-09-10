import { useReducer } from "react";
import {createContext} from "react";
import { IAction, IGlobalContext, IPropsChildren, IUser, IToken, IAlert, IUserToResgister, IConsulta } from "../Interfaces/Interfaces";
import usersMock from "../Mocks/users.json";
import token from "../Mocks/token.json";
import consults from "../Mocks/consults.json"
import actions from "./Actions";
import axios from "axios";

export const GlobalContext = createContext<IGlobalContext | null>(null)
const use_mock = import.meta.env.VITE_USE_MOCK
const server_url = import.meta.env.VITE_SERVER_URL
const cod_reg = import.meta.env.VITE_REGISTRO

//Reducer
const globalReducer = (state: IGlobalContext, action: IAction): IGlobalContext => {
    const {payload, type} = action
    switch(type){
        case actions.GET_CONSULTS:
            return {...state, consults: payload}
        case actions.CHANGE_MENU_CONSULT:
            return {...state, MConsult: payload}
        case actions.CHANGE_MENU_REGISTER:
            return {...state, MRegister: payload}
        case actions.ALERTSTATUS_CHANGE:
            return {...state, alert: payload}
        case actions.LOGSTATUS_CHANGE:
            return {...state, isLog: payload}
        case actions.GET_USER_INFO:
            return {...state, user: payload};
        case actions.CHANGE_MENU_LOGIN:
            return {...state, Mlogin: payload}
        default:
            return state;
    }
};

//Estado Global
export default function GlobalState(props: IPropsChildren){

    //Funciones
    //Funcion que trae toda la informacion el usuario para mostrar
    const getUserInfo = async (session?: boolean) => {
        if(use_mock === "1"){
            const userToMock = usersMock.users[0]
            dispatch({
                payload: userToMock,
                type: actions.GET_USER_INFO
            })
        }
        else{
            const user: IUser = await (await axios.get(server_url+'/user/'+localStorage.getItem('jwToken'))).data
            if(user){
                dispatch({
                    payload: user,
                    type: actions.GET_USER_INFO
                })
                if(session){
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
        if(use_mock === "1"){
            if(email === "lu@g.c" && password === "1"){
                localStorage.setItem('jwToken', token.token);
                dispatch({
                    payload: true,
                    type: actions.LOGSTATUS_CHANGE
                })
                return true
            }
            else return false
        }
        else{
            const access: IToken = await (await axios.post(server_url+'/user/login', {email, password})).data
            if(access.token){
                localStorage.setItem('jwToken', access.token);
                return true
            }
            else return false
        }
    }

    //Logout
    const logout = () => {
        dispatch({
            payload: false,
            type: actions.LOGSTATUS_CHANGE
        })
        dispatch({
            payload: {nombre: "", apellido: "", mail: "", rol: 2},
            type: actions.GET_USER_INFO
        })
        localStorage.removeItem('jwToken')
    }

    //define las alertas
    const alertStatus = (status: boolean, type: "success" | "info" | "warning" | "error", msg: string) => {
        const alerta: IAlert = {status, type, msg}
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
        if(use_mock === "1"){
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
        else{
            user.adult = true
            if(user.codigo === cod_reg) {
                const access: boolean = await (await axios.post(server_url+'/user/register', user)).data
                if(access) return true
                else return false
            }
            else return false
        }
    }

    //Session
    const session = async () => {
        try {
            const tkn = localStorage.getItem('jwToken')
            if(tkn){
                await getUserInfo(true)
            }
            else{
                console.log("No session found")
            }
        } catch (error) {
            console.log("ERROR: ",error)
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
    const makeConsult = async (consult: string): Promise<boolean> => {
        try {
            if(state.isLog){
                if(use_mock === "1"){
                    return true
                }
                else{
                    const token = localStorage.getItem('jwToken')
                    axios.post(server_url+"/user/consult",consult, {headers:{Authorization: token}})
                    console.log("CONSULTA HECHA")
                    return true
                }
            }
            else return false
        } catch (error) {
            console.log("ERROR: ",error)
            return false
        }
    }
    //trae consultas
    const getConsult = async () => {
        try {
            if(state.isLog){
                if(use_mock === "1") {
                    dispatch({
                        type: actions.GET_CONSULTS,
                        payload: consults.consults
                    })
                }
                else{
                    const token = localStorage.getItem('jwToken')
                    const consultas: IConsulta[] = await (await axios.get(server_url+"/consult",{headers:{Authorization: token}})).data
                    console.log(consultas)
                    dispatch({
                        type: actions.GET_CONSULTS,
                        payload: consultas
                    })
                }
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    }
    //Responde consultas
    const respondConsult = async (response: string, consult_id: string) => {
        try {
            if(use_mock === "1"){
                state.consults.forEach(c => {
                    if(c.id === consult_id) c.respuesta = response
                });
            }
            else{
                const token = localStorage.getItem('jwToken')
                const data = {
                    response: response,
                    id: consult_id
                }
                axios.patch(server_url+"/consult/respond", data ,{headers:{Authorization: token}})
                state.consults.forEach(c => {
                    if(c.id === consult_id) c.respuesta = response
                });
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    }

    //Estado Inicial
    const initialState: IGlobalContext = {
        user: {nombre: "", apellido: "", email: "", rol: 2},
        alert: {status: false, type: "info", msg: ""},
        Mlogin: false,
        MRegister: false,
        isLog: false,
        MConsult: false,
        consults: [],
        changeMenuLogin,
        changeMenuRegister,
        changeMenuConsult,
        getUserInfo,
        login,
        logout,
        register,
        session,
        alertStatus,
        makeConsult,
        getConsult,
        respondConsult
    };

    //uso del Reducer
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return(
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    );
}