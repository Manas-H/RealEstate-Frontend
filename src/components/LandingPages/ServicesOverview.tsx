import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <a href={link} className="mt-4 inline-block text-blue-500 hover:underline">
          Learn More
        </a>
      </div>
    </div>
  );
};

const ServicesOverview: React.FC = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600">Explore the services we offer to meet your real estate needs.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Property Buying"
            description="Find your dream home with our extensive property listings and expert guidance."
            imageUrl="https://picsum.photos/200/300"
            link="/services/property-buying"
          />
          <ServiceCard
            title="Property Selling"
            description="Get the best value for your property with our effective selling strategies."
            imageUrl="https://picsum.photos/200/300"
            link="/services/property-selling"
          />
          <ServiceCard
            title="Rentals"
            description="Discover a variety of rental properties to suit your lifestyle and budget."
            imageUrl="https://picsum.photos/200/300"
            link="/services/rentals"
          />
          <ServiceCard
            title="Property Management"
            description="Professional management services to maintain and enhance your property’s value."
            imageUrl="https://picsum.photos/200/300"
            link="/services/property-management"
          />
          <ServiceCard
            title="Real Estate Consulting"
            description="Expert advice and consulting services to help you navigate the real estate market."
            imageUrl="https://picsum.photos/200/300"
            link="/services/real-estate-consulting"
          />
          <ServiceCard
            title="Commercial Properties"
            description="Browse commercial properties for your business needs in prime locations."
            imageUrl="https://picsum.photos/200/300"
            link="/services/commercial-properties"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
