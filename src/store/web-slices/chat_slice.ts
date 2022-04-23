import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {AnyAction} from 'redux';
import {SignalDispatch} from "redux-signalr";
import chatConnection from "../middlewares/chatMiddleware";
import {NICK_IN_STORAGE} from "../../components/enterWindow/Enter";

export const ROOM_ID_IN_STORAGE = "roomName";

const initialState = {
    messages: [],
    loading: 'idle',
} as MessagesListType

export const sendMessage = createAsyncThunk("sendMessage", async (text: string) => {
    await fetch('https://localhost:8080/chat/message', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: nanoid(5),
            name: sessionStorage.getItem(NICK_IN_STORAGE),
            text: text,
            status: "neutral",
            roomName: sessionStorage.getItem(ROOM_ID_IN_STORAGE),
        } as MessageTypePost)
    })
        .catch(console.log);
})

export const sendChangeMessage = createAsyncThunk("changeMessageStatus", async (msg: MessageType) => {
    await fetch('https://localhost:8080/chat/changeStatus', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...msg, roomName: sessionStorage.getItem(ROOM_ID_IN_STORAGE)} as MessageTypePost),
    })
        .catch(console.log);
})

export const joinToChatRoom = createAsyncThunk("joinToRoom", async (nameRoom: string) => {
    console.log(nameRoom)
    await fetch('https://localhost:8080/chat/joinRoom', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({roomName: nameRoom, connectionId: chatConnection.connectionId} as JointRoomType)
    })
        .catch(console.error);
});

export const getStoryMessage = createAsyncThunk("getStoryMessage", async () => {
    const response: Promise<string> = fetch('https://localhost:8080/chat/story', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Room-Id" : sessionStorage.getItem(ROOM_ID_IN_STORAGE) as string,
        }
    })
        .then((x) => x.json())
        .catch(console.error)
    return await response
})

export const chatSlice = createSlice({
    name: "chatSlice",
    initialState: initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        changeMessageStatus: (state, action) => {
            let index = state.messages.findIndex(msg => msg.id === action.payload.id);
            state.messages[index].status = action.payload.status;
        },
        clearChat: (state) => {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getStoryMessage.fulfilled, (state, action) => {
            const messages: Array<MessageType> = JSON.parse(action.payload)
            console.log('get story message', messages);
            messages.forEach(msg => state.messages.push(msg as MessageType))
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
        })
        builder.addCase(sendChangeMessage.fulfilled, (state, action) => {
        })
        builder.addCase(joinToChatRoom.fulfilled, (state, action) => {
        })
    }
})

export const chatSliceReducers = chatSlice.reducer;
export const {addMessage, changeMessageStatus, clearChat} = chatSlice.actions;

export type ChatDispatchSignal<Action extends AnyAction = AnyAction> = SignalDispatch<RootState, Action>;

export type MessagesListType = {
    messages: Array<MessageType>
    loading?: 'idle' | 'pending' | 'succeeded' | 'failed'
    connectionId?: string;
}

export type MessageType = {
    id: string,
    text: string,
    name: string,
    status: 'neutral' | 'positive' | 'negative' | 'right',
}

type MessageTypePost = {
    id: string,
    text: string,
    name: string,
    status: 'neutral' | 'positive' | 'negative' | 'right',
    roomName: string,
}