export interface IUser {
    nombre: string,
    apellido: string,
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


    getUserInfo: () => IUser
};
