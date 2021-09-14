import {AuthAction, AuthActionEnum, AuthState} from "./types";
import {IUser} from "../../../models/IUser";

//Обязательно указываем тип стейта тот который мы описывали в типах
const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    error: "",
    user: {} as IUser
}
//Указываем стейт и обобщающий тип также редюсер должен возвращать состояние и в качестве состояние указываем стейт
export default function authReducer (state = initialState, action: AuthAction): AuthState{
    switch (action.type){
        //Получаем состояние и изменяем ауз который получаем из action
        case AuthActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}
        case AuthActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case AuthActionEnum.SET_USER:
            return {...state, user:action.payload}

        default:
            return state;
    }
}