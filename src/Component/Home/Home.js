import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import randomstring from 'randomstring';

import './Home.css';
import coverphoto from '../../Assets/cover.jpg';

class Home extends Component{ 
  state={
    randNum : null
  }
  componentDidMount(){
     const num =randomstring.generate(5);
     this.setState({randNum : num});
  }

  render() {
    const pathDoc=`doc/${this.state.randNum}`;
    return (
       <div className="row myrow">
       		<div className="container m-auto p-3">
            <div className="row">
              <div className="col"><img src={coverphoto} className="img-fluid" alt="logo" /></div>
            </div>
       		  <div className="row mt-2">
       		    <div className="col-12 col-md-8">
       		      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic labore quis at expedita iusto numquam 
                exercitationem porro illum distinctio ratione ducimus enim quam, cum necessitatibus, voluptates ad 
                possimus, accusantium tempora? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus temporibus 
                minima facilis sequi nesciunt fugiat labore laboriosam quasi neque maxime, facere ipsam asperiores in 
                laborum numquam magnam qui, amet eum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci 
                maxime error qui deserunt ipsa omnis sequi animi doloremque ratione placeat, odio ea earum iste unde totam, 
                eaque suscipit perspiciatis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero excepturi quam 
                nostrum sit ea odit a, sequi possimus, soluta, rem accusantium deserunt sint dolorem autem velit! Necessitatibus 
                cum minus neque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur 
                adipisicing elit. Adipisci maxime error qui deserunt ipsa omnis sequi animi doloremque ratione placeat, odio ea earum iste unde totam, 
                eaque suscipit perspiciatis! 
       		    </div>
       		    <div className="col-12 col-md-4 text-center">
                <Link to={pathDoc}><button id="mybutton" >Create a Doc</button></Link>
       		    </div>
       		  </div>
       		</div>
       </div>
    );
  } 
}

export default Home;
