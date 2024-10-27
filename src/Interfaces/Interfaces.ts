export interface IUser {
    first_name: string,
    last_name: string,
    rol: number, //0 --> usuario | 1 --> staff | 2 --> secretaria | 3 --> admin 
    email: string,
    telefono: string,
    id: number

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
    usuario?: number,
    pagado: boolean,
    monto?: number,
    id?: number,
    profesional?: number
};

export interface IPago {
    usuario?: number,
    turno?:number,
    monto: number,
    fecha?: string,
    tipo: number, // 0 efectivo, 1 debito 2 credito
    nroPago?: string
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

export interface IPagoComplete extends IPago {
    fullname?: string,
    typeString?: string
}

export interface IProfessionals extends ITurno {
    professinalName?: string,
    userFullname?: string
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
    MRol: boolean,
    consults: IConsulta[],
    reviews: IReview[],
    turnosOcupados: string[],
    turnos: ITurno[],
    pagosInforme: IPagoComplete[],
    clientes: IUser[],
    allUsers: IUser[],
    userToChange: number | null,
    changeMenuLogin: (payload: boolean) => void,
    changeMenuRegister: (payload: boolean) => void,
    changeMenuConsult: (payload: boolean) => void,
    changeMenuReview: (payload: boolean) => void,
    changeMenuRol: (payload: boolean, user: number) => void,
    changeMenuResponse: (payload: boolean, consult_id: string) => void,
    changeMenuPayment: (payload: boolean, turn: ITurno) => void,
    getUserInfo: () => void,
    changeUserRol: (user: number, rol: number) => Promise<boolean>,
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
    getTurnosComplete: (id: number) => Promise<void>,
    makeTurno: (turno: ITurno, pagado: boolean) => Promise<ITurno>,
    alertStatus: (status: boolean, type: "success" | "info" | "warning" | "error", msg: string) => void,
    getIdConsult: (id: string) => void,
    makePayment: (pago: IPago) => Promise<boolean>,
    setTurn: (turn: ITurno) => void,
    getClientes: () => void,
    getPagos: () => void,
    completePagos: (clientes: IUser[], pagos: IPagoComplete[]) => IPagoComplete[]
    completeServicesProfessional: (usuarios: IUser[], turnos: ITurno[]) => IProfessionals[]
    getServicesByProfessional: (startDate: string, endDate: string) => Promise<IProfessionals[]>;
    
}
