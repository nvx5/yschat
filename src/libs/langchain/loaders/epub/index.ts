import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as epub from 'epub-parser';

import { loaderConfig } from '../config';

export const EpubLoader = async (fileBlob: Blob | string) => {
  let epubContent: string;
  
  if (typeof fileBlob === 'string') {
    // For Node.js environments with file paths
    try {
      const fs = require('fs');
      const content = fs.readFileSync(fileBlob);
      const result = await epub.parse(content);
      epubContent = result.content || '';
    } catch (e) {
      console.error('Error reading EPUB file:', e);
      throw new Error('Failed to read EPUB file');
    }
  } else {
    // For browser environments with Blobs
    try {
      const buffer = await fileBlob.arrayBuffer();
      const result = await epub.parse(buffer);
      epubContent = result.content || '';
    } catch (e) {
      console.error('Error reading EPUB blob:', e);
      throw new Error('Failed to read EPUB blob');
    }
  }
  
  // Create a document
  const document = new Document({
    pageContent: epubContent,
    metadata: {
      source: typeof fileBlob === 'string' ? fileBlob : 'blob',
      type: 'epub'
    }
  });
  
  // Split the document
  const splitter = new RecursiveCharacterTextSplitter(loaderConfig);
  return await splitter.splitDocuments([document]);
};
