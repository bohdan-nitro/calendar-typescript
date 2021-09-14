import {IUser} from "../../../models/IUser";
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import axios from "axios";

export const AuthActionCreator = {
    setUSer: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean) : SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload:auth}),
    setIsLoading: (payload: boolean) : SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setIsError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username: string, password:string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreator.setIsLoading(true));
            setTimeout(async () => {
                //берем данные из нашего бекенда в данном случае и файла локально
                const response = await axios.get<IUser[]>("./user.json")

                console.log(response.data)
                //Сравниваем поля которые мы получили с теми которые былли введены в поля инпутов
                const mockUser = response.data.find(user => user.username === username &&  user.password === password)
                //Если же у нас есть юзер тогда мы закидываем в тор авторизацию юзера которого ввели а также диспачим состояние и добавляем юзера в стор
                if (mockUser){
                    localStorage.setItem("auth", "true");
                    localStorage.setItem("username", mockUser.username);
                    dispatch(AuthActionCreator.setIsAuth(true));
                    dispatch(AuthActionCreator.setUSer(mockUser));
                } else {
                    dispatch(AuthActionCreator.setIsError("Пользователь ввел некоректный пароль или логин"))
                }
                //После всех манипуляций ставим загрузку в фолс
                dispatch(AuthActionCreator.setIsLoading(false));
            }, 1000)

        } catch (e) {
            dispatch(AuthActionCreator.setIsError("Произошла ошибка"))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
            localStorage.removeItem("auth")
            localStorage.removeItem("username")
            dispatch(AuthActionCreator.setUSer({} as IUser))
            dispatch(AuthActionCreator.setIsAuth(false))
    }
}