import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cats from './pages/Cats';
import NewCat from './pages/NewCat'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {
  Grid,
  PageHeader,
  Row,
  Col,
  Alert
} from 'react-bootstrap'

class App extends Component {
  constructor(props){
      super(props)
      this.state = {
        cats: [
          {
            id: 1,
            name: 'Morris',
            age: 2,
            enjoys: "Long walks on the beach."
          },
          {
            id: 2,
            name: 'Paws',
            age: 4,
            enjoys: "Snuggling by the fire."
          },
          {
            id: 3,
            name: 'Mr. Meowsalot',
            age: 12,
            enjoys: "Being in charge."
          }
        ]
      }
    }
    newCatSubmit(cat){
  console.log("This cat was submitted", cat)
}
  render() {
    return (
      <Router>
       <div>
         <Route exact path="/" render={props => (
           <Grid>
             <PageHeader>
               <Row>
                 <Col xs={8}>
                   Cat Tinder
                   <br/>
                   <small className='subtitle'>Add a Cat</small>
                 </Col>
                 <Col xs={4}>
                 <br/>
                   <small>
                     <Link to='/cats' id='cats-link'>Show me the Cats</Link>
                   </small>
                 </Col>
               </Row>
             </PageHeader>
             <NewCat onSubmit={this.newCatSubmit.bind(this)}/>
           </Grid>
         )} />

         <Route exact path="/cats" render={props => (
           <Grid>
             <PageHeader>
               <Row>
                 <Col xs={8}>
                   Cat Tinder
                   <small className='subtitle'>All the Cats</small>
                 </Col>
                 <Col xs={4}>
                   <small>
                     <Link to='/' id='cats-link'>Add a Cat</Link>
                   </small>
                 </Col>
               </Row>
             </PageHeader>
             <Cats cats={this.state.cats} />
          </Grid>
         )} />
       </div>
     </Router>
    );
  }
}
export default App;
