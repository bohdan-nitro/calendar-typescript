import {EventActionEnum, setEventsAction, setGuestsAction} from "./types";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
    setGuests: (payload: IUser[]): setGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): setEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuest: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data))
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || "[]";
            //Поскольку у нас данные хранится в стркое нам нужно преобразовать это все в обьект
            const json = JSON.parse(events) as IEvent[];
            //Добавляем созданный ивент в массив
            json.push(event)
            //Обновляем созданные изменения через диспач
            dispatch(EventActionCreators.setEvents(json))
            //Также нам нужно добавить все в локал сторадж чтоб при обеовлении страницы у нас былки актуальные данные
            localStorage.setItem("events", JSON.stringify(json))
        } catch (e){

        }
    },
    fetchEvent: (username: string,) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || "[]";
            //Поскольку у нас данные хранится в стркое нам нужно преобразовать это все в обьект
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(el => el.author === username || el.guest === username)
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (e){
            console.log(e)
        }
    }
}