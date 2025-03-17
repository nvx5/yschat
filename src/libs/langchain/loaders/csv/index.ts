import { Document } from '@langchain/core/documents';

export const CsVLoader = async (fileBlob: Blob) => {
  const text = await fileBlob.text();
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  
  const documents = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const rowObj: Record<string, string> = {};
    
    for (let j = 0; j < headers.length; j++) {
      if (j < values.length) {
        rowObj[headers[j]] = values[j];
      }
    }
    
    // Create content from row data
    const content = Object.entries(rowObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    
    documents.push(
      new Document({
        pageContent: content,
        metadata: {
          source: 'csv',
          row: i
        }
      })
    );
  }
  
  return documents;
};
