import React, {useState} from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Logout from './Logout';
import axios from 'axios';
import Button from '@mui/material/Button';

function UploadCSV(props) {
    
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
  
    // process CSV data
    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length == headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] == '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] == '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
  
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
      
      // prepare columns list from headers
      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
  
      setData(list);
      setColumns(columns);
    }
  
    // handle file upload
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
        console.log(data);
        console.log('?');
        console.log(columns);
      };
      reader.readAsBinaryString(file);
    }

    const deleteAllCourses = () => axios.get("http://localhost:3001/courses/del-courses/",  { crossdomain: true }) ;
    const addMultipleCourses = () => axios.get("http://localhost:3001/courses/add-courses/",  { crossdomain: true }) ;
    const addCourse = () =>  axios.get("http://localhost:3001/courses/add-course/",  { crossdomain: true }) ;
    const addSlots = () =>  axios.get("http://localhost:3001/slots/add-slots/",  { crossdomain: true }) ;
    const assignCourses= () =>  axios.get("http://localhost:3001/slots/assign-courses/",  { crossdomain: true }) ;
    const delSlots = () =>  axios.get("http://localhost:3001/slots/del-slots/",  { crossdomain: true }) ;
    const delTutSlots = () =>  axios.get("http://localhost:3001/del-tut-slots/",  { crossdomain: true }) ;
    const addTutSlots = () =>  axios.get("http://localhost:3001/add-tut-slots/",  { crossdomain: true }) ;
    const assignTutSlots = () =>  axios.get("http://localhost:3001/assign-tut/",  { crossdomain: true }) ;
    const assignPracticalSlots = () =>  axios.get("http://localhost:3001/assign-prac/",  { crossdomain: true }) ;



  return (
    <div>
       <Button style={{padding: '6px 12px', border: '1px solid' , margin: '5px 5px',}} variant="contained" onClick={() => deleteAllCourses()}>
        Delete all courses
      </Button>
      
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => addMultipleCourses()}>
        Add Multiple courses
      </Button>
     
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => addCourse()}>
        Add course
      </Button>
      <br/>
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => addSlots()}>
        Add slots
      </Button>
      
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => assignCourses()}>
        Assign courses
      </Button>
     
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => delSlots()}>
        Delete slots
      </Button>

      <br/>
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => addTutSlots()}>
        Add Tut slots
      </Button>
      
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => assignTutSlots()}>
        Assign Tut 
      </Button>
     
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => delTutSlots()}>
        Delete Tut slots
      </Button>
      <br/>
      <Button style={{padding: '6px 12px', border: '1px solid', margin: '5px 5px',}} variant="contained" onClick={() => assignPracticalSlots()}>
        Assign Practical Slots 
      </Button>
      <br/>
    
      <h3>Upload Ground Rules from ACAD Section</h3>
      
    
      
      <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
    hidden
  />
</Button>
      
     
     

<div style={{paddingLeft:'90%', display:'inline-block', marginTop:'-5%'}}>
      <Logout />
      </div>
      
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
    </div>
  );
}



export default UploadCSV;