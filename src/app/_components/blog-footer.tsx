import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function BlogFooter() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Got a story to share? Write for Horizon Hash!
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="mailto:horizonhash009@gmail.com?subject=Article Submission for Horizon Hash&body=Hi,%0D%0A%0D%0AI would like to submit an article for publication on Horizon Hash.%0D%0A%0D%0AArticle Title:%0D%0A%0D%0AArticle Excerpt:%0D%0A%0D%0A%0D%0A---%0D%0A%0D%0A[Your small picture here] (optional)%0D%0A%0D%0A[Your real name]%0D%0A%0D%0APlease let me know if you need any additional information.%0D%0A%0D%0ABest regards"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Email Me
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default BlogFooter;
