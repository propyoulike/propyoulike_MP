import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface EnquiryModalProps {
  trigger: React.ReactNode;
  propertyTitle?: string;
}

const EnquiryModal = ({ trigger, propertyTitle }: EnquiryModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Enquiry submitted:', formData);
    // For now, redirect to WhatsApp
    const message = `Hi, I'm interested in ${propertyTitle || 'your property'}. 
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Enquiry: ${formData.enquiryType}
Message: ${formData.message}`;
    
    window.open(`https://wa.me/919379822010?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enquire Now</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="enquiry-type">Enquiry Type</Label>
            <Select value={formData.enquiryType} onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select enquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site-visit">Schedule Site Visit</SelectItem>
                <SelectItem value="price-details">Price Details</SelectItem>
                <SelectItem value="loan-assistance">Loan Assistance</SelectItem>
                <SelectItem value="floor-plans">Floor Plans</SelectItem>
                <SelectItem value="resale">Resale Properties</SelectItem>
                <SelectItem value="general">General Enquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us more about your requirements..."
              rows={3}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send via WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryModal;