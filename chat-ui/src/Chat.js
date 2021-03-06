import React from 'react';
import './style.css';
import ChatScreen from './Components/Chat-screen'
import IndividualChat from './Components/Indivdual-chat';
import Search from './Components/Search';
import Recent from './Components/Recent';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as Axios from './utils/Axios';
import cogoToast from 'cogo-toast';



class Chat extends React.Component {
	 constructor(){
	 	super()
	 
	 this.state = {

	 	feeds : [],
    	person: [],
    	recent:[],
    	indValue:'',
    	
	  }

	  this.handleClick =this.handleClick.bind(this);
	  this.getMessage = this.getMessage.bind(this);
	  this.logout= this.logout.bind(this);
	  this.handleTime=this.handleTime.bind(this);
	  this.handleChat= this.handleChat.bind(this);
	  this.handleSearch=this.handleSearch.bind(this);
 }

 	getMessage(){
	    Axios.getUser(`http://localhost:8000/api/chat/`+ this.state.person.id)
	      .then(res => {
	        const person = res.data;
	        this.setState({ person })})
		  .catch((error) => {
		        console.log(error);
		        return false
		   });
	}
	handleTime() {
	 	Axios.getRecent('http://localhost:8000/api/recent/' + this.state.person.id)
		  .then(res => {
	        const recent = res.data.recentMessages_ReceivedAndSend;
	        this.setState({ recent });

	  		})
		  .catch((error) => {
		  	console.log(error)
		  })
		this.getMessage();
		this.handleChat(this.state.indValue);
		
    }
	componentDidMount() {
	  // this.mounted = true;
	  // this.timerID = setInterval(
   //    () => this.handleTime(),
   //    1000);
	  var self = this;
	  Axios.homeTokenVerify(`http://localhost:8000/api/token-verify/`)
	    .then(function(response) {
		  Axios.getUser(`http://localhost:8000/api/chat/`+ response)
	      .then(res => { 
	      	console.log(res)
	        const person = res.data;
	        console.log(person)
	        this.setState({ person });
	  	      })
			}.bind(this))
		  .catch((error) => {
		       console.log(error);
		   })
		.catch((error) =>{
			 console.log(error)
		  })
	    }

	// componentWillUnmount() {
	// 	this.mounted = false;
 //    	clearInterval(this.timerID);
 //  	  }


	handleClick(value){
	    let message = document.getElementById('message').value
	    if (message){
		  	Axios.postMessage(message,this.state.person.id,value,'http://localhost:8000/api/message_send/')
		  	this.getMessage();
		  	document.getElementById('message').value = '';
		    console.log(this.state.person)
	    }
		
	 }
	 logout() {
		Axios.logOut();
		
	 }

	 handleChat(value) {
	 	this.setState({ indValue:value })
	 	var self = this;
	 	const url = 'http://localhost:8000/api/messages/' + value
	 	Axios.getFeed(url)
	 	.then(function(res){
	 	  const feeds =res.data
	 	  console.log(feeds)
	      self.setState({feeds})
	 	})
	 	.catch((error) => {
	 		console.log(error)
	 	})
	 }

	 handleSearch() {

		document.getElementById('search').style.display = 'block';
		document.getElementById('search').style.opacity = 1;
		document.getElementById('search-results').style.display = 'block';


	 }
	 
	


	render(){

		let username = this.state.person.username ? this.state.person.username : null;

		return ( 
			<>
			<div className="ui internally grid">
			  <div className="row" style={{paddingTop:'0',paddingBottom:'0'}}>
			    <div id='side-bar-left' className="three wide column" style={{paddingLeft:'0',paddingRight:'0'}}>
			    <div id='side-left' className='ui segment' style={{height:'100vh',borderRadius:'0',background:'transparent',paddingTop:'5px',paddingBottom:'5px'}}>
			     <div className="card center" style={{textAlign:'center',marginBottom:'1rem'}}>
				    <div className="ui centered small circular image">
				      <img src="https://semantic-ui.com/images/avatar2/large/kristy.png"/>
				    </div>
				    <div className="content">
				      <div className="header"><h2>{username}<a className="ui blue empty circular label"></a></h2></div>
				      <div className="meta">
				        <a>Coworker &nbsp;</a><i className="edit icon" style={{fontSize:'1rem',color:'black'}} onClick={this.logout} ></i>
				      </div>
				      <div className="description">
				        Elyse is a copywriter working in New York.
				      </div>
				    </div>
				    <div className="extra content">
				      <span className="right floated">
				        Joined in 2014
				      </span><br></br>
				      <span>
				        <i className="user icon"></i>
				        151 Friends
				      </span>
				    </div>
				 </div>
				<div style={{background:'white'}}>
				  <div className="ui one item item menu" style={{marginBottom:'0'}}>
				   <div className="active item" style={{justifyContent:'space-around'}} onClick={this.handleSearch}>
				   <i className="users icon" style={{fontSize:'1.5rem',color:'black'}}></i><Search searchSelect={this.handleChat}/></div>
				  </div>
				     <Recent chat={this.state.person} feedHandler={this.handleChat} />
				  </div>
			      </div>
			     </div>
			     <div id='main-chat' className="ten wide column" style={{paddingLeft:'0',paddingRight:'0'}}>
			       <ChatScreen feed={this.state.feeds} clickHandler={this.handleClick}/>
			     </div>
			      <div id='side-right' className="three wide column"  style={{paddingLeft:'0',paddingRight:'0'}}>
			         <div  className='ui segment' style={{height:'100vh',borderRadius:'0',background:'transparent'}}>				     
			       </div>
			     </div>
			   </div>
			 </div>
			</>

			);
	}
}

export default Chat;
