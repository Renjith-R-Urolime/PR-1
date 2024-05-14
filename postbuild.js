const fs = require('fs');
const path = require('path');
const { Table } = require('console-table-printer');

const directoryPath = './dist/infithra';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory contents:', err);
    return;
  }

  // Filter files to keep only those with the .br extension
  const brFiles = files.filter((file) =>
    path.extname(file) === '.br'
  );

  // Filter files to keep only those with the .js extension
  const uncompressedFiles = files.filter((file) =>
    path.extname(file) !== '.br'
  );

  const p = new Table({
    columns: [
      { name: 'File', alignment: 'left' },
      { name: 'Original Size (KB)' },
      { name: 'Compressed Size (KB)' }
    ],
    sort: (a, b) => b['Compressed Size (KB)'] - a['Compressed Size (KB)']
  });

  let compressedSize = 0;
  let originalSize = 0;

  // Display files and their sizes in a table
  brFiles.forEach((brFile) => {
    const brFilePath = path.join(directoryPath, brFile);
    const brStats = fs.statSync(brFilePath);
    const brSize = (brStats.size / 1024).toFixed(2)
    compressedSize += brStats.size / 1024;
    const correspondingOriginalFile = brFile.slice(0, -3); // Remove .br extension
    let originalFileSize = '-';
    if (correspondingOriginalFile) {
      const originalFilePath = path.join(directoryPath, correspondingOriginalFile);
      const stats = fs.statSync(originalFilePath);
      originalFileSize = (stats.size / 1024).toFixed(2);
      originalSize += stats.size / 1024
    }

    p.addRow({ 'File': brFile, 'Original Size (KB)': originalFileSize, 'Compressed Size (KB)':  brSize });
  });

  p.printTable();

  // Delete Uncompressed files
  // uncompressedFiles.forEach((file) => {
  //   const filePath = path.join(directoryPath, file);
  //   fs.unlinkSync(filePath);
  // });

  // Compare total sizes
  console.log('Uncompressed File Size:', originalSize.toFixed(2), 'KB');
  console.log('Compressed File Size:', compressedSize.toFixed(2), 'KB');

  // Calculate percentage reduction
  const reductionPercentage = ((originalSize - compressedSize) / originalSize) * 100;

  // Compare total sizes
  console.log('Compression Rate:', reductionPercentage.toFixed(2) + '%');
});
