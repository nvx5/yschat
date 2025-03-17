import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import mammoth from 'mammoth';

import { loaderConfig } from '../config';

export const DocxLoader = async (fileBlob: Blob | string) => {
  // If fileBlob is a string (file path), we need to handle it differently than a Blob
  let buffer: ArrayBuffer;
  
  if (typeof fileBlob === 'string') {
    // For Node.js environments with file paths
    try {
      const fs = require('fs');
      buffer = fs.readFileSync(fileBlob);
    } catch (e) {
      console.error('Error reading file:', e);
      throw new Error('Failed to read file');
    }
  } else {
    // For browser environments with Blobs
    buffer = await fileBlob.arrayBuffer();
  }
  
  // Use mammoth to extract text from DOCX
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  const text = result.value;
  
  // Create a document
  const document = new Document({
    pageContent: text,
    metadata: {
      source: typeof fileBlob === 'string' ? fileBlob : 'blob',
      type: 'docx'
    }
  });
  
  // Split the document
  const splitter = new RecursiveCharacterTextSplitter(loaderConfig);
  return await splitter.splitDocuments([document]);
};
