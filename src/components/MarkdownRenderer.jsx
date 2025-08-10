import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ html }) {
  //return <ReactMarkdown>{markdown}</ReactMarkdown>;
  //const sample = 'Curly quotes: “ ” — emoji: 😊';
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
