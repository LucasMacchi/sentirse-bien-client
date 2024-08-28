export interface IUser {
    nombre: string,
    apellido: string,
    rol: number, //0 --> visitante | 1 --> usuario | 2 --> staff 
    mail: string
};

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

    changeMenuLogin: (payload: boolean) => void,
    getUserInfo: () => void
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    alertStatus: (status: boolean, type: "success" | "info" | "warning" | "error", msg: string) => void,
};
