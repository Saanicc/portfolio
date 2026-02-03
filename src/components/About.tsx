import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "./ui/card";
import { getAboutMe } from "@/lib/firebase/about";
import { useEffect, useState } from "react";
import { AboutMe } from "@/types/about";
import AnimationWrapper from "./AnimationWrapper";

const About = () => {
  const [about, setAbout] = useState<AboutMe>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAboutMe();
      setAbout(data[0]);
    };
    fetchData();
  }, []);

  return (
    <section id="about-info" className="w-full min-h-full">
      <AnimationWrapper
        transitionDuration={0.5}
        delay={0.25}
        viewportAmount={0.5}
      >
        <Card className="flex flex-col bg-black/30 border-white/20 h-full">
          <CardHeader className="p-4">
            <h2 className="text-2xl font-bold text-white">About Me</h2>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-gray-300 space-y-4">
              <Markdown>{about?.description}</Markdown>
            </div>
          </CardContent>
        </Card>
      </AnimationWrapper>
    </section>
  );
};

export default About;
