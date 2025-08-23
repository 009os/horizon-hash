import Link from "next/link";

const Header = () => {
  return (
    <div className="mb-8 mt-4 flex items-center">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Market Insights Blog
      </Link>
    </div>
  );
};

export default Header;
