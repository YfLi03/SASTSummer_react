
import { Modal, Timeline } from "antd"
import { HistoryProps } from "../interface.js"
import { UserHistory } from "../api/history.js"

export const ModalHistory: React.FC<HistoryProps> = (props) => { 
    const getDate = (time: number) => {
        let date = new Date(time*1000)
        //console.log(time)
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        return year.toString()+"."+(month+1).toString()+'.'+day.toString()+" "+hour.toString()+":"+minute.toString()
    }
    const listItems = props.history.map(item => (
        <Timeline.Item key={item.time}>
            time {getDate(item.time)} <br/>
            score {item.score} <br/>
            subscore {item.subs[0]}, {item.subs[1]}, {item.subs[2]} 
        </Timeline.Item>
    ))
    return(
        <Modal title = {props.name} visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
            <Timeline>
                {listItems}
            </Timeline>
        </Modal>
    )
}