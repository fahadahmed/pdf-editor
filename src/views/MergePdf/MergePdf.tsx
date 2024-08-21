import { PDFDocument } from 'pdf-lib';
import React, { useState } from 'react';
import pkg from 'file-saver';
import './mergepdf.css';

const { saveAs } = pkg;

export default function MergePdf() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFiles(Array.from(event.target.files))
    }
  };

  const mergePdfs = async () => {
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    console.log(mergedPdfBytes)
    saveAs(new Blob([mergedPdfBytes], { type: 'application/pdf' }), 'merged.pdf');
  }

  console.log("We are showing client side updated", pdfFiles)
  return (
    <div className="merge-pdf-container">
      <h1>Merge PDF</h1>
      <input type="file" multiple accept='application/pdf' onChange={handleFileChange} />
      <button onClick={mergePdfs} disabled={pdfFiles.length === 0}>Merge</button>
    </div>
  )
}