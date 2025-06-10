"use client";

import { useState } from "react";
import { addSkill, updateSkill } from "@/lib/firebase/skills";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skill } from "@/types/skill";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  icon: z.string().min(2, "Icon must be at least 2 characters."),
  ranking: z.number(),
});
export const UpdateSkill = ({
  defaultData,
  closeModal,
}: {
  defaultData?: Skill;
  closeModal: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultData ? defaultData.name : "",
      icon: defaultData ? defaultData.icon : "",
      ranking: defaultData ? defaultData.ranking : 0,
    },
  });

  const onSubmit = async () => {
    const formData = form.getValues();

    setLoading(true);

    try {
      if (!defaultData) await addSkill(formData);
      else await updateSkill(defaultData.id, formData);

      form.reset();
      closeModal();

      alert("Skill added successfully!");
    } catch (error) {
      alert("Error updating project. Check console for details.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const rankingLabels = [
    "Learning",
    "Familiar",
    "Comfortable",
    "Proficient",
    "Experienced",
  ];

  return (
    <Card className="relative w-1/3 h-auto overflow-auto bg-black mt-10 mb-10 border border-white/20">
      <CardHeader>
        <h2 className="text-2xl font-bold text-white">
          {defaultData ? "Update skill" : "Add new skill"}
        </h2>
      </CardHeader>
      <CardContent className="text-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-white">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      className="border-white/30"
                      placeholder="Skill name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Icon</FormLabel>
                  <FormControl>
                    <Input
                      className="border-white/30"
                      placeholder="Icon name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ranking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="ranking" className="text-white">
                    Skill ranking
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        {...field}
                        id="ranking"
                        className="border-white/30"
                        placeholder="Project GitHub URL"
                        disabled
                        value={rankingLabels[field.value]}
                      />
                      <div className="pt-4 pb-2">
                        <Slider
                          id="ranking"
                          defaultValue={[defaultData ? defaultData.ranking : 0]}
                          max={4}
                          step={1}
                          onChange={(e) => {
                            form.setValue(
                              "ranking",
                              Number((e.target as HTMLInputElement).value)
                            );
                            form.trigger("ranking");
                          }}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              disabled={loading}
            >
              {loading && !defaultData
                ? "Adding..."
                : loading && defaultData
                ? "Updating..."
                : defaultData
                ? "Update skill"
                : "Add skill"}
            </Button>
            <Button
              type="button"
              className="w-full"
              disabled={loading}
              onClick={closeModal}
            >
              Close
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
