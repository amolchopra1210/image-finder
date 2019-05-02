import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiURL: 'https://pixabay.com/api',
        apiKey: process.env.REACT_APP_IMAGE_API,
        images: [],
    }
    onTextChange = (e) => {
        const val = e.target.value;
        this.setState({
            [e.target.name]:val
        },()=>{
            if(val === ''){
                this.setState({images: []})
            }
            else{
                axios.get(`${this.state.apiURL}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`).then(res => this.setState({images: res.data.hits})).catch(err => console.log(err))      
            }
        })
    }

    onAmountChange = (e,index,value) => {
        const val = e.target.value;
        if(val) {
            this.setState({amount: value},()=>{
                axios.get(`${this.state.apiURL}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`).then(res => this.setState({images: res.data.hits})).catch(err => console.log(err))      
            })
        } 
    }   

    render() {
        let placeholderText = <div style = {{textAlign:"center"}}>Your images will appear here</div>
        return (
        <React.Fragment>
           <TextField name = "searchText" value = {this.state.searchText} onChange = {this.onTextChange}
           floatingLabelText = "Search for images" fullWidth = {true}/>
           <br/>
           <SelectField name = "amount" floatingLabelText = "Amount" value = {this.state.amount} onChange = {this.onAmountChange}>
                <MenuItem value = {5} primaryText = "5"/>
                <MenuItem value = {10} primaryText = "10"/>
                <MenuItem value = {15} primaryText = "15"/>
                <MenuItem value = {30} primaryText = "30"/>
                <MenuItem value = {50} primaryText = "50"/>
           </SelectField>
           <br/>
           {this.state.images.length ? <ImageResults images = {this.state.images}/>: placeholderText }
        </React.Fragment>
        )
    }
}
export default Search;
