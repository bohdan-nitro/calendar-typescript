import {AuthActionCreator} from "./auth/action-creator";
import {EventActionCreators} from "./event/action-creators";

export const allActionCreators = {
    ...AuthActionCreator,
    ...EventActionCreators
}