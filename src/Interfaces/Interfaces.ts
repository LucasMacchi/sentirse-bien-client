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
    telefono: string,
    username: string,
    adult?: boolean,
};

export interface ITurno {
    servicio: string,
    fecha: string,
    hora: string,
    usuario?: string
};

export interface IReview {
    id: string,
    rating: number,
    comment: string,
    nombre?: string
};

export interface IConsulta {
    id: string,
    descripcion: string,
    respuesta: string,
    cerrado: boolean
};


export interface IToken {
    token: string
};

export interface IAlert {
    status: boolean,
    type: "success" | "info" | "warning" | "error",
    msg: string
};

export interface IPropsChildren {
    children: React.ReactNode | JSX.Element | JSX.Element[]
};

export interface IAction {
    type: string,
    payload: any
};

export interface IGlobalContext {
    user: IUser,
    alert: IAlert,
    idConsult: string,
    Mlogin: boolean,
    isLog: boolean,
    MRegister: boolean,
    MConsult: boolean,
    MReview: boolean,
    MResponse: boolean,
    consults: IConsulta[],
    reviews: IReview[],
    turnosOcupados: string[],
    changeMenuLogin: (payload: boolean) => void,
    changeMenuRegister: (payload: boolean) => void,
    changeMenuConsult: (payload: boolean) => void,
    changeMenuReview: (payload: boolean) => void,
    changeMenuResponse: (payload: boolean, consult_id: string) => void
    getUserInfo: () => void
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    register: (user: IUserToResgister) => Promise<boolean>,
    session: () => void,
    makeConsult: (consult: string) => Promise<boolean>,
    getConsult: () => void,
    makeReview: (comment: string, rating: number, name: string) => Promise<boolean>,
    getReviews: () => void,
    respondConsult: (response: string, consult_id: string) => void,
    getTurnos: () => Promise<void>,
    makeTurno: (turno: ITurno) => Promise<boolean>,
    alertStatus: (status: boolean, type: "success" | "info" | "warning" | "error", msg: string) => void,
    getIdConsult: (id: string) => void,
};
