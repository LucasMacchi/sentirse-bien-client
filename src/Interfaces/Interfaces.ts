export interface IUser {
    nombre: string,
    apellido: string,
    rol: number, //0 --> visitante | 1 --> usuario | 2 --> staff 
    email: string,
};

export interface IUserToResgister {
    name: string,
    surname: string,
    email: string,
    password: string,
    phone: string,
    cuil: string,
    adult?: boolean,
    codigo: string
}

export interface ITurno {
    servicio: string,
    fecha: string,
    hora: string,
    estado: boolean
}

export interface IConsulta {
    id: string,
    descripcion: string,
    respuesta: string,
    cerrado: boolean
}


export interface IToken {
    token: string
}

export interface IAlert {
    status: boolean,
    type: "success" | "info" | "warning" | "error",
    msg: string
}

export interface IPropsChildren {
    children: React.ReactNode | JSX.Element | JSX.Element[]
};

export interface IAction {
    type: string,
    payload: any
};

export interface IGlobalContext {
    user: IUser,
    alert: IAlert
    Mlogin: boolean,
    isLog: boolean,
    MRegister: boolean,
    MConsult: boolean,
    consults: IConsulta[],
    changeMenuLogin: (payload: boolean) => void,
    changeMenuRegister: (payload: boolean) => void,
    changeMenuConsult: (payload: boolean) => void,
    getUserInfo: () => void
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    register: (user: IUserToResgister) => Promise<boolean>,
    session: () => void,
    makeConsult: (consult: string) => Promise<boolean>,
    getConsult: () => void,
    respondConsult: (response: string, consult_id: string) => void,
    alertStatus: (status: boolean, type: "success" | "info" | "warning" | "error", msg: string) => void,
};
