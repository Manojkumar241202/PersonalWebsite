export const handleDownload = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

export const handleDownloadFromURL = (resumeURL) => {
    if (resumeURL) {
      const link = document.createElement('a');
      link.href = resumeURL;
      document.body.appendChild(link);
      link.download = 'Manojkumar_resume.pdf'; // Suggested file name
      link.click();
      document.body.removeChild(link);
    }
  };
  