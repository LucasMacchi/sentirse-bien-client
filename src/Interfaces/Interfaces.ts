export interface IUser {
    first_name: string,
    last_name: string,
    rol: number, //0 --> usuario | 1 --> staff | 2 --> secretaria | 3 --> admin 
    email: string,
    telefono: string,
    id: string

};

export interface IUserToResgister {
    first_name: string,
    last_name: string,
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
    usuario?: string,
    pagado: boolean,
    price?: number
};

export interface IPago {
    usuario?: string,
    turno?:string,
    monto: number,
    fecha?: string
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
export interface IFactura {
    cliente: {
        nombre_apellido: string,
        domicilio?: string,
        localidad?: string,
        provincia?: string,
        pais?: string,
        tipo_identificacion?: string,
        otro_identificacion?: string,
        numero_identificacion: string,
        condicion_iva: string
    },
    moneda: string,
    fechaVencimiento: string,
    empresa: {
        nro_ingresos_brutos: string,
        fecha_inicio_actividad: string,
        categoria_fiscal: string,
        cuit: string,
        localidad: string,
        direccion: string,
        provincia: string,
        pais: string,
        nombre_empresa: string
    }
    numero: string,
    fecha: string,
    observaciones: string[],
    total: number,
    items: IItem[]

};

interface IItem {
    nombre: string,
    descripcion: string,
    cantidad: number,
    precio: number,
    importe: number
}

export interface IGlobalContext {
    user: IUser,
    alert: IAlert,
    idConsult: string,
    turnToPay: ITurno,
    Mlogin: boolean,
    isLog: boolean,
    MRegister: boolean,
    MConsult: boolean,
    MReview: boolean,
    MResponse: boolean,
    MPayment: boolean,
    consults: IConsulta[],
    reviews: IReview[],
    turnosOcupados: string[],
    turnos: ITurno[],
    pagosInforme: IPago[],
    clientes: IUser[],
    changeMenuLogin: (payload: boolean) => void,
    changeMenuRegister: (payload: boolean) => void,
    changeMenuConsult: (payload: boolean) => void,
    changeMenuReview: (payload: boolean) => void,
    changeMenuResponse: (payload: boolean, consult_id: string) => void,
    changeMenuPayment: (payload: boolean, turn: ITurno) => void,
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
    getTurnosComplete: () => Promise<void>,
    makeTurno: (turno: ITurno) => Promise<string>,
    alertStatus: (status: boolean, type: "success" | "info" | "warning" | "error", msg: string) => void,
    getIdConsult: (id: string) => void,
    makePayment: (pago: IPago) => Promise<boolean>,
    setTurn: (turn: ITurno) => void,
    getClientes: () => void,
    getPagos: () => void,
};
