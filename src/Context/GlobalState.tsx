import { useReducer } from "react";
import {createContext} from "react"
import { IAction, IGlobalContext, IPropsChildren, IUser } from "../Interfaces/Interfaces";
import usersMock from "../Mocks/users.json"
import actions from "./Actions";


export const GlobalContext = createContext<IGlobalContext | null>(null)
const use_mock = import.meta.env.VITE_USE_MOCK

//Reducer
const globalReducer = (state: IGlobalContext, action: IAction): IGlobalContext => {
    const {payload, type} = action
    switch(type){
        case actions.GET_USER_INFO:
            return {...state, user: payload};
        case actions.CHANGE_MENU_LOGIN:
            return {...state, Mlogin: payload}
        default:
            return state;
    };
};

//Estado Global
export default function GlobalState(props: IPropsChildren){

    //Funciones
    //Funcion que trae toda la informacion el usuario para mostrar
    const getUserInfo = (): IUser => {
        if(use_mock === "1"){
            const userToMock = usersMock.users[0]
            return {nombre: userToMock.nombre, apellido: userToMock.apellido, mail: userToMock.mail, rol: userToMock.rol}
        }
        else{
            return {nombre: "", apellido: "", mail: "", rol: 0}
        }
    }

    //Funcion abre o cierra login
    const changeMenuLogin = (payload: boolean) => {
        dispatch({
            type: actions.CHANGE_MENU_LOGIN,
            payload: payload
        })
    }





    //Estado Inicial
    const initialState: IGlobalContext = {
        user: {nombre: "", apellido: "", mail: "", rol: 0},
        Mlogin: false,
        changeMenuLogin,
        getUserInfo
    };

    //uso del Reducer
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return(
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    );
};