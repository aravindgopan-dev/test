// src/utils/pdfGenerator.js

import jsPDF from 'jspdf';

// Function to generate PDF
export const generatePdf = (data) => {
  const doc = new jsPDF();
  const pages = [];

  data.forEach((item, index) => {
    const page = doc.addPage();
    page.setFont('helvetica', 'bold'); // Set font style to bold
    page.setFontSize(10);
    page.text(`Page ${item.pno}`, 10, 10);

    const captionWidth = 120;
    const captionLines = doc.splitTextToSize(item.caption, captionWidth);
    page.setFont('helvetica', 'normal');
    page.setFontSize(18);
    let y = 30;
    captionLines.forEach((line) => {
      page.text(line, 10, y);
      y += 10;
    });

    page.addImage(item.imgUrl, 'JPEG', 30, y + 20, 150, 120);
    pages.push(page);
  });

  doc.save('story.pdf');
};
