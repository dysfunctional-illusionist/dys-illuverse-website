import ReactMarkdown from 'react-markdown';
  //return <ReactMarkdown>{markdown}</ReactMarkdown>;

export default function TextRenderer({ html }) {
  //html = 'Curly quotes: “ ” — emoji: 😊';

  //console.log(html);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
