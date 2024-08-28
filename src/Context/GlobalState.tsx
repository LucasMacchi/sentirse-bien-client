import { useReducer } from "react";
import {createContext} from "react";
import { IAction, IGlobalContext, IPropsChildren, IUser, IToken, IAlert } from "../Interfaces/Interfaces";
import usersMock from "../Mocks/users.json";
import token from "../Mocks/token.json";
import actions from "./Actions";
import axios from "axios";

export const GlobalContext = createContext<IGlobalContext | null>(null)
const use_mock = import.meta.env.VITE_USE_MOCK
const server_url = import.meta.env.VITE_SERVER_URL

//Reducer
const globalReducer = (state: IGlobalContext, action: IAction): IGlobalContext => {
    const {payload, type} = action
    switch(type){
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
    const getUserInfo = async () => {
        if(use_mock === "1"){
            const userToMock = usersMock.users[0]
            return {nombre: userToMock.nombre, apellido: userToMock.apellido, mail: userToMock.mail, rol: userToMock.rol}
        }
        else{
            const user: IUser = await (await axios.get(server_url+'/user/'+localStorage.getItem('jwToken'))).data
            if(user){
                dispatch({
                    payload: user,
                    type: actions.GET_USER_INFO
                })
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
            if(email === "lucasmacchi25@gmail.com" && password === "123456"){
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

    //


    //Estado Inicial
    const initialState: IGlobalContext = {
        user: {nombre: "", apellido: "", mail: "", rol: 2},
        alert: {status: false, type: "info", msg: ""},
        Mlogin: false,
        isLog: false,
        changeMenuLogin,
        getUserInfo,
        login,
        logout,
        alertStatus
    };

    //uso del Reducer
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return(
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    );
}