import { Card, CardContent, CardHeader } from "./ui/card";

const About = () => {
  return (
    <section id="about-info" className="w-full min-h-full">
      <Card className="flex flex-col bg-black/20 border-white/20 h-full">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">About Me</h2>
        </CardHeader>
        <CardContent>
          <div className="text-gray-300 space-y-4">
            <p>
              I&apos;m a passionate developer focused on creating beautiful and
              functional web experiences. With a background in frontend
              development, I bring creativity and technical expertise to every
              project.
            </p>
            <p>
              When I&apos;m not coding, you can find me playing video games or
              exploring new technologies when time allows. I believe in
              continuous learning and staying up-to-date with the latest
              technologies and industry trends.
            </p>
            <p>
              For my next professional chapter, I&apos;m seeking a role where I can channel my passion for building 
              intuitive, user-centered interfaces into meaningful products that make a difference. 
              I thrive in collaborative environments where user experience is prioritized, 
              and I can contribute to projects that challenge me to continuously refine my craft. 
              My ideal position would combine creative problem-solving with technical innovation, 
              allowing me to create digital experiences that users not only use, but truly love.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default About;
