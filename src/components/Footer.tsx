const Footer = () => {
  return (
    <footer
      id="footer"
      className="p-4 left-0 right-0 z-50 bg-white/5 border-t border-white/10"
    >
      <div className="flex justify-center space-x-4 mb-4">
        <a
          href="https://www.linkedin.com/in/mattias-ahlstr%C3%B6m-10b180180/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-white/70 hover:text-white transition-colors devicon-linkedin-plain"
          aria-label="LinkedIn"
        />
        <a
          href="https://github.com/Saanicc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-white/70 hover:text-white transition-colors devicon-github-plain"
          aria-label="GitHub"
        />
      </div>
      <p className="text-center text-white/50 text-sm">
        &copy; {new Date().getFullYear()} Mattias Ahlström. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
