import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  const lines = content.split("\n");

  const processLine = (line: string, index: number): React.ReactNode => {
    if (line.startsWith("##")) {
      const level = line.match(/^#+/)?.[0].length || 2;
      const text = line.replace(/^#+\s*/, "");
      const processedText = processInlineMarkdown(text);

      if (level === 2) {
        return (
          <h2
            key={index}
            className="text-lg font-bold text-white mb-3 mt-4 first:mt-0"
          >
            {processedText}
          </h2>
        );
      } else if (level === 3) {
        return (
          <h3
            key={index}
            className="text-base font-semibold text-white mb-2 mt-3"
          >
            {processedText}
          </h3>
        );
      }
    }

    if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
      const text = line.trim().replace(/^[•-]\s*/, "");

      return (
        <li key={index} className="text-white/90 ml-4 mb-1 list-disc">
          {processInlineMarkdown(text)}
        </li>
      );
    }

    if (line.trim().match(/^\d+\.\s/)) {
      const text = line.trim().replace(/^\d+\.\s*/, "");

      return (
        <li key={index} className="text-white/90 ml-4 mb-1 list-decimal">
          {processInlineMarkdown(text)}
        </li>
      );
    }

    if (line.trim()) {
      return (
        <p key={index} className="text-white/90 mb-2">
          {processInlineMarkdown(line)}
        </p>
      );
    }

    return <div key={index} className="h-2" />;
  };

  const processInlineMarkdown = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    const boldRegex = /\*\*([^*]+)\*\*|__([^_]+)__/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const boldText = match[1] || match[2];

      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {boldText}
        </strong>,
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  lines.forEach((line, index) => {
    const processed = processLine(line, index);

    if (React.isValidElement(processed) && processed.type === "li") {
      const newListType = line.trim().match(/^\d+\.\s/) ? "ol" : "ul";

      if (listType && listType !== newListType) {
        if (currentList.length > 0) {
          elements.push(
            listType === "ul" ? (
              <ul key={`list-${elements.length}`} className="mb-3">
                {currentList}
              </ul>
            ) : (
              <ol key={`list-${elements.length}`} className="mb-3">
                {currentList}
              </ol>
            ),
          );
        }
        currentList = [processed];
        listType = newListType;
      } else {
        currentList.push(processed);
        listType = newListType;
      }
    } else {
      if (currentList.length > 0) {
        elements.push(
          listType === "ul" ? (
            <ul key={`list-${elements.length}`} className="mb-3">
              {currentList}
            </ul>
          ) : (
            <ol key={`list-${elements.length}`} className="mb-3">
              {currentList}
            </ol>
          ),
        );
        currentList = [];
        listType = null;
      }
      elements.push(processed);
    }
  });

  if (currentList.length > 0) {
    elements.push(
      listType === "ul" ? (
        <ul key={`list-${elements.length}`} className="mb-3">
          {currentList}
        </ul>
      ) : (
        <ol key={`list-${elements.length}`} className="mb-3">
          {currentList}
        </ol>
      ),
    );
  }

  return <div className={`${className}`}>{elements}</div>;
};

export default MarkdownRenderer;
