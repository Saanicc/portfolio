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
              I’m a frontend developer who loves crafting clean, functional, and
              visually appealing web experiences. With a strong focus on design
              and usability, I enjoy turning ideas into interactive, seamless
              interfaces.
            </p>
            <p>
              When I’m not coding, you’re most likely to find me at the gym, at
              home gaming or diving into new technologies whenever I get the
              chance. I’m always looking to learn and stay on top of the latest
              trends in web development.
            </p>
            <p>
              I’m currently looking for a role where I can build intuitive,
              user-friendly products that have a real impact. I thrive in
              collaborative environments that prioritize great user experiences,
              and I’m always eager to take on new challenges that push me to
              grow both creatively and technically.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default About;
