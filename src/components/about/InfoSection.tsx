import InfoCard from "./InfoCard";

interface Item {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

interface InfoSectionProps {
  heading: string;
  intro: string;
  items: Item[];
}

const InfoSection: React.FC<InfoSectionProps> = ({ heading, intro, items }) => {
  return (
    <section className="max-w-6xl mx-auto space-y-8 py-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">{heading}</h2>
        <p className="text-gray-300">{intro}</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 auto-rows-fr">
        {items.map((item, idx) => (
          <InfoCard
            key={idx}
            title={item.title}
            description={item.description}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
