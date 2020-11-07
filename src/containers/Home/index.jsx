import React from 'react';
import './style.css';
import{connect} from 'react-redux';
import{set_data ,facebook_login } from '../../store/action';

// import { render } from '@testing-library/react';
// import { Component } from 'react';
// import Child from './components/child';
// import{connect} from 'react-redux';
// import reducer from './store/reducer/reducer';
class Home extends React.Component {
  static getDriveStateFromProps(props,state){
    console.log("props==0=>",props)
    return{

    }
  }
  render(){
    // let users = {name:"mudassir",email:"mudassirmukhtar4@gmail.com"}
    // console.log("props===>",this.props.users)
    return (
      <div id="boad">
          {/* <button onClick={()=>this.props.set_data(users)}>set data</button> */}
      


          <div className="container-fluid">
        <h1 className="display-1  glow">WELCOME TO LOVELY CHAT</h1>
    </div>
    <div className="container">
        <a type="button" className=" b0tn btn-lg" onClick={()=>this.props.facebook_login(this.props.history)} >Continue with facebook</a>
    </div>
        <div className="container">
        <a type="button" className=" b0tn btn-lg " disabled><del> Continue with email</del></a>
    </div>
    <div className="container">
        <a type="button" className=" b0tn btn-lg " disabled><del>Continue with google</del></a>
    </div>
    <div className="container">
        <a type="button" className=" b0tn btn-lg mb-3"  disabled><del>Continue with phone</del></a>
    </div>

      </div>
    );
  } 
}


const mapStateToProps=(state)=>({
  users:state.users,
})
const mapDispatchToProp=(dispatch)=>({
  // set_data: ()=> console.logo("Hello")
  // set_data: ()=>dispatch(set_data()) ,
  facebook_login: (history)=>dispatch(facebook_login(history)) ,
})


export default connect(mapStateToProps,mapDispatchToProp) (Home);
  