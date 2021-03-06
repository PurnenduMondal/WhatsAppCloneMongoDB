import { Avatar, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import "./Chat.css"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'

function Chat({messages}) {
    const [input, setInput] = useState('')

    const sendMessage = async e => { 
        e.preventDefault();

        await axios.post('/messages/new', {

            name: "Purnendu",
            message: input,
            timestamp: new Date(new Date().toUTCString() +(3600000*+5.5)).toLocaleString(),
            received: false

        })
        setInput('')
        window.location.reload(false);

    }

    return (
        <div className = "chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                      <h3>Room name</h3>
                      <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                  </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages.map( message => (
                <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp /*{ 
                        }*/}
                    </span>
                </p>
            ))}

            </div>
            <div className="chat__footer">
                <IconButton>
                <InsertEmoticonIcon/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <form>
                    <input 
                    type="text"
                    placeholder="Type a message"
                    value = {input}
                    onChange={e => setInput(e.target.value)}
                    />
                    <button 
                    type="submit"
                    onClick = {sendMessage}
                    >
                        <SendIcon/>
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}
export default Chat;
