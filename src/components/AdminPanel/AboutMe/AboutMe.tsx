import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getAboutMe, updateAboutMe } from "@/lib/firebase/about";
import { type AboutMe } from "@/types/about";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AboutMe = () => {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState<AboutMe>({} as AboutMe);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAboutMe();
      if (data && data.length > 0) {
        setAbout(data[0]);
        form.reset({
          description: data[0].description || "",
        });
      }
    };
    fetchData();
  }, []);

  const formSchema = z.object({
    description: z
      .string()
      .min(100, "Description must be at least 100 characters."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: about ? about.description : "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      await updateAboutMe(about.id, formData);
      alert("Successfully updated 'about me'!");
    } catch (error) {
      alert("Error adding project. Check console for details.");
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col border border-white/30 rounded-lg bg-transparent text-white">
      <CardHeader className="p-5 border-b-[1px] border-white/30">
        <CardTitle className="text-xl font-bold">About me</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col"
        >
          <CardContent className="flex flex-1 p-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormControl className="flex-1">
                    <Textarea
                      {...field}
                      placeholder="Describe your self..."
                      className="resize-none h-full border-white/30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="w-full px-4 pb-4">
            <Button
              type="submit"
              variant="outline"
              className="w-full hover:text-white bg-transparent"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AboutMe;
