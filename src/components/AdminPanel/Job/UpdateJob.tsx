"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Job } from "@/types/jobs";
import { addJob, updateJob } from "@/lib/firebase/jobs";
import { Plus, Trash2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const ProjectSchema = z.object({
  title: z.string().optional(),
  summary: z.string().min(1, "Project summary is required"),
  details: z.string().min(1, "Project details are required"),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required"),
});

export const JobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  date: z.string().min(1, "Date is required"),
  projects: z.array(ProjectSchema).min(1, "At least one project is required"),
});

export type JobFormData = z.infer<typeof JobFormSchema>;

export const UpdateJob = ({
  defaultData,
  closeModal,
}: {
  defaultData?: Job;
  closeModal: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<JobFormData>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      title: defaultData ? defaultData.title : "",
      company: defaultData ? defaultData.company : "",
      date: defaultData ? defaultData.date : "",
      projects: defaultData
        ? defaultData.projects
        : [
            {
              title: "",
              summary: "",
              details: "",
              tags: [],
            },
          ],
    },
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const addProject = () => {
    appendProject({
      title: "",
      summary: "",
      details: "",
      tags: [""],
    });
  };

  const onSubmit = async () => {
    const formData = form.getValues();

    if (!defaultData) {
      setLoading(true);

      try {
        await addJob(formData);
      } catch (error) {
        alert("Error adding job. Check console for details.");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);

      try {
        await updateJob(defaultData.id, form.getValues());
      } catch (error) {
        alert("Error updating job. Check console for details.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    form.reset();
    closeModal();
  };

  return (
    <Card className="mx-4 w-full md:max-w-[80%] xl:max-w-[60%] h-auto max-h-[90%] overflow-auto bg-black mt-10 mb-10 border border-white/20">
      <CardHeader>
        <h2 className="text-2xl font-bold text-white">
          {defaultData ? "Update job" : "Add new job"}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Job Title</FormLabel>
                  <FormControl>
                    <Input
                      className="border-white/30"
                      placeholder="Senior Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Company</FormLabel>
                  <FormControl>
                    <Input
                      className="border-white/30"
                      placeholder="Tech Company Inc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Date period (month year - month year)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-white/30"
                      placeholder="Jan 2020 - Dec 2023"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel className="text-white text-base">Projects</FormLabel>
                <Button
                  type="button"
                  onClick={addProject}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {projectFields.map((project, projectIndex) => (
                <Card
                  key={project.id}
                  className="border-white/20 bg-gray-900/50"
                >
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">
                        Project {projectIndex + 1}
                      </h4>
                      {projectFields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeProject(projectIndex)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Project Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-white/30 text-white"
                              placeholder="E-commerce Platform"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.summary`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              className="border-white/30 text-white"
                              placeholder="Brief project overview..."
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.details`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Details (Markdown)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="border-white/30 text-white"
                              placeholder="- Built responsive UI components&#10;- Implemented user authentication&#10;- Reduced load times by 40%"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Tags */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-white">Tags</FormLabel>
                        <Button
                          type="button"
                          onClick={() => {
                            const currentTags = form.getValues(
                              `projects.${projectIndex}.tags`
                            );
                            form.setValue(`projects.${projectIndex}.tags`, [
                              ...currentTags,
                              "",
                            ]);
                          }}
                          variant="outline"
                          size="sm"
                          className="text-white bg-transparent"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Tag
                        </Button>
                      </div>

                      {form
                        .watch(`projects.${projectIndex}.tags`)
                        .map((_, tagIndex) => (
                          <div key={tagIndex} className="flex gap-2">
                            <FormField
                              control={form.control}
                              name={`projects.${projectIndex}.tags.${tagIndex}`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      className="border-white/30 text-white"
                                      placeholder="React, TypeScript, etc."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {form.watch(`projects.${projectIndex}.tags`)
                              .length > 1 && (
                              <Button
                                type="button"
                                onClick={() => {
                                  const currentTags = form.getValues(
                                    `projects.${projectIndex}.tags`
                                  );
                                  const newTags = currentTags.filter(
                                    (_, index) => index !== tagIndex
                                  );
                                  form.setValue(
                                    `projects.${projectIndex}.tags`,
                                    newTags
                                  );
                                }}
                                variant="outline"
                                size="sm"
                                className="bg-transparent"
                              >
                                <X className="w-4 h-4 text-white" />
                              </Button>
                            )}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
                ? "Update job"
                : "Add job"}
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
