import React,{ Component } from 'react';
import {random} from 'lodash';
import Button from './component/Button.js';
import 'typeface-roboto';
import './App.css';
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {Grid ,withStyles}from "@material-ui/core/";
import IconButton from '@material-ui/core/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter} from "@fortawesome/free-brands-svg-icons";

const styles = {
  container:{
    alignItems:'center',
    display:'flex',
    height:'100vh'
  }
}

class App extends  Component{

  constructor(props){
    super(props);
    this.state={
      quotes:[],
      quotesIndex : null
    }
    this.RandomQuotesIndex=this.RandomQuotesIndex.bind(this)
    this.newQuoteIndex=this.newQuoteIndex.bind(this)
  }

  componentDidMount() {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
        .then((data)=>data.json())
        .then(quotes=>this.setState({quotes},()=>{
          this.setState({quotesIndex : this.RandomQuotesIndex()})
        }));

  }

  newQuoteIndex(){
    this.setState({quotesIndex : this.RandomQuotesIndex()});
  }

  ClickHandler(){
    console.log('HELLO WORLD')
  }

  RandomQuotesIndex(){
    if (!this.state.quotes.length){
      return;
    }
    return random(0,this.state.quotes.length-1);
  }

  render() {

    const map = this.state.quotes[this.state.quotesIndex];
    let quote;
    let author
    if (map !== undefined || null){
       quote=map.quote;
       author=map.author;
    }
      /*const result = Object.keys(map).map((key) => map[key]);
      console.log(result[0]);*/
    return(
        <div className="App" id="quote-box" >
          <Grid className={this.props.classes.container} justify='center' container>
            <Grid item xs={11} lg={8} >
          <Card>
            <CardContent id="text">
          {
            <Typography id="author">{quote}-{author}</Typography>
          }
            </CardContent>
            <CardActions>
          <Button newQuote={this.newQuoteIndex} text='Next Quotes' />

          <IconButton id="tweet-quote" target="_blank" href={encodeURI(`https://twitter.com/intent/tweet?text=${quote}`)}>
            <FontAwesomeIcon icon={faTwitter} size="md"></FontAwesomeIcon>
          </IconButton>
            </CardActions>
          </Card>
            </Grid>
          </Grid>
        </div>
  );

  }
}

export default withStyles(styles)(App);
