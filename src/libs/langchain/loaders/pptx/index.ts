import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as pptxgen from 'pptx-parser';

import { loaderConfig } from '../config';

export const PptxLoader = async (fileBlob: Blob | string) => {
  let pptxContent: string = '';
  
  // Extract text from PPTX
  try {
    if (typeof fileBlob === 'string') {
      // For Node.js environments with file paths
      const fs = require('fs');
      const buffer = fs.readFileSync(fileBlob);
      const result = await pptxgen.parse(buffer);
      pptxContent = extractTextFromPPTXResult(result);
    } else {
      // For browser environments with Blobs
      const buffer = await fileBlob.arrayBuffer();
      const result = await pptxgen.parse(buffer);
      pptxContent = extractTextFromPPTXResult(result);
    }
  } catch (e) {
    console.error('Error extracting text from PPTX:', e);
    throw new Error('Failed to extract text from PPTX');
  }
  
  // Create a document
  const document = new Document({
    pageContent: pptxContent,
    metadata: {
      source: typeof fileBlob === 'string' ? fileBlob : 'blob',
      type: 'pptx'
    }
  });
  
  // Split the document
  const splitter = new RecursiveCharacterTextSplitter(loaderConfig);
  return await splitter.splitDocuments([document]);
};

// Helper function to extract text from the PPTX parsing result
function extractTextFromPPTXResult(result: any): string {
  let text = '';
  
  // This is a simplified example; you'll need to adapt this based on the actual structure
  // returned by your PPTX parser
  if (result && result.slides) {
    result.slides.forEach((slide: any, index: number) => {
      text += `Slide ${index + 1}:\n`;
      
      if (slide.title) {
        text += `Title: ${slide.title}\n`;
      }
      
      if (slide.content) {
        text += `Content: ${slide.content}\n`;
      }
      
      text += '\n';
    });
  }
  
  return text;
}
