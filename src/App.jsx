import { useState } from 'react'
import './App.css'

const keyBtn = [
  {id: "clear", value: "AC"},
  {id: "delete", value: "DEL"},
  {id: "divide", value: "/"},
  {id: "multiply", value: "*"},
  {id: "seven", value: "7"},
  {id: "eight", value: "8"},
  {id: "nine", value: "9"},
  {id: "subtract", value: "-"},
  {id: "four", value: "4"},
  {id: "five", value: "5"},
  {id: "six", value: "6"},
  {id: "add", value: "+"},
  {id: "one", value: "1"},
  {id: "two", value: "2"},
  {id: "three", value: "3"},
  {id: "equals", value: "="},
  {id: "zero", value: "0"},
  {id: "decimal", value: "."}
]

const Button = ({keyInput}) => {
  return (
    <>
      {keyBtn.map((key) => {
      return  (<button key={key.value} id={key.id} onClick={() => keyInput(key.value)}>{key.value}</button>)
      })}
    </>
  )
}

function App() {

  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");



  const handleNumbers = (value) => {
    if (input === "0") {
      setInput(`${value}`);
      setOutput(`${value}`);
    } else if (input === "+" || input === "-" || input === "*" || input === "/") {
      setInput(`${value}`);
      setOutput(prev => `${prev}${value}`);
    } else if (output.includes("=")) {
      setInput(`${value}`);
      setOutput(`${value}`);
    } else {
      setInput(prev => input.length > 17 || input === "Error: Data Limit" ? `Error: Data Limit` : `${prev}${value}`);
      setOutput(prev => input === "Error: Data Limit" ? `${prev}` : `${prev}${value}`);
    }
  }

  const handleOperators = (value) => {
    if (input === "0") {
      setInput(`${value}`);
      setOutput(`${value}`);
    } else if (input === "0.") {
      setInput(`${value}`);
      setOutput(prev => `${prev.replace(/\.$/, value)}`);
    } else if (output.match(/\+-$/) || output.match(/--$/) || output.match(/\*-$/) || output.match(/\/-$/)) {
      setInput(`${value}`);
      setOutput(prev => `${prev.replace(/..$/, value)}`);
    } else if (input === "+" || input === "-" || input === "*" || input === "/") {
      setInput(`${value}`);
      setOutput(prev => `${prev.replace(/.$/, value)}`);
    } else if (output.includes("=")) {
      setInput(`${value}`);
      setOutput(prev => `${prev.replace(/^.*(=)/, '')}${value}`);
    } else {
      setInput(`${value}`);
      setOutput(prev => `${prev}${value}`);
    }
  }

  const handleNegative = (value) => {
    if (input === "0") {
      setInput(`${value}`);
      setOutput(`${value}`);
    } else if (input === "0.") {
      setInput(`${value}`);
      setOutput(prev => `${prev.replace(/\.$/, value)}`);
    } else if (output.match(/\+-$/) || output.match(/--$/) || output.match(/\*-$/) || output.match(/\/-$/)) {
      setInput(`${value}`);
      setOutput(prev => `${prev.replace(/..$/, value)}`);
    } else if (output.includes("=")) {
      setInput(`${value}`);
      setOutput(prev => `${prev.replace(/^.*(=)/, '')}${value}`);
    } else {
    setInput(`${value}`);
    setOutput(prev => `${prev}${value}`);
    }
  }

  const handleDecimal = (value) => {
    if (input === "0") {
      setInput(prev => `${prev}${value}`);
      setOutput(`${input}${value}`);
    } else if (input.includes(".")) {
      setInput(input);
      setOutput(prev => prev);
    } else if (input === "+" || input === "-" || input === "*" || input === "/") {
      setInput("0.");
      setOutput(prev => `${prev}0.`);
    } else {
      setInput(prev => `${prev}${value}`);
      setOutput(prev => `${prev}${value}`);
    }
  }

  const deleteData = () => {
    setInput(input.slice(0, -1));
    setOutput(prev => `${prev.slice(0, -1)}`);
   
  }

  const resetCalc = () => {
    setInput("0");
    setOutput("");
  }

  const evaluate = (value) => {
    const total = eval(`${output}`);
    setInput(`${total}`);
    setOutput(prev => `${prev}${value}${total}`);

  }

  const keyInput = (value) => {
    switch (value) {
      case "AC":
        resetCalc();
        break;
      case "DEL":
        deleteData();
        break;
      case "0":
        handleNumbers(value);
        break;
      case "9":
        handleNumbers(value);
        break;
      case "8":
        handleNumbers(value);
        break;
      case "7":
        handleNumbers(value);
        break;
      case "6":
        handleNumbers(value);
        break;
      case "5":
        handleNumbers(value);
        break;
      case "4":
        handleNumbers(value);
        break;
      case "3":
        handleNumbers(value);
        break;
      case "2":
        handleNumbers(value);
        break;
      case "1":
        handleNumbers(value);
        break;
      case "+":
        handleOperators(value);
        break;
      case "-":
        handleNegative(value);
        break;
      case "*":
        handleOperators(value);
        break;
      case "/":
        handleOperators(value);
        break;
      case ".":
        handleDecimal(value);
        break;
      case "=":
        evaluate(value);
        break;
        default:
        break;
    }
  }
 
  return (
    <>
      <div id="calculator">
        <div id="displayScreen">
          <div id="output">{`${output}`}</div>
          <div id="display">{`${input}`}</div>
        </div>
            <Button keyInput={keyInput} />
      </div>
    </>
  )
}

export default App
