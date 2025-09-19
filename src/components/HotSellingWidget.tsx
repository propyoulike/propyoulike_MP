import NetflixWidget from './NetflixWidget';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const HotSellingWidget = () => {
  const hotProperties = [
    {
      id: 1,
      title: "Shriram Songs Of The Earth",
      location: "Madiwala, Bangalore",
      price: "₹1.02 - 1.50 Cr",
      image: property1,
      type: "Luxury Apartment",
      configuration: "2, 3 BHK",
      developer: "Shriram Properties",
      isPromoted: true,
      possession: "Dec 2025"
    },
    {
      id: 2,
      title: "Provident Equinox 4",
      location: "Mysore Road, Bangalore",
      price: "₹62.99 - 74.99 Lac",
      image: property2,
      type: "Premium Apartment",
      configuration: "2, 3 BHK",
      developer: "Provident Housing",
      isPromoted: true,
      possession: "Mar 2026"
    },
    {
      id: 3,
      title: "Embassy Edge",
      location: "Devanahalli, Bangalore",
      price: "₹60.95 - 87.17 Lac",
      image: property3,
      type: "Modern Apartment",
      configuration: "1, 2 BHK",
      developer: "Embassy Group",
      isPromoted: true,
      possession: "Jun 2025"
    },
    {
      id: 4,
      title: "Brigade Cornerstone Utopia",
      location: "Whitefield, Bangalore",
      price: "₹1.1 - 1.8 Cr",
      image: property1,
      type: "Ultra Luxury",
      configuration: "2, 3, 4 BHK",
      developer: "Brigade Group",
      isPromoted: true,
      possession: "Dec 2025"
    },
    {
      id: 5,
      title: "Sobha Neopolis",
      location: "Panathur, Bangalore",
      price: "₹72 Lac - 1.05 Cr",
      image: property2,
      type: "Premium Apartment",
      configuration: "2, 3 BHK",
      developer: "Sobha Limited",
      isPromoted: true,
      possession: "Mar 2025"
    }
  ];

  return (
    <NetflixWidget
      title="🔥 Hot Selling Projects"
      subtitle="Most popular properties flying off the market"
      properties={hotProperties}
      category="hot"
    />
  );
};

export default HotSellingWidget;