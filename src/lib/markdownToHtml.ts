import { remark } from "remark";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeMathjax from "rehype-mathjax";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

export default async function markdownToHtml(markdown: string) {
  try {
    const result = await remark()
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeMathjax, { tex: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] } })
      .use(rehypeHighlight, { ignoreMissing: true })
      .use(rehypeStringify)
      .process(markdown);
    
    console.log('Markdown processed successfully');
    return result.toString();
  } catch (error) {
    console.error('Error processing markdown:', error);
    // Fallback to basic processing without math
    const basicResult = await remark()
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown);
    return basicResult.toString();
  }
}
