import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="px-5 py-16 md:py-20 lg:py-28">
        <div className="container lg:px-5">
          <SectionTitle
            title="Main Features"
            paragraph="Discover the key features that make our platform exceptional. From advanced analytics to secure data storage, explore how our solution can enhance your experience."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
