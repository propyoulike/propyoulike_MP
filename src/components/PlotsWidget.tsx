import NetflixWidget from './NetflixWidget';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const PlotsWidget = () => {
  const plots = [
    {
      id: 31,
      title: "Prestige Great Acres",
      location: "Sarjapur Road, Bangalore",
      price: "₹45 - 85 Lac",
      image: property1,
      type: "Residential Plot",
      configuration: "1200-2400 sq ft",
      developer: "Prestige Group",
      possession: "Ready"
    },
    {
      id: 32,
      title: "Brigade El Dorado",
      location: "Bagalur, Bangalore",
      price: "₹35 - 65 Lac",
      image: property2,
      type: "Premium Plot",
      configuration: "1000-2000 sq ft",
      developer: "Brigade Group",
      possession: "Ready"
    },
    {
      id: 33,
      title: "Godrej Reserve",
      location: "Devanahalli, Bangalore",
      price: "₹55 - 1.2 Cr",
      image: property3,
      type: "Luxury Plot",
      configuration: "1500-3000 sq ft",
      developer: "Godrej Properties",
      possession: "Mar 2025"
    },
    {
      id: 34,
      title: "Shriram Earth",
      location: "Sriperumbudur, Chennai",
      price: "₹25 - 45 Lac",
      image: property1,
      type: "Residential Plot",
      configuration: "800-1600 sq ft",
      developer: "Shriram Properties",
      possession: "Ready"
    },
    {
      id: 35,
      title: "Sobha City",
      location: "Thanisandra, Bangalore",
      price: "₹65 - 1.5 Cr",
      image: property2,
      type: "Premium Plot",
      configuration: "1800-3600 sq ft",
      developer: "Sobha Limited",
      possession: "Jun 2025"
    }
  ];

  return (
    <NetflixWidget
      title="🏞️ Premium Plots"
      subtitle="Build your dream home on these prime land parcels"
      properties={plots}
      category="plots"
    />
  );
};

export default PlotsWidget;