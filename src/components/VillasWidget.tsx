import NetflixWidget from './NetflixWidget';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const VillasWidget = () => {
  const villas = [
    {
      id: 21,
      title: "Godrej MSR City",
      location: "Shelbgore, Bangalore",
      price: "₹1.22 - 1.80 Cr",
      image: property3,
      type: "Luxury Villa",
      configuration: "3, 4 BHK",
      developer: "Godrej Properties",
      possession: "Ready"
    },
    {
      id: 22,
      title: "Prestige Glenwood",
      location: "Budigere Cross, Bangalore",
      price: "₹2.1 - 3.5 Cr",
      image: property1,
      type: "Premium Villa",
      configuration: "3, 4, 5 BHK",
      developer: "Prestige Group",
      possession: "Jun 2025"
    },
    {
      id: 23,
      title: "Brigade Orchards",
      location: "Devanahalli, Bangalore",
      price: "₹1.8 - 2.8 Cr",
      image: property2,
      type: "Garden Villa",
      configuration: "3, 4 BHK",
      developer: "Brigade Group",
      possession: "Dec 2024"
    },
    {
      id: 24,
      title: "Sobha Lifestyle Legacy",
      location: "Devanahalli, Bangalore",
      price: "₹2.5 - 4.2 Cr",
      image: property3,
      type: "Ultra Luxury Villa",
      configuration: "4, 5 BHK",
      developer: "Sobha Limited",
      possession: "Mar 2026"
    },
    {
      id: 25,
      title: "Shriram Grand City",
      location: "Tumkur Road, Bangalore",
      price: "₹1.1 - 1.9 Cr",
      image: property1,
      type: "Modern Villa",
      configuration: "2, 3, 4 BHK",
      developer: "Shriram Properties",
      possession: "Aug 2025"
    }
  ];

  return (
    <NetflixWidget
      title="🏡 Luxury Villas"
      subtitle="Exclusive independent living with premium amenities"
      properties={villas}
      category="villas"
    />
  );
};

export default VillasWidget;