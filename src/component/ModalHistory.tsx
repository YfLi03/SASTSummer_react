import { Modal, Timeline } from "antd";
import { HistoryProps } from "../interface.js";
import { UserHistory } from "../api/history.js";

function getDate(time: number): string {
  let date = new Date(time * 1000);
  //console.log(time)
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  return (
    year.toString() +
    "." +
    (month + 1).toString() +
    "." +
    day.toString() +
    " " +
    hour.toString() +
    ":" +
    minute.toString()
  );
}

export const ModalHistory: React.FC<HistoryProps> = (props) => {
  const listItems = props.history.map((item) => (
    <Timeline.Item key={item.time}>
      time {getDate(item.time)} <br />
      score {item.score} <br />
      subscore {item.subs[0]}, {item.subs[1]}, {item.subs[2]}
    </Timeline.Item>
  ));
  return (
    <Modal
      title={props.name}
      visible={props.isModalVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <Timeline>{listItems}</Timeline>
    </Modal>
  );
};
