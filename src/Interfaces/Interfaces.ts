export interface IUser {
    nombre: string,
    apellido: string,
    rol: number, //0 --> visitante | 1 --> usuario | 2 --> staff 
    mail: string
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
    Mlogin: boolean,

    changeMenuLogin: (payload: boolean) => void,
    getUserInfo: () => IUser,
};
