import { useState } from 'react';

export default function MergePdf() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFiles(Array.from(event.target.files))
    }
  };

  console.log("We are showing client side updated", pdfFiles)
  return (
    <div>
      <h1>Merge PDF</h1>
      <input type="file" multiple accept='application/pdf' onChange={handleFileChange} />
    </div>
  )
}