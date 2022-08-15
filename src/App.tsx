import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/lib/table";
import "antd/dist/antd.css";
import "./index.css";

import { ModalHistory } from "./component/ModalHistory";
import { getHistory, UserHistory } from "./api/history";
import { ModalSubmit } from "./component/ModalSubmit";
import { getLeaderBoard, LeaderBoardData } from "./api";
import { vote } from "./api";

const columns: ColumnsType<
  LeaderBoardData & {
    showModalHistory: (user: string) => void;
    setLeaderBoard: (data: LeaderBoardData[]) => void;
  }
> = [
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => {
      //console.log(avatar)
      if (avatar == undefined) return <></>;
      let text = "data:image/jpg;base64," + avatar;
      return (
        <div style={{ height: "50px" }}>
          <img src={text} style={{ height: "100%" }}></img>
        </div>
      );
    },
  },
  {
    title: "Username",
    dataIndex: "user",
    key: "user",
    width: 300,
    render: (user, record) => (
      <a
        onClick={() => {
          record.showModalHistory(user);
        }}
      >
        {user}
      </a>
    ),
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "Subscores",
    dataIndex: "subs",
    key: "subs",
    render: (subs) => (
      <p>
        {subs[0]},{subs[1]},{subs[2]}
      </p>
    ),
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (time) => {
      //console.log(time)
      let date = new Date(time * 1000);
      //console.log(date)
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      return (
        <p>
          {year}.{month + 1}.{day} {hour}:{minute}
        </p>
      );
    },
  },
  {
    title: "Votes",
    dataIndex: "votes",
    key: "votes",
    render: (votes, record) => {
      return (
        <div>
          {votes}
          <a
            onClick={() => {
              vote(record.user).then((data) => {
                console.log("Get the new data");
                record.setLeaderBoard(data);
              });
            }}
          >
            👍
          </a>
        </div>
      );
    },
  },
];

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userHistory, setUserHistory] = useState<UserHistory[]>();
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardData[]>();

  useEffect(() => {
    const task = setInterval(() => {
      console.log("here");
      getLeaderBoard().then((data) => setLeaderBoard(data));
    }, 1000);
    return () => clearInterval(task);
  }, []);

  const subs: [number, number, number] = [0, 0, 0];
  const defaultHistory = [
    {
      score: 0,
      subs: subs,
      time: 0,
    },
  ];

  const showModalHistory = (username: string) => {
    getHistory(username).then((data: UserHistory[]) => {
      setUserHistory(data);
      setIsModalVisible(true);
    });
  };

  const handleOK = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      <header className="title">SAST Leaderboard</header>
      <div className="board">
        <ModalHistory
          name="History"
          history={userHistory == undefined ? defaultHistory : userHistory}
          isModalVisible={isModalVisible}
          handleOk={handleOK}
          handleCancel={handleCancel}
        />
        <ModalSubmit setLeaderBoard={setLeaderBoard} />
        <Table
          columns={columns}
          dataSource={leaderBoard?.map((item) => ({
            ...item,
            showModalHistory,
            setLeaderBoard,
          }))}
        />
      </div>
    </React.Fragment>
  );
};

export default App;
