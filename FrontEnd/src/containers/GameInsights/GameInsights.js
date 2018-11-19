import React, { Component } from 'react';
class GameInsights extends Component {
    constructor(props){
        super(props); 
        this.state =  {
            queryShare: "",
            queryFound: false,
            result: null,
            showTransactions: false,
            transactions:[]
        }
        this.handleChange = this.handleChange.bind(this); 
        this.submitData = this.submitData.bind(this); 
        this.transB = this.transB.bind(this); 
        this.handleTransactions = this.handleTransactions.bind(this); 
    }
    handleChange(event){
        let st = this.state; 
        st.queryShare = event.target.value; 
        this.setState(st); 
    }
    submitData(event){
        event.preventDefault()
        let st = this.state
        let data = {companyid: st.queryShare}; 
        fetch('http://localhost:3005/largestShare/'+st.queryShare).then(res =>{
            return res.json();
        }).then(myt=>{
            st.queryFound = true;
            st.result = myt.traderid; 
            this.setState(st);  
            console.log(myt)
        })
    }
    transB(){
        let st = this.state;
        if(st.showTransactions){
            st.showTransactions= false;
            st.transactions = [];
            this.setState(st); 
        }else{
            st.showTransactions=true; 
            fetch('http://localhost:3005/transaction').then(res =>{
                return res.json();
            }).then(myt=>{
                myt.forEach(element => {
                    let t = {}; 
                    t.id = element.transactionid;
                    t.traderid = element.traderid;
                    t.comp = element.companyid; 
                    t.shares = element.sharespurchased; 
                    st.transactions.push(t); 
                });
                this.setState(st); 
            })
        }
    }
    handleTransactions(param){
        console.log(
            param
        )
        
        let st = this.state; 
        if(param)
        {let val = (
            <table>
                <tr>
                    <th>Transaction Id</th>
                    <th>Trader Id</th>
                    <th>Company</th>
                    <th>Shares</th>
                </tr>
                <tbody>
                {st.transactions.map((el,index)=>{
                    return(
                        <tr>
                        <td>{el.id}</td>
                        <td>{el.traderid}</td>
                        <td>{el.comp}</td>
                        <td>{el.shares}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
        console.log(val); 
        return val; }else{
            return (null); 
        }

    }
    render(){
        return (<div>
            <form onSubmit={this.submitData}>
        <input onChange={this.handleChange} value={this.state.queryShare}></input>
        <input type="submit" value="Submit"></input></form>
        {this.state.queryFound ? this.state.result : <div>TypeheretoFindThePerson with the higest shraes of company X </div>}
        <button onClick = {this.transB}>Click Here to See All Transactions</button>
        {this.handleTransactions(this.state.showTransactions)}
        </div>)
    }
}
export default GameInsights; 