import React from 'react'
import { connect } from 'react-redux'
import { get_users } from '../../store/action'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../../config/firebase';
import img from '../images/search.png';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: null,
            file: null
        }

    }
    chat = (user) => {
        this.setState({
            chat_user: user
        })
        let current_user = this.props.create_user;
        let merge_uid = this.uid_merge(current_user.uid, user.uid);
        
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
        // var ref= firebase.storage().ref().child(`images/${this.state.file.name}`).put(this.state.file)

        // ref.on('state_changed', function(snapshot){
        //     // // Observe state change events such as progress, pause, and resume
        //     // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //     // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     // console.log('Upload is ' + progress + '% done');
        //     // switch (snapshot.state) {
        //     //   case firebase.storage.TaskState.PAUSED: // or 'paused'
        //     //     console.log('Upload is paused');
        //     //     break;
        //     //   case firebase.storage.TaskState.RUNNING: // or 'running'
        //     //     console.log('Upload is running');
        //     //     break;
        //     // }
        //   }, function(error) {
        //     // Handle unsuccessful uploads
        //   }, function() {
        //     // Handle successful uploads on complete
        //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //     ref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //       console.log('File available at', downloadURL);
        //     });
        //   });

        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: user.name,
            uid: user.uid,

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
        if (code === 13) { //13 is the enter keycode
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
                    <div className={"conversation-arya"}>
                        <div>
                            <div className="input-group" style={{ width: '300px', margin: "6px" }}>
                                <input type="text" className="form-control" placeholder="Search or start new chat" />
                                <div className="input-group-append">
                                    <button className="btn  btn-secondary" onClick={() => this.chat(0)} type="button">
                                        <img style={{ width: '20px' }} src={img} alt="" />                                    </button>
                                </div>
                            </div>
                            <h4 style={{ textAlign: 'center' }}>{user.name}</h4>
                            <center>
                                <img className="imgprofile" src={user.profile} alt="" />
                                <img className="imgprofile" src={user.profile} alt="" />
                                <img className="imgprofile" src={user.profile} alt="" />
                                <img className="imgprofile" src={user.profile} alt="" />
                            </center>
                            {/* <h6>{user.email}</h6> */}
                            {/* <h4 >Chat User</h4> */}
                        </div>

                        <div  className={"conversation-list"}>
                            {this.props.users.map((v, i) => {
                                return v.uid !== user.uid && <li key={i} className="user ">
                                    <div class="row pointer"  onClick={() => this.chat(v)}>
                                        <div>
                                            <img className="imgprofile"style={{marginLeft:"17px"}} src={v.profile} alt="" width="24" />
                                        </div>
                                        <div className="contant-p"> <b>{v.name}</b> </div>
                                        <span className="text-right">
                                            {/* <button onClick={() => this.chat(v)} className="btn btn-outline-success">
                                                Chat
                                        </button> */}
                                        </span>

                                    </div>

                                </li>
                            })}
                        </div>
                    </div>
                    <div className="convesation">

                        {Object.keys(this.state.chat_user).length ?
                            <div>
                                <div className="convesation-bar">

                                    <img className="imgprofile" src={this.state.chat_user.profile} alt="" width="24" />
                                    <b style={{ maxWidth: "10px" }}>{this.state.chat_user.name}</b>
                                </div>
                                <ul className="sms-list ">
                                    {this.state.chats.map((v, i) => {
                                        // return<li style={{marginLeft:v.uid===user.uid?"20px":"-20px"}} key={i}>{v.message}</li>
                                        return <li className={v.uid === user.uid ? "UserSMS SMS" : "ChatSMS SMS"} key={i}>{v.message}</li>
                                        // {let counter=counter + v}
                                    })}
                                </ul>
                                <div className="input-group mb-1 chat-input">
                                    {/* <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] })} /> */}
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
                            <div>
                                 {/* <h4 style={{ marginTop: '42%', marginBottom: "42%" }}>No user</h4> */}
                            <button style={{ marginTop: '40%', marginBottom: "40%" }} class="btn btn-outline-success" 
                            onClick={() => this.chat(0)}>
                                <i class="fa fa-trash"></i>
                                Show All User
                                </button>

                            </div>
                           
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
