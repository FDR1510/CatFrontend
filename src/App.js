import React, { Component } from 'react';
import './App.css';
import Cats from './pages/Cats';
import NewCat from './pages/NewCat'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import {
  Grid,
  PageHeader,
  Row,
  Col
} from 'react-bootstrap'


class App extends Component {
  constructor(props){
      super(props)
      this.state = {
        apiUrl: "http://localhost:3001",
        cats: [],
        newCatSuccess: false,
        errors: null
      }
    }

    componentWillMount(){
  fetch(`${this.state.apiUrl}/cats`)
  .then((rawResponse) =>{
    return rawResponse.json()
  })
  .then((parsedResponse)=>{
    this.setState({cats: parsedResponse})
  })
}

    newCatSubmit(cat){
      fetch(`${this.state.apiUrl}/cats`,
      {
        body: JSON.stringify(cat),
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST"
      }
    )
    .then((rawResponse) => {
      // rawResponse.json()
      return Promise.all([rawResponse.status, rawResponse.json()])
    })
    .then((parsedResponse) =>{
      if(parsedResponse[0] === 422){
        this.setState({errors: parsedResponse[1]})
      }else{
        const cats = Object.assign([], this.state.cats)
        cats.push(parsedResponse[1])
        this.setState({
          cats: cats,
          errors: null,
          newCatSuccess: true
        })
      }
    })
  // console.log("This cat was submitted", cat)
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
             <NewCat onSubmit={this.newCatSubmit.bind(this)}
             errors={this.state.errors}
             />
             {this.state.newCatSuccess &&
               <Redirect to="/cats" />
             }
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
                     <Link
                       to='/'
                       id='cats-link'
                       onClick={()=>{this.setState({newCatSuccess: false})}}
                     >Add a Cat</Link>
                   </small>
                 </Col>
               </Row>
             </PageHeader>
             <Cats cats={this.state.cats} />
             {!this.state.newCatSuccess &&
              <Redirect to="/cats" />
            }
           </Grid>
         )} />
       </div>
     </Router>
    );
  }
}
export default App;
