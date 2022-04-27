import React,{useState, useEffect} from 'react'; 
import { Route, useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PdfDownloader from './PdfDownloader'

function createData(time, monday, tuesday, wednsday, thursday, friday) {
    return {time, monday, tuesday, wednsday, thursday, friday };
  }

//   const courses = [
//     {
//         code :  "EEN-301",
//         title: "Power Electronics",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "SGC",
//         year: 3,
//         slotAssigned: "C2",
//         __v: 0,
//      },
//      {
//         code :  "EEN-302",
//         title: "Graph Theory",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "AK",
//         year: 3,
//         slotAssigned: "D2",
//         __v: 0,
//      },
//      {
//         code :  "EEN-306",
//         title: "Micro-Processors",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "PA",
//         year: 3,
//         slotAssigned: "E2",
//         __v: 0,
//      },
//      {
//         code :  "EEN-308",
//         title: "Machines",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "J",
//         year: 3,
//         slotAssigned: "F2",
//         __v: 0,
//      },
//     {
//         code :  "EEN-305",
//         title: "Advanced Control Systems",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "VP",
//         year: 3,
//         slotAssigned: "A2",
//         __v: 0,
//      },
//     {
//         code : "EEN-205",
//         title: "Control Systems",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "GP",
//         year: 2,
//         slotAssigned: "A1",
//         __v: 0,
//      },
//      {
//         code : "EEN-101",
//         title: "Power systems",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "BD",
//         year: 1,
//         slotAssigned: "A2",
//         __v: 0,
//      },
//      {
//         code :  "EEN-102",
//         title: "Intro to Electrical",
//         cat: "DCC",
//         credits: 4,
//         L: 3,
//         T: 1,
//         P: 2,
//         numberOfStudents: 165,
//         teacher: "PA",
//         year: 3,
//         slotAssigned: "B2",
//         __v: 0,
//      },

  
  
  const rows = [
    createData('8:00 - 8:55 AM', 'X1', 'H1', 'X2', 'H2', 'X3' ),
    createData('9:00 - 9:55 AM', 'G2', 'P3/T3', 'G*', 'P9/T9', 'P13/T13'),
    createData('10:00 - 10:55 AM', 'C/E/F', 'P4/T4', 'X5', 'P10/T10', 'P14/T14'),
    createData('11:00 - 11:55 AM', 'P1/T1', 'P5/T5', 'P7/T7', 'P11/T11', 'P15/T15'),
    createData('12:00 - 12:55 PM', 'P2/T2', 'P6/T6', 'P8/T8', 'P12/T12', 'P16/T16'),
    createData('1:00 - 1:55 PM', 'L', 'U', 'N', 'C', 'H'),
    createData('2:00 - 2:55 PM', 'A2', 'A2', 'F2', 'A2', 'F2'),
    createData('3:00 - 3:55 PM', 'C2', 'F2', 'C2', 'B2', 'C2'),
    createData('4:00 - 4:55 PM', 'D2', 'B2', '', 'D2', 'B2'),
    createData('5:00 - 5:55 PM', 'E2', 'E2', '', 'E2', 'D2'),
    createData('6:00 - 6:55 PM', 'Y1', 'Y2', '', 'Y3', ''),
  ];

   


function Timetable() {

    const [courses,setCourses]=useState() 
    const [tutSlots, setTutSlots]= useState()
    const [tutloaded,settutLoaded]= useState(false);
    const [tutload, settutload]=useState(false)
    const [loaded,setLoaded]= useState(false);
    const [load, setload]=useState(false)

    useEffect(()=>{ 
    var request = new XMLHttpRequest(); 
    request.onreadystatechange = function() { 
    if (request.readyState === 4 && request.status === 200) { 
    const response=JSON.parse(request.response) 
    setCourses(response) 
    setLoaded(true);
    } 
    }; 
    request.open('GET', 'http://localhost:3001/courses/get-courses', { crossdomain: true }); 
    request.send(); 
    },[]) 
    
    useEffect(()=>{ 
        var request = new XMLHttpRequest(); 
        request.onreadystatechange = function() { 
        if (request.readyState === 4 && request.status === 200) { 
        const response=JSON.parse(request.response) 
        setTutSlots(response) 
        settutLoaded(true);
        } 
        }; 
        request.open('GET', 'http://localhost:3001/slots/get-tut-slots', { crossdomain: true }); 
        request.send(); 
        },[]) 

    useEffect(()=>{ 
    
    if(loaded && tutloaded)
    {
    console.log(courses) 
    console.log(tutSlots)
    for(let i=0; i<courses.length; i++)
    {
     if(courses[i].year === 3)  
     {
       { rows.map((row) => {

        if(courses[i].slotAssigned === row.monday)
        {
            row.monday = <> <div>{courses[i].title} </div>  <div>  {courses[i].teacher} </div>  </>
        }
        if(courses[i].slotAssigned === row.tuesday)
        {
            row.tuesday = <> <div>{courses[i].title} </div>  <div>  {courses[i].teacher} </div>  </>
        }
        if(courses[i].slotAssigned === row.wednsday)
        {
            row.wednsday =<> <div>{courses[i].title} </div>  <div>  {courses[i].teacher} </div>  </>
        }
        if(courses[i].slotAssigned === row.thursday)
        {
            row.thursday = <> <div>{courses[i].title} </div>  <div>  {courses[i].teacher} </div>  </>
        }
        if(courses[i].slotAssigned === row.friday)
        {
            row.friday = <> <div>{courses[i].title} </div>  <div>  {courses[i].teacher} </div>  </>
        }
       })}
    }
    }
        for(let i=0; i<tutSlots.length; i++)
        {
            if(tutSlots[i].year === 3)
            {
                rows.map((row) => {
                    if(tutSlots[i].num == row.monday[1] && row.monday[0]== 'P')
                    {
                        row.monday =tutSlots[i].coursesAssigned.map((course) => {
                            return(
                            <><div>{course.code} P{course.subBatch} {course.tutPrac}</div></>
                            )
                        }) 
                    }
                    if(tutSlots[i].num == row.tuesday[1] && row.tuesday[0]== 'P')
                    {
                        row.tuesday =tutSlots[i].coursesAssigned.map((course) => {
                            return(
                            <><div>{course.code} P{course.subBatch} {course.tutPrac}</div></>
                            )
                        }) 
                    }
                    if(tutSlots[i].num == row.wednsday[1] && row.wednsday[0]== 'P')
                    {
                        row.wednsday =tutSlots[i].coursesAssigned.map((course) => {
                            return(
                            <><div>{course.code} P{course.subBatch} {course.tutPrac}</div></>
                            )
                        }) 
                    }
                    if(tutSlots[i].num == row.thursday[1] && row.thursday[0]== 'P')
                    {
                        row.thursday =tutSlots[i].coursesAssigned.map((course) => {
                            return(
                            <><div>{course.code} P{course.subBatch} {course.tutPrac}</div></>
                            )
                        }) 
                    }
                    if(tutSlots[i].num == row.friday[1] && row.friday[0]== 'P')
                    {
                        row.friday =tutSlots[i].coursesAssigned.map((course) => {
                            return(
                            <><div>{course.code} P{course.subBatch} {course.tutPrac}</div></>
                            )
                        }) 
                    }
                })
            }
        }

    setload(true)
    settutload(true)
}
    },[loaded, tutloaded]) 






    return (
        <>
        <PdfDownloader 
          downloadFileName="TimeTable" 
          rootElementId="table" 
        />
        <div style={{fontSize: '25px', width: '100%', textAlign: 'center', paddingBottom: '1%'}}>Time Table</div>
        
        <div id="table">
            {loaded && courses!== null && load && tutSlots!== null && tutloaded && tutload ? ( <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{backgroundColor: 'grey'}}>
              <TableCell  align='center' sx={{ border: 1, width: 150}} style={{fontWeight: 'bold'}} >Time/Day</TableCell>
                <TableCell align='center' sx={{ border: 1, width: 250}} style={{fontWeight: 'bold'}}>Monday</TableCell>
                <TableCell align='center' sx={{ border: 1, width: 250}} style={{fontWeight: 'bold'}}>Tuesday</TableCell>
                <TableCell align='center' sx={{ border: 1, width: 250}} style={{fontWeight: 'bold'}}>Wednesday</TableCell>
                <TableCell align='center' sx={{ border: 1, width: 250}} style={{fontWeight: 'bold'}}>Thursday</TableCell>
                <TableCell align='center' sx={{ border: 1, width: 250}} style={{fontWeight: 'bold'}}>Friday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={ { border: 1 } }
                >
                    <TableCell align='center' sx={{ border: 1}} >
                    {row.time}
                  </TableCell>
                  <TableCell align='center' sx={{ border: 1}}>{row.monday}</TableCell>
                  <TableCell align='center' sx={{ border: 1}}>{row.tuesday}</TableCell>
                  <TableCell align='center' sx={{ border: 1}} >{row.wednsday}</TableCell>
                  <TableCell align='center' sx={{ border: 1}}>{row.thursday}</TableCell>
                  <TableCell align='center' sx={{ border: 1}}>{row.friday}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>) : ''}
       
        </div>
        </>
      );
}

export default Timetable;