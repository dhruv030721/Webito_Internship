const express = require('express');
const PDFDocument = require('pdfkit')
const fs = require('fs')

const app = express();

app.use(express.json());

function createTable(doc, data, headers) {
    const tableTop = 100;
    const rowHeight = 30;
    const colWidth = 150;
    let yPosition = tableTop;

    // Draw table headers
    headers.forEach((header, i) => {
        const textY = yPosition + (rowHeight / 2) - (doc.heightOfString(header) / 2);
        doc
            .fontSize(12)
            .text(header, i * colWidth + 50, textY, { width: colWidth, align: 'center' });
    });

    yPosition += rowHeight;

    // Draw table rows
    data.forEach((row) => {
        row.forEach((cell, i) => {
            const textY = yPosition + (rowHeight / 2) - (doc.heightOfString(cell) / 2);
            doc
                .fontSize(10)
                .text(cell, i * colWidth + 50, textY, { width: colWidth, align: 'center' });
        });
        yPosition += rowHeight;
    });

    // Draw table lines
    const tableBottom = yPosition;

    // Draw horizontal lines
    for (let i = 0; i <= data.length + 1; i++) {
        const lineY = tableTop + i * rowHeight;
        doc
            .moveTo(50, lineY)
            .lineTo(50 + headers.length * colWidth, lineY)
            .stroke();
    }

    // Draw vertical lines
    for (let i = 0; i <= headers.length; i++) {
        const lineX = 50 + i * colWidth;
        doc
            .moveTo(lineX, tableTop)
            .lineTo(lineX, tableBottom)
            .stroke();
    }
}




app.post('/generate-pdf', (req, res) => {
    const jsonData = req.body;

    // Create a PDF document
    const doc = new PDFDocument();

    // Set the response headers to indicate a PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');

    // Pipe the PDF document to the response
    doc.pipe(fs.createWriteStream('Sample.pdf'));

    // Add content to the PDF using JSON data
    // doc.fontSize(12).text(JSON.stringify(jsonData, null, 2), {
    //     width: 410,
    //     align: 'left'
    // });

    const headers = ['Column1', 'Column2', 'Column3'];
    const data = [
        ['Data1', 'Data2', 'Data3'],
        ['Data4', 'Data5', 'Data6']
    ];

    createTable(doc, data, headers);

    // Finalize the PDF and end the stream
    doc.end();

    res.status(200).json({
        success: true,
        message: "Pdf edited successfully!"
    })
});



app.listen(3000, () => {
    console.log("Server started successfully at 4000 PORT!")
})