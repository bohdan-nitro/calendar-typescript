import React, {FC, useState} from 'react';
import {Form, Input, Button} from "antd";
import {rules} from "../utils/rules";
import {useDispatch} from "react-redux";
import {AuthActionCreator} from "../store/reducers/auth/action-creator";
import {useTypeSelector} from "../hooks/useTypeSelector";


const LoginForm:FC = () => {
    const dispatch = useDispatch();
    const {isLoading, error} = useTypeSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const submit = () => {
        dispatch(AuthActionCreator.login(username, password))
    }
    return (
        <Form labelCol={{ span: 10 }}
              wrapperCol={{ span: 20 }}
              name="basic"
              onFinish={submit}
        >
            {error &&
            <div style={{color: "red"}}>
                {error}
            </div>
            }
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required("Пожалуйста введите имя")]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required("Пожалуйста введите пароль")]}
            >
                <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item style={{marginTop: 15}} wrapperCol={{ offset: 14, span: 20, }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
