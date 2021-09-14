import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import "./App.css";
import {useActions} from "./hooks/useAcrions";
import {IUser} from "./models/IUser";


const App:FC = () => {
    const {setIsAuth, setUser} = useActions();
    //Для того чтобы при перезагруки страницы у нас не перекидывался на логин нам нужен useEffect
    // и передаем пустой массив зависимостей для того чтобы хук отработал один раз

    useEffect(() => {
        if (localStorage.getItem("auth")){
            setUser({username: localStorage.getItem("username" || "")} as IUser)
            setIsAuth(true)
        }
    }, [])
  return (
    <Layout>
        <NavBar/>
        <Content>
            <AppRouter/>
        </Content>
    </Layout>
  );
}

export default App;
