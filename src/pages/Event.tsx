import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useAcrions";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {IEvent} from "../models/IEvent";



const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuest, createEvent, fetchEvent} = useActions();
    const {guests, events} = useTypeSelector(state => state.event);
    const {user} = useTypeSelector(state => state.auth)

    useEffect(() => {
        fetchGuest()
        fetchEvent(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        createEvent(event)
        setModalVisible(false)
    }
    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify={"center"}>
                <Button onClick={() => setModalVisible(true)}>Добавить событие</Button>
            </Row>
            <Modal
                title="Добавить событие"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm guests={guests} submit={addNewEvent}/>
            </Modal>
        </Layout>
    );
}

export default Event;
