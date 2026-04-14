"use client";

import { useRef, useState } from "react";
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { Project } from "@/types/project";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

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

type ImageItem =
  | { type: "existing"; url: string }
  | { type: "new"; file: File; id: string; previewUrl: string };

export const UpdateProject = ({
  defaultData,
  closeModal,
}: {
  defaultData?: Project;
  closeModal: () => void;
}) => {
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageItem[]>(() => {
    return (defaultData?.imageUrls || []).map((url) => ({
      type: "existing",
      url,
    }));
  });
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

    if (!files || files.length === 0) {
      return;
    }

    const newImages: ImageItem[] = [];
    let hasError = false;

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast({
          duration: 3000,
          title: "Invalid file",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
        hasError = true;
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          duration: 3000,
          title: "File too large",
          description: `${file.name} must be less than 5MB`,
          variant: "destructive",
        });
        hasError = true;
        continue;
      }

      const id = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);
      newImages.push({ type: "new", file, id, previewUrl });
    }

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
      if (!hasError) {
        toast({
          duration: 3000,
          title: "Images added",
          description: `${newImages.length} image(s) selected successfully.`,
        });
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImages = async (
    files: File[],
    projectTitle: string,
  ): Promise<string[]> => {
    const timestamp = Date.now();
    const sanitizedTitle = projectTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    setUploadProgress("Uploading images...");

    const uploadPromises = files.map(async (file, index) => {
      const fileName = `projects/${sanitizedTitle}-${timestamp}-${index}.${file.name
        .split(".")
        .pop()}`;

      console.log("File name: ", fileName);

      const storageRef = ref(storage, fileName);

      console.log("Storage ref: ", storageRef);

      try {
        const snapshot = await uploadBytes(storageRef, file);

        console.log("Snapshot: ", snapshot);

        const downloadUrl = await getDownloadURL(snapshot.ref);
        toast({
          duration: 3000,
          title: "Upload complete",
          description: `Successfully uploaded ${file.name}.`,
        });
        return downloadUrl;
      } catch (error) {
        toast({
          duration: 3000,
          title: "Upload failed",
          description: `Failed to upload ${file.name}.`,
          variant: "destructive",
        });
        throw error;
      }
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      console.log("Download URLs: ", downloadURLs);
      setUploadProgress("");
      return downloadURLs;
    } catch (error) {
      setUploadProgress("");
      console.error(error);
      throw new Error("Failed to upload images");
    }
  };

  const handleRemoveImage = async (item: ImageItem, index: number) => {
    if (item.type === "existing") {
      try {
        // const storageRef = ref(storage, item.url);
        // await deleteObject(storageRef);

        console.log("Item: ", item);

        console.log("Images: ", images);

        if (defaultData) {
          const remainingUrls = images
            .filter((_, i) => i !== index)
            .filter((img) => img.type === "existing")
            .map((img) => img.url as string);

          console.log("Remaining URLs: ", remainingUrls);

          // await updateProject(defaultData.id, { imageUrls: remainingUrls });
        }

        toast({
          duration: 3000,
          title: "Image removed",
          description: "Existing image removed from project successfully.",
        });
      } catch (error) {
        console.error("Error removing image:", error);
        toast({
          duration: 3000,
          title: "Error",
          description: "Failed to remove image from storage.",
          variant: "destructive",
        });
        return;
      }
    } else {
      URL.revokeObjectURL(item.previewUrl);
      toast({
        duration: 3000,
        title: "Image removed",
        description: `Draft image ${item.file.name} removed.`,
      });
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveAll = async () => {
    let successCount = 0;

    for (const item of images) {
      if (item.type === "existing") {
        try {
          const storageRef = ref(storage, item.url);
          await deleteObject(storageRef);
          successCount++;
        } catch (error) {
          console.error("Failed to delete existing image in bulk:", error);
        }
      } else {
        URL.revokeObjectURL(item.previewUrl);
        successCount++;
      }
    }

    if (defaultData) {
      try {
        await updateProject(defaultData.id, { imageUrls: [] });
      } catch (e) {
        console.error(e);
      }
    }

    setImages([]);
    toast({
      duration: 3000,
      title: "All images removed",
      description: `Removed ${successCount} out of ${images.length} images.`,
      variant: successCount < images.length ? "destructive" : "default",
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async () => {
    const formData = form.getValues();

    if (images.length === 0) {
      toast({
        duration: 3000,
        title: "Missing Image",
        description: "Please select an image for the project",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const newFiles = images
        .filter(
          (img): img is Extract<ImageItem, { type: "new" }> =>
            img.type === "new",
        )
        .map((img) => img.file);

      const existingUrls = images
        .filter(
          (img): img is Extract<ImageItem, { type: "existing" }> =>
            img.type === "existing",
        )
        .map((img) => img.url);

      const uploadedUrls =
        newFiles.length > 0 ? await uploadImages(newFiles, formData.title) : [];

      const combinedUrls = [...existingUrls, ...uploadedUrls];

      if (!defaultData) {
        await addProject({
          ...formData,
          imageUrls: combinedUrls,
        });
        toast({
          duration: 3000,
          title: "Success",
          description: "Project added successfully.",
        });
      } else {
        await updateProject(defaultData.id, {
          ...formData,
          imageUrls: combinedUrls,
        });
        toast({
          duration: 3000,
          title: "Success",
          description: "Project updated successfully.",
        });
      }

      form.reset();
      setImages([]);
      setUploadProgress("");

      if (fileInputRef.current) fileInputRef.current.value = "";
      closeModal();
    } catch (error) {
      toast({
        duration: 3000,
        title: "Error",
        description: "Error saving project. Check console for details.",
        variant: "destructive",
      });
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
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
      currentTechs.filter((t) => t !== tech),
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
                  ref={fileInputRef}
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

                {images.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Previews:</p>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveAll}
                      >
                        Remove All
                      </Button>
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {images.map((item, index) => (
                        <div
                          key={item.type === "new" ? item.id : item.url}
                          className="relative w-[20%] min-w-[100px]"
                        >
                          <Image
                            src={
                              item.type === "new" ? item.previewUrl : item.url
                            }
                            alt="Preview"
                            width={300}
                            height={300}
                            className="w-full aspect-square object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => handleRemoveImage(item, index)}
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
