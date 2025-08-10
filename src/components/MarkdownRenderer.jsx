import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ markdown }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}
