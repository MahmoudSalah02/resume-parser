import './App.css';
import JSONDATA from './people.json'
import {useState} from 'react'
import * as XLSX from "xlsx";

function App() {

  const [searchTerm, setSearchTerm] = useState('')

  const [items, setItems] = useState([]);

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

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table class="table container">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.Item}>
              <th>{d.first_name}</th>
              <td>{d.last_name}</td>
              <td>{d.experience}</td>
              <td>{d.education}</td>
              <td>{d.projects}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <input 
        type="text" 
        placeholder="Search..." 
        onChange={event => {
          setSearchTerm(event.target.value)
        }}
      />
      {JSONDATA.filter((val) => {
        if (searchTerm == "") {
          return val
        } else if (val.first_name.toLowerCase().includes(searchTerm.toLowerCase())){
          return val
        }
      }).map((val, key) => {
        return (
          <div className="user" key={key}>
            <p>{val.first_name}</p>
          </div>)
      })}
    </div>
  );
}

export default App;
