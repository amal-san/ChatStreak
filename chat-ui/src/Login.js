import React from 'react';
import axios from 'axios';


class Login extends React.Component {

	constructor() {
		super()
	}
	render(){

		return(
			<div className='ui container' style={{marginLeft:'0'}}>
				<div className="ui placeholder segment" style={{height:'60vh'}}>
				  <div className="ui two column centered stackable grid">
				    <div className="column">
				      <div className="ui form">
				        <div className="field">
				          <label>Username</label>
				          <div className="ui left icon input">
				            <input type="text" placeholder="Username"/>
				            <i className="user icon"></i>
				          </div>
				        </div>
				        <div className="field">
				          <label>Password</label>
				          <div className="ui left icon input">
				            <input type="password"/>
				            <i className="lock icon"></i>
				          </div>
				        </div>
				        <div className="ui blue submit button">Login</div>
				      </div>
				    </div>
				    <div className="middle aligned column">
				      <div className="ui big button">
				        <i className="signup icon"></i>
				        Sign Up
				      </div>
				    </div>
				  </div>
				  <div className="ui vertical divider">
				    Or
				  </div>
				</div>
			 </div>
			);
	}
}

export default Login;