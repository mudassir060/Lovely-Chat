import React from 'react'
import { connect } from 'react-redux'
import { get_users } from '../../store/action'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../../config/firebase';
import img from '../images/search.png';

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: ""
        }

    }
    chat = (user) => {
        this.setState({
            chat_user: user
        })
        let current_user = this.props.create_user;
        let merge_uid = this.uid_merge(current_user.uid, user.uid);
        // let muds='Elegant Mano';
        // if (current_user.name==muds) {
        //     alert('My Dear fatima welcome on my chat app & i love u mari jan')
        // }
        //  console.log(current_user.name)
        // console.log(merge_uid)

        this.get_messages(merge_uid)
    }
    componentDidMount() {
        this.props.get_users()
    }
    uid_merge(uid1, uid2) {
        if (uid1 < uid2) {
            return uid1 + uid2
        } else {
            return uid2 + uid1
        }
    }
    sent_message = () => {
        let user = this.props.create_user;
        let chat_user = this.state.chat_user;
        let merge_uid = this.uid_merge(user.uid, chat_user.uid);

        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: user.name,
            uid: user.uid
        })

        // console.log(this.uid_merge(user.uid,chat_user.uid))

        // this.state.chats.push({
        //     message:this.state.message
        // })
        this.setState({
            // chats:this.state.chats,
            message: ""
        })
        console.log(this.state.message)
    }
    get_messages = (uid) => {
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added', (messages) => {
            // console.log('mess==>',messages.val())
            this.state.chats.push(messages.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            //Do stuff in here
            // alert('ok')
            this.sent_message()
        } 
    }
    render() {
        let user = this.props.create_user;

        console.log("firebase users==chat=>", this.props.chats)
        return (
            <div className="container chat-container" >

                <div style={{ display: "flex" }} >
                {/* <div style={{ display: "flex" }}  className="chat-container"> */}
                    <div  className={"conversation-list"}>
                        <div>
                            <div className="input-group" style={{width:'300px',margin:"6px"}}>
                                <input type="text" className="form-control" placeholder="Search or start new chat" />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary" onClick={() => this.chat(0)}  type="button">
                                        <img style={{width:'20px'}} src={img} alt=""/>                                    </button>
                                </div>
                            </div>
                            <h4 style={{textAlign:'center'}}>{user.name}</h4>
                            <center>
                            <img className="imgprofile" src={user.profile} alt="" />
                            <img className="imgprofile" src={user.profile} alt="" />
                            <img className="imgprofile" src={user.profile} alt="" />
                            <img className="imgprofile" src={user.profile} alt="" />
                            </center>
                            {/* <h6>{user.email}</h6> */}
                            {/* <h4 >Chat User</h4> */}
                        </div>

                        <div>
                            {this.props.users.map((v, i) => {
                                return v.uid !== user.uid && <li key={i} className="user">
                                    <img className="imgprofile" src={v.profile} alt="" width="24" />
                                    <b style={{maxWidth:"10px"}}>{v.name}</b>
                                    <span className="text-right">
                                    <button onClick={() => this.chat(v)} className="btn btn-success">
                                        Chat
                                        </button>
                                        </span>
                                </li>
                            })}
                        </div>
                    </div>
                    <div className="convesation">

                        {Object.keys(this.state.chat_user).length ?
                            <div>
                                <div className="convesation-bar">
                                    
                                    <img className="imgprofile" src={this.state.chat_user.profile} alt="" width="24" />
                                    <b style={{maxWidth:"10px"}}>{this.state.chat_user.name}</b>
                                </div>
                                <ul className="sms-list">
                                    {this.state.chats.map((v, i) => {
                                        // return<li style={{marginLeft:v.uid===user.uid?"20px":"-20px"}} key={i}>{v.message}</li>
                                        return <li className={v.uid === user.uid ? "UserSMS SMS" : "ChatSMS SMS"} key={i}>{v.message}</li>

                                    })}
                                </ul>
                                <div className="input-group mb-1 chat-input">
                                    <input type="text" className="sms-input"
                                        value={this.state.message}
                                        onChange={(e) => this.setState({ message: e.target.value })}
                                        placeholder="Enter your message"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        onKeyPress={this.enterPressed.bind(this)}
                                        />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary btn-lg"
                                            onClick={() => this.sent_message()}
                                            type="button">Sent</button>
                                    </div>
                                </div>
                            </div>

                            :
                            <h4 style={{ marginTop: '42%', marginBottom: "42%" }}>No user</h4>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    create_user: state.create_user,
    users: state.users
})
const mapDispatchToProp = (dispatch) => ({
    // set_data: ()=> console.log("Hello")
    get_users: () => dispatch(get_users())
    // facebook_login: (history)=>dispatch(facebook_login(history)) ,

})


export default connect(mapStateToProps, mapDispatchToProp)(Chat);
