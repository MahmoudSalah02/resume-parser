import './App.css';
import Person from './Person.js'
import JSONDATA from './people.json'
import React, {useState, useEffect} from 'react'
import * as XLSX from "xlsx";
var stringSimilarity = require("string-similarity");

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    const items = localStorage.getItem('people-resumes')
    if (items){
      setItems(JSON.parse(items))
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('people-resumes', JSON.stringify(items))
  })

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        data.map((val, key) => {
          val.rating = 0
        })
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      const currentItems = items
      setItems([...currentItems, ...d]);
    });
  };

  return (
    <div className="App">
      <h1 className="name">ApplyAI</h1>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={event => {
          setSearchTerm(event.target.value)
        }}
      />
      {items.sort((a, b) => {
        a.rating = parseInt(stringSimilarity.compareTwoStrings(a.skills + " " + a.projects + " " + a.experience, searchTerm) * 100)
        b.rating = parseInt(stringSimilarity.compareTwoStrings(b.skills + " " + b.projects + " " + b.experience, searchTerm) * 100)
        return b.rating - a.rating
      }).map((val, key) => {
        return (
          <div className="user" key={key}>
            <Person {...val}/>
          </div>)
      })}
    </div>
  );
}

export default App;
