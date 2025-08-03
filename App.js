import React, { useState,useEffect } from 'react';
import './App.css';
// import { ethers } from 'ethers';
import Calculator from "./artifacts/contracts/Calculator.sol/Calculator.json"
import { Contract } from 'ethers';
const abi = Calculator.abi;
const contractAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ethers = require("ethers")


const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [provider, setProvider] = useState(null);
  const [contract,setContract] = useState(null);
  const [signCaputer,setSigncaputre] = useState([]);


  useEffect(()=>{
   const loadProvider = async ()=>{
    let contractAddress = contractAdd;
    const url = "http://127.0.0.1:8545/";
    const provider = new ethers.JsonRpcProvider(url);
    const contract = new ethers.Contract(contractAddress,abi,provider);
    setProvider(provider);
    setContract(contract);
    }
   loadProvider()
  },[]);
  let a =0;
  let b =0;
   const handleClick = (value) => {
        if(value.match(/[^A-Za-z0-9]/)){
          setSigncaputre([...signCaputer,value]);
        }
        setInput((prev) => prev + value);
      
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setSigncaputre([]);
  };

  const handleCalculate =async () => {
    try {
      //authore is kingkai
      const sendInput = input.split(/[^A-Za-z0-9]/);
      if (sendInput.length >= 1){
        a = Number(sendInput[0]);
        b = Number(sendInput[1]);
        console.log(signCaputer[0]);  
        if(signCaputer[0] == "+"){
          const res = await contract.add(a,b);
          console.log(res)
          setResult(res.toString());
        }
        if(signCaputer[0] == "/"){
          const res = await contract.divide(a,b);
          console.log(res)
          setResult(res.toString());
        }
        if(signCaputer[0] == "-"){
          const res = await contract.subtract(a,b);
          console.log(res)
          setResult(res.toString());
        }
        if(signCaputer[0] == "*"){
          const res = await contract.multiply(a,b);
          console.log(res)
          setResult(res.toString());
        }
      }
      
      // const evalResult = eval(input);
      // setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator">
      {/* <h1>Simple Calculator</h1>
      <button onClick={()=>handleConnect()}>
        connect
      </button> */}
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>

        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>

        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>

        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
    </div>
  );
};

export default App;
