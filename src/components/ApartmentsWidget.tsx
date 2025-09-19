import NetflixWidget from './NetflixWidget';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const ApartmentsWidget = () => {
  const apartments = [
    {
      id: 11,
      title: "Prestige Lakeside Habitat",
      location: "Varthur, Bangalore",
      price: "₹85 Lac - 1.2 Cr",
      image: property2,
      type: "Premium Apartment",
      configuration: "2, 3 BHK",
      developer: "Prestige Group",
      possession: "Dec 2024"
    },
    {
      id: 12,
      title: "Purva Atmosphere",
      location: "Thanisandra, Bangalore",
      price: "₹95 Lac - 1.45 Cr",
      image: property1,
      type: "Luxury Apartment",
      configuration: "2, 3 BHK",
      developer: "Puravankara",
      possession: "Jun 2026"
    },
    {
      id: 13,
      title: "Godrej Reflections",
      location: "Hinjewadi, Pune",
      price: "₹1.2 - 1.8 Cr",
      image: property3,
      type: "Ultra Modern",
      configuration: "2, 3, 4 BHK",
      developer: "Godrej Properties",
      possession: "Sep 2025"
    },
    {
      id: 14,
      title: "Mantri Celestia",
      location: "Nanakramguda, Hyderabad",
      price: "₹75 Lac - 1.1 Cr",
      image: property2,
      type: "Premium Apartment",
      configuration: "2, 3 BHK",
      developer: "Mantri Developers",
      possession: "Mar 2026"
    },
    {
      id: 15,
      title: "DLF Capital Greens",
      location: "Moti Nagar, Delhi",
      price: "₹2.5 - 4.2 Cr",
      image: property1,
      type: "Luxury Apartment",
      configuration: "3, 4 BHK",
      developer: "DLF Limited",
      possession: "Dec 2025"
    }
  ];

  return (
    <NetflixWidget
      title="🏢 Premium Apartments"
      subtitle="Luxury living spaces in prime locations"
      properties={apartments}
      category="apartments"
    />
  );
};

export default ApartmentsWidget;