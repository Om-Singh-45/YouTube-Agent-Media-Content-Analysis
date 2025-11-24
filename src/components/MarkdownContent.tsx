import { memo } from "react";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent = memo(({ content, className = "" }: MarkdownContentProps) => {
  if (!content) return null;

  // Clean up the content
  const cleanContent = content
    .trim()
    // Remove excessive special characters
    .replace(/^\*+|\*+$/g, '')
    .replace(/^#+\s*\*+|\*+$/gm, '');

  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let listType: 'bullet' | 'number' | null = null;

    const flushList = () => {
      if (listItems.length > 0) {
        if (listType === 'bullet') {
          elements.push(
            <ul key={`list-${elements.length}`} className="space-y-2 my-4 ml-4">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-muted-foreground leading-relaxed flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0">•</span>
                  <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                </li>
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`list-${elements.length}`} className="space-y-2 my-4 ml-4 list-decimal">
              {listItems.map((item, idx) => (
                <li key={idx} className="text-muted-foreground leading-relaxed ml-4" dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              ))}
            </ol>
          );
        }
        listItems = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Empty line
      if (!trimmedLine) {
        flushList();
        return;
      }

      // Heading (##)
      if (trimmedLine.startsWith('##')) {
        flushList();
        const text = trimmedLine.replace(/^##\s*/, '');
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold text-foreground mt-6 mb-3">
            {text}
          </h3>
        );
        return;
      }

      // Bullet point (- or *)
      if (/^[-*]\s/.test(trimmedLine)) {
        if (listType !== 'bullet') {
          flushList();
          listType = 'bullet';
        }
        listItems.push(trimmedLine.replace(/^[-*]\s/, ''));
        return;
      }

      // Numbered list
      if (/^\d+\.\s/.test(trimmedLine)) {
        if (listType !== 'number') {
          flushList();
          listType = 'number';
        }
        listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
        return;
      }

      // Regular paragraph
      flushList();
      if (trimmedLine) {
        elements.push(
          <p
            key={`p-${index}`}
            className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmedLine) }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  // Format inline markdown (bold, italic)
  const formatInline = (text: string): string => {
    return text
      // Bold (**text** or __text__)
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/__([^_]+)__/g, '<strong class="font-semibold text-foreground">$1</strong>')
      // Italic (*text* or _text_)
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      .replace(/_([^_]+)_/g, '<em class="italic">$1</em>')
      // Code (`code`)
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-sm">$1</code>');
  };

  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      {parseMarkdown(cleanContent)}
    </div>
  );
});

MarkdownContent.displayName = 'MarkdownContent';

export default MarkdownContent;
