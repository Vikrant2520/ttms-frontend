import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Button from '@mui/material/Button';


const GenericPdfDownloader = ({rootElementId , downloadFileName}) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', 'mm', [297, 210]);
                pdf.addImage(imgData, 'JPEG', 10, 10, 280, 180);
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <Button style={{padding: '6px 12px', border: '1px solid' , margin: '5px 5px',}} variant="contained" onClick={downloadPdfDocument}>Download Pdf</Button>

}

export default GenericPdfDownloader;