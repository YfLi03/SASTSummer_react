import { UserHistory } from "./api/history"
import { LeaderBoardData } from "./api"


export interface HistoryProps{
    name: string
    isModalVisible: boolean
    history: UserHistory[]
    handleOk: () => void
    handleCancel: () => void
}

export interface SubmitProps{
    setLeaderBoard: (data:LeaderBoardData[]) => void
}