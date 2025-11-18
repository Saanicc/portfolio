"use client";

import { useState } from "react";
import { addProject, updateProject } from "@/lib/firebase/projects";
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
import { Textarea } from "../../ui/textarea";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "@/lib/firebase/init";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { Project } from "@/types/project";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  githubUrl: z.string().url("Please enter a valid GitHub URL").optional(),
  liveUrl: z.string().optional(),
});

export const UpdateProject = ({
  defaultData,
  closeModal,
}: {
  defaultData?: Project;
  closeModal: () => void;
}) => {
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    defaultData?.imageUrls ? defaultData.imageUrls : [null]
  );
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultData ? defaultData.title : "",
      description: defaultData ? defaultData.description : "",
      technologies: defaultData ? defaultData.technologies : [],
      liveUrl: defaultData ? defaultData.liveUrl : "",
      githubUrl: defaultData ? defaultData.githubUrl : "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      alert("No files could be loaded");
      return;
    }

    for (const file of files) {
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please select an image file");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert("Image must be less than 5MB");
          return;
        }

        setImageFiles((prev) => [...prev, file]);

        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const uploadImages = async (
    files: File[],
    projectTitle: string
  ): Promise<string[]> => {
    const timestamp = Date.now();
    const sanitizedTitle = projectTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    setUploadProgress("Uploading images...");

    const uploadPromises = files.map(async (file) => {
      const fileName = `projects/${sanitizedTitle}-${timestamp}.${file.name
        .split(".")
        .pop()}`;

      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      setUploadProgress("");
      return downloadURLs;
    } catch (error) {
      setUploadProgress("");
      console.error(error);
      throw new Error("Failed to upload images");
    }
  };

  const onSubmit = async () => {
    const formData = form.getValues();

    if (!defaultData) {
      if (!imageFiles) {
        alert("Please select an image for the project");
        return;
      }

      setLoading(true);

      try {
        const imageUrls = await uploadImages(imageFiles, formData.title);

        await addProject({
          ...formData,
          imageUrls,
        });
      } catch (error) {
        alert("Error adding project. Check console for details.");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);

      try {
        if (!imageFiles) {
          await updateProject(defaultData.id, {
            ...form.getValues(),
          });
        } else {
          const imageUrls = await uploadImages(imageFiles, formData.title);

          const filterImages = defaultData?.imageUrls?.filter((url) =>
            imagePreviews.includes(url)
          );

          await updateProject(defaultData.id, {
            ...formData,
            imageUrls: [...(filterImages ?? []), ...imageUrls],
          });
        }
      } catch (error) {
        alert("Error updating project. Check console for details.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    form.reset();
    setImageFiles([]);
    setImagePreviews([null]);
    setUploadProgress("");

    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    closeModal();
  };

  const addTechnology = () => {
    if (
      techInput.trim() &&
      !form.getValues("technologies").includes(techInput.trim())
    ) {
      const currentTechs = form.getValues("technologies");
      form.setValue("technologies", [...currentTechs, techInput.trim()]);
      form.trigger("technologies");
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    const currentTechs = form.getValues("technologies");
    form.setValue(
      "technologies",
      currentTechs.filter((t) => t !== tech)
    );
    form.trigger("technologies");
  };

  return (
    <Card className="mx-4 w-full md:max-w-[80%] xl:max-w-[60%] h-auto max-h-[90%] overflow-auto bg-black mt-10 mb-10 border border-white/20">
      <CardHeader>
        <h2 className="text-2xl font-bold text-white">
          {defaultData ? "Update project" : "Add New Project"}
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
                  <FormLabel className="text-white">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="border-white/30"
                      placeholder="Project title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Project description"
                      className="resize-none min-h-[100px] overflow-hidden h-auto border-white/30"
                      rows={4}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel htmlFor="image-upload">Project Image</FormLabel>
              <div className="space-y-3">
                <Input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="h-auto cursor-pointer border-white/30"
                />
                <p className="text-sm text-muted-foreground">
                  Max file size: 5MB. Supported formats: JPG, PNG, WebP
                </p>

                {uploadProgress && (
                  <p className="text-sm text-blue-600">{uploadProgress}</p>
                )}

                {imagePreviews && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Previews:</p>
                    <div className="flex flex-row gap-2">
                      {imagePreviews.map((image, index) => (
                        <div key={index} className="relative w-[20%]">
                          <Image
                            src={image ?? ""}
                            alt="Preview"
                            width={300}
                            height={0}
                            className="w-full h-auto object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImageFiles((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                              setImagePreviews((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                              const fileInput = document.getElementById(
                                "image-upload"
                              ) as HTMLInputElement;
                              if (fileInput) fileInput.value = "";
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="technologies" className="text-white">
                    Technologies
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          id="technologies"
                          placeholder="Enter technology"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTechnology();
                            }
                          }}
                          className="flex-1 border-white/30"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={addTechnology}
                          className="border-white/30"
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.watch("technologies").map((tech) => (
                          <div
                            key={tech}
                            className="px-3 py-1 outline outline-1 outline-white/30 text-primary-foreground rounded-md flex items-center gap-2 text-sm"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(tech)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="liveUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Demo URL</FormLabel>
                  <FormControl>
                    <Input
                      className="border-white/30"
                      placeholder="Project demo URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      className="border-white/30"
                      placeholder="Project GitHub URL"
                      {...field}
                    />
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
                ? "Update project"
                : "Add project"}
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
