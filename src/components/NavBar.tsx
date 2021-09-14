import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreator} from "../store/reducers/auth/action-creator";

const NavBar: FC = () => {
    const dispatch = useDispatch();
    const router = useHistory();
    const {isAuth} = useTypeSelector(state => state.auth)
    return (
        <Layout.Header>
            <Row justify={"end"}>
                {isAuth
                    ?
                    <>
                        <div style={{color: "#fff"}}>
                            Nitro
                        </div>
                        <Menu theme={"dark"} mode={"horizontal"} selectable={false}>
                            <Menu.Item
                                onClick={() => dispatch(AuthActionCreator.logout())}
                                key={1}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                    : <Menu theme={"dark"} mode={"horizontal"} selectable={false}>
                        <Menu.Item
                            onClick={() => router.push(RouteNames.LOGIN)}
                            key={1}
                        >
                            Логин
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
}

export default NavBar;
