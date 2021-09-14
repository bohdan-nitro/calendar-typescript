import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../routes";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useAcrions";

const NavBar: FC = () => {
    const router = useHistory();
    const {logout} = useActions();
    const {isAuth, user} = useTypeSelector(state => state.auth)
    return (
        <Layout.Header>
            <Row justify={"end"}>
                {isAuth
                    ?
                    <>
                        <div style={{color: "#fff"}}>
                            {user.username}
                        </div>
                        <Menu theme={"dark"} mode={"horizontal"} selectable={false}>
                            <Menu.Item
                                onClick={logout}
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
