import React from 'react';


class Feed extends React.Component {

	constructor(){
		super()

	}
	render(){

		return(
					  
				<div className="ui fluid blue card">
					<div className="right floated author">
					      <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/jenny.jpg"/> Matt
					    </div>
					  <div className="content">
					  	<span className='left floated'> Hi this is mattt</span>
					  	<span className="left floated time description">2 days ago</span> 
					</div>
					</div>


			);
	}
}

export default Feed;