export const handleDownload = (filePath) => {
    console.log("filename: "+ filePath.split("/").pop())
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    console.log(filePath.split("/"));
    console.log(filePath);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  