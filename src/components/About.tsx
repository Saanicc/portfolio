import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "./ui/card";
import { getAboutMe } from "@/lib/firebase/about";
import { useEffect, useState } from "react";
import { AboutMe } from "@/types/about";

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
      <Card className="flex flex-col bg-black/20 border-white/20 h-full">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">About Me</h2>
        </CardHeader>
        <CardContent>
          <div className="text-gray-300 space-y-4">
            <Markdown>{about?.description}</Markdown>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default About;
