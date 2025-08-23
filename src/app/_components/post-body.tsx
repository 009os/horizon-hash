import markdownStyles from "./markdown-styles.module.css";
import Link from "next/link";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {/* Read More Articles Section */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to read more?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore more insights and strategies in our Market Insights collection
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Browse All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
