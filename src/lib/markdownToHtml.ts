/**
 * Markdown to HTML converter
 */

import { remark } from "remark";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeMathjax from "rehype-mathjax";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import { logger } from '@/core/utils/logger';

export default async function markdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeMathjax, { tex: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] } })
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(markdown);
    
    return result.toString();
  } catch (error) {
    logger.error('Error processing markdown, using fallback', error);
    const basicResult = await remark()
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown);
    return basicResult.toString();
  }
}
