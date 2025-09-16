import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Share2, Facebook, Twitter, Linkedin, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  trigger: React.ReactNode;
  title: string;
  url?: string;
}

const ShareModal = ({ trigger, title, url = window.location.href }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: title,
    url: url,
    text: `Check out this amazing property: ${title}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareData.text)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${url}`)}`
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Share Property</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2"
              onClick={() => window.open(shareUrls.facebook, '_blank')}
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              <span>Facebook</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2"
              onClick={() => window.open(shareUrls.twitter, '_blank')}
            >
              <Twitter className="h-4 w-4 text-blue-400" />
              <span>Twitter</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2"
              onClick={() => window.open(shareUrls.linkedin, '_blank')}
            >
              <Linkedin className="h-4 w-4 text-blue-700" />
              <span>LinkedIn</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2"
              onClick={() => window.open(shareUrls.whatsapp, '_blank')}
            >
              <MessageCircle className="h-4 w-4 text-green-600" />
              <span>WhatsApp</span>
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            
            {navigator.share && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleNativeShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                More Options
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;