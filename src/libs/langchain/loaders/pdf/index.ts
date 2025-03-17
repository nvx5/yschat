import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as pdfjs from 'pdfjs-dist';

import { loaderConfig } from '../config';

export const PdfLoader = async (fileBlob: Blob) => {
  let pdf;
  
  // For browser environments with Blobs
  const arrayBuffer = await fileBlob.arrayBuffer();
  
  // Load the PDF using PDF.js
  pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  
  // Extract text from each page
  const numPages = pdf.numPages;
  let fullText = '';
  
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    
    fullText += pageText + '\n\n';
  }
  
  // Create a document
  const document = new Document({
    pageContent: fullText,
    metadata: {
      source: 'blob',
      type: 'pdf',
      pages: numPages
    }
  });
  
  // Split the document
  const splitter = new RecursiveCharacterTextSplitter(loaderConfig);
  return await splitter.splitDocuments([document]);
};
