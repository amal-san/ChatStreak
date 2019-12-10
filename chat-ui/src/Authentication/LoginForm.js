import React from 'react';
import './Auth.css'
import * as Axios from './auth_utils';



class LoginForm extends React.Component {

	constructor(){
		super()
		this.state ={
			isSignup:false,
			isLoggedIn:false,

		}
	
	this.handleLogin = this.handleLogin.bind(this);
	this.handleSignup = this.handleSignup.bind(this);
	}
	componentDidMount() {
		Axios.tokenVerify('http://localhost:8000/api/token-verify/')

		this.setState(
		{
			isLoggedIn:true,
		})
		
	 	 
	}
	handleLogin() {
		let username = document.getElementById('username').value;
		let password = document.getElementById('pass').value;
		let url = 'http://localhost:8000/api/token-auth/';
		Axios.postLogin(username,password,url)
	}
	handleSignup() {

		this.setState(
		{
			isSignup:true
		})

	}

	render(){

 		let login =  !this.state.isSignup  && 
 		<div id='login' className="ui placeholder segment" style={{height:'60vh',width:'900px',margin:'0 auto'}}>
				  <div className="ui two column very relaxed stackable grid">
				    <div className="column">
				      <div className="ui form">
				        <div className="field">
				          <label>Username</label>
				          <div className="ui left icon input">
				            <input id="username" type="text" placeholder="Username"/>
				            <i className="user icon"></i>
				          </div>
				        </div>
				        <div className="field">
				          <label>Password</label>
				          <div className="ui left icon input">
				            <input id="pass" type="password"/>
				            <i className="lock icon"></i>
				          </div>
				        </div>
				        <div className="ui blue submit button" onClick={this.handleLogin}>Login</div>
				      </div>
				    </div>
				    <div className="middle aligned column">
				      <div className="ui big button" onClick={this.handleSignup}>
				        <i className="signup icon"></i>
				        Sign Up
				      </div>
				    </div>
				  </div>
				  <div id='divider' className="ui vertical divider">
				    Or
				  </div>
				</div> 
		  let signup = this.state.isSignup  &&
		  <div id='signup' className='ui segment' style={{width:'900px',margin:'0 auto'}}>
		   <h2 style={{textAlign:'center'}}> Signup </h2>                      
		   <form className="ui form" style={{padding:'2rem'}}>
		   <div className='two fields'>
			<div className="field">
			  <label>First Name</label>
				<input type="text" name="first-name" placeholder="First Name"/>
				 </div>
			  <div className="field">
			   <label>Last Name</label>
				<input type="text" name="last-name" placeholder="Last Name"/>
				 </div>
				</div>
			  <div className='two fields'>
			    <div className="field">
			   <label>Email</label>
				  <input type="email" name="email" placeholder="Email"/>
			   </div>
			   <div className="field">
			   <label>Username</label>
				  <input type="text" name="username" placeholder="username"/>
			   </div>
			  </div>
			 <div className='two fields'>
			   <div className="field">
			   <label>Password</label>
				  <input type="password" name="password" placeholder="password"/>
			   </div>
			   <div className="field">
			   <label>Confirm Password</label>
				  <input type="password" name="conf-password" placeholder="conf-password"/>
			   </div>
			  </div>
				  <div className="field">
				  <div className="ui checkbox">
				 <input type="checkbox" tabIndex="0"/>
		        <label>I agree to the Terms and Conditions</label>
		       </div>
			 </div>
		   <button className="ui button" type="submit">Submit</button>
         </form>
        </div>  
		 return(

			<div className='ui container'>
			     
			     {login}
			     {signup}
  				
		     </div>


			);
	}
}

export default LoginForm;