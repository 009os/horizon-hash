import markdownStyles from "./markdown-styles.module.css";
import Link from "next/link";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-4xl mx-auto journal-text">
      <div
        className={`${markdownStyles["markdown"]} journal-markdown`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
