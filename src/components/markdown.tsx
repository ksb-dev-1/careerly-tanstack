import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h4: ({ ...props }) => <h4 className="font-bold" {...props} />,
        p: ({ ...props }) => (
          <p
            className="leading-relaxed text-gray-600 dark:text-muted-foreground"
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc list-outside" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal list-outside ml-4" {...props} />
        ),
        li: ({ ...props }) => (
          <li
            className="text-gray-600 dark:text-muted-foreground mb-1"
            {...props}
          />
        ),
        a: ({ ...props }) => (
          <a className="text-primary underline" target="_blank" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
