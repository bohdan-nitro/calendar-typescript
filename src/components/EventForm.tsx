import React, {FC, useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formDate} from "../utils/date";
import {useTypeSelector} from "../hooks/useTypeSelector";


interface EventFormProps{
    guests: IUser[];
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        description: "",
        date: "",
        author: "",
        guest: ""
    } as IEvent)
    const {user} = useTypeSelector(state => state.auth)
    const SelectDate = (date: Moment | null) => {
        if (date){
           setEvent({...event, date: formDate(date.toDate())})
        }

    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }
    return(
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required("Обязательное поле")]}
            >
                <Input
                    value={event.description}
                    onChange={(e) => setEvent({...event, description: e.target.value})} />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required("Обязательное поле"), rules.isDateAfter("Нельзя создать дану на текущую дату")]}
            >
                <DatePicker onChange={SelectDate}
                />
            </Form.Item>
            <Form.Item label={"Выберите гостя"} name={"guest"} rules={[rules.required("Обязательное поле")]}>
                <Select onChange={(guest:string) => setEvent({...event, guest})}>
                    {props.guests.map(item => {
                        return <Select.Option key={item.username} value={item.username}>
                            {item.username}
                        </Select.Option>
                    })}
                </Select>
            </Form.Item>
            <Row justify={"end"}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}
export default EventForm;