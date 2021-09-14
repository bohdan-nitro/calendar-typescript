import React, {FC} from 'react';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import "./App.css";


const App:FC = () => {
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
