import mongodbLogo from "@/assets/databases/mongodb.svg";
import postgresLogo from "@/assets/databases/postgress.svg";
import supabaseLogo from "@/assets/databases/supabase.svg";

const databases = [
  { name: "MongoDB", logo: mongodbLogo },
  { name: "Supabase", logo: supabaseLogo },
  { name: "PostgreSQL", logo: postgresLogo },
];

const SupportedDatabases = () => {
  return (
    <section className="max-w-6xl mx-auto py-24 px-4">
      <div className="space-y-2 mb-12">
        <h2 className="text-4xl font-semibold text-foreground">
          Supported databases
        </h2>
      </div>

      <div className="flex flex-wrap gap-8 items-center">
        {databases.map((db) => (
          <div
            key={db.name}
            className="flex items-center gap-3 px-6 py-4 rounded-sm border bg-card hover:border-primary/30 transition-colors"
          >
            <img
              src={db.logo}
              alt={db.name}
              className="size-8 object-contain"
            />
            <span className="text-sm font-medium text-foreground">
              {db.name}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-3 px-6 py-4 rounded-sm border border-dashed text-muted-foreground">
          <span className="text-sm font-medium">Your database can be next</span>
        </div>
      </div>
    </section>
  );
};

export default SupportedDatabases;
