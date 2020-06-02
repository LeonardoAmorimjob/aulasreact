import React, { Component } from "react";

import foto_leonardo from '../assets/foto_leonardo.jpg';
import TechItem from "./Techitem";
class TechList extends Component{
    state={
        newtech:'',
        techs:[],
    };
    componentDidMount(){
        const techs=localStorage.getItem('techs');
        if(techs){
            this.setState({techs:JSON.parse(techs)})
        }

    }
    componentDidUpdate(_,prevState){
        if (prevState.techs!==this.state.techs){
             localStorage.setItem('techs',JSON.stringify(this.state.techs));
        }
    }
    handleInputChange=e=>{
        this.setState({newtech:e.target.value})
        console.log(e.target.valu)
    }
    handleSubmit=e=>{
        e.preventDefault();
        this.setState({
            techs:[this.state.newtech,...this.state.techs],
            newtech:''
        })
        
    }
    handleDelete=(tech)=>{
       this.setState({
           techs: this.state.techs.filter(t=>t!== tech)
       })
       
    }
    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                < ul>
                    {this.state.techs.map(tech=><TechItem  onDelete={()=>this.handleDelete(tech)} key={tech}tech={tech}/>)} 
                                 
                </ul>
                <input type="text"onChange={this.handleInputChange}value={this.state.newtech}/>
                <button type="submit">Enviar</button>
                </form>
            </>
            
        )
    }
}
export default TechList;