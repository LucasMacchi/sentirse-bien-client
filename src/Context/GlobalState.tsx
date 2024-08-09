import { useReducer } from "react";
import {createContext} from "react"
import { IAction, IGlobalContext, IPropsChildren, IUser } from "../Interfaces/Interfaces";
import usersMock from "../Mocks/users.json"
import actions from "./Actions";
import * as dotenv from 'dotenv';
dotenv.config();

const GlobalContext = createContext<IGlobalContext | null>(null)
const use_mock = process.env.USE_MOCK

//Reducer
const globalReducer = (state: IGlobalContext, action: IAction): IGlobalContext => {
    const {payload, type} = action
    switch(type){
        case actions.GET_USER_INFO:
            return {...state, user: payload};
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
            return {nombre: userToMock.nombre, apellido: userToMock.apellido, mail: userToMock.mail}
        }
        else{
            return {nombre: "", apellido: "", mail: ""}
        }
    }





    //Estado Inicial
    const initialState: IGlobalContext = {
        user: {nombre: "", apellido: "", mail: ""},
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