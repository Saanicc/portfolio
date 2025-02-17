const About = () => {
  return (
    <section
      id="about"
      className="w-full py-20 px-4 flex justify-center items-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">About Me</h2>
        <div className="text-gray-300 space-y-4">
          <p>
            Hello! I'm Mattias, a passionate developer focused on creating
            beautiful and functional web experiences. With a background in
            frontend development, I bring creativity and technical expertise to
            every project.
          </p>
          <p>
            When I'm not coding, you can find me playing video games or
            exploring new technologies when time allows. I believe in continuous
            learning and staying up-to-date with the latest technologies and
            industry trends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
