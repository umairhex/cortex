interface StatsProps {
  heroBg: string;
}

export function Stats({ heroBg }: StatsProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "100%", label: "Open Source" },
            { value: "0ms", label: "Vendor Latency" },
            { value: "∞", label: "Scalability" },
            { value: "1-Click", label: "Deploy" },
          ].map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
