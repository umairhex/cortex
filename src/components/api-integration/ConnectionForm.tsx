import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Integration } from "@/hooks/useIntegrations";

type CreateIntegrationPayload = Omit<
  Integration,
  "_id" | "createdAt" | "isActive" | "updatedAt"
>;

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["mongodb", "supabase", "postgres"]),
    uri: z.string().optional(),
    url: z.string().optional(),
    apiKey: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "mongodb") {
        return data.uri && data.uri.length > 0;
      } else if (data.type === "postgres") {
        return data.uri && data.uri.length > 0;
      } else if (data.type === "supabase") {
        return (
          (data.url &&
            data.apiKey &&
            data.url.length > 0 &&
            data.apiKey.length > 0) ||
          (data.uri && data.uri.length > 0)
        );
      }
      return true;
    },
    {
      message:
        "Please provide the required fields for the selected database type",
      path: ["type"],
    },
  );

interface ConnectionFormProps {
  isCreating: boolean;
  onSubmit: (values: CreateIntegrationPayload) => Promise<void>;
}

export function ConnectionForm({ isCreating, onSubmit }: ConnectionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "mongodb",
      uri: "",
      url: "",
      apiKey: "",
    },
  });

  const selectedType = form.watch("type");

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const config: Record<string, string> = {};
    if (values.type === "mongodb") config.uri = values.uri ?? "";
    if (values.type === "postgres") config.uri = values.uri ?? "";
    if (values.type === "supabase") {
      config.url = values.url ?? "";
      config.apiKey = values.apiKey ?? "";
      if (values.uri) config.connectionString = values.uri;
    }

    try {
      await onSubmit({
        name: values.name,
        type: values.type,
        config,
      });
      form.reset();
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Database Connection</CardTitle>
        <CardDescription>
          Connect your CMS to external databases. Currently supports MongoDB and
          Supabase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connection Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Database"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select database type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="postgres">PostgreSQL</SelectItem>
                        <SelectItem value="supabase">Supabase</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {(selectedType === "mongodb" || selectedType === "postgres") && (
              <FormField
                control={form.control}
                name="uri"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedType === "postgres"
                        ? "Connection String"
                        : "Connection URI"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          selectedType === "postgres"
                            ? "postgresql://user:password@host:5432/db"
                            : "mongodb://username:password@host:port/database"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {selectedType === "supabase" && (
              <>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supabase URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-project.supabase.co"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your Supabase API key"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or Use Connection String (For Full Access)
                    </span>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="uri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Connection String (Optional but Recommended)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Adding..." : "Add Connection"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
