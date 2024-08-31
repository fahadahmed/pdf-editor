import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { useDropzone } from "react-dropzone-esm";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import pkg from 'file-saver';

const { saveAs } = pkg;

export default function PDFUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles: any) => {
      setUploadedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }
  });

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedFiles = Array.from(uploadedFiles);
    const [reorderedFile] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, reorderedFile);

    setUploadedFiles(reorderedFiles);
  };

  const mergePdfs = async () => {
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of uploadedFiles) {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    console.log(mergedPdfBytes)
    saveAs(new Blob([mergedPdfBytes], { type: 'application/pdf' }), 'merged.pdf');
  }

  return (
    <>
      <div>PDF Uploader</div>
      <div {...getRootProps()} style={{ border: '2px dashed #aaa', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag and drop files here or click to browse.</p>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="uploadedFiles">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyleType: 'none', padding: 0 }}>
              {uploadedFiles.map((file, index) => (
                <Draggable key={file.name} draggableId={file.name} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        padding: '10px',
                        margin: '5px 0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: '#f9f9f9',
                      }}
                    >
                      {file.name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={mergePdfs} disabled={uploadedFiles.length === 0}>Merge files</button>
    </>
  );
}
