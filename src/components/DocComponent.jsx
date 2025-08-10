const MyDocComponent = ({ htmlContent }) => {
  //console.log('React got htmlContent type:', typeof htmlContent);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MyDocComponent;