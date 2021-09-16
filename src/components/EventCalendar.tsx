import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formDate} from "../utils/date";

//Какие типы будем ожидать
interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender(value: Moment) {
        const formatedDate = formDate(value.toDate())
        const currentDayEvent = props.events.filter(ev => ev.date === formatedDate)
        return (
            <div>
                {currentDayEvent.map((ev, index) =>
                     <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    }
    return (
        <Calendar
        dateCellRender={dateCellRender}
        />
    );
}

export default EventCalendar;
