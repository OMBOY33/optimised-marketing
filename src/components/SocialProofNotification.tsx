import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  location: string;
}

const notifications: Omit<Notification, 'id'>[] = [
  { message: 'Sarah from Melbourne just booked a strategy call', location: 'Melbourne, VIC' },
  { message: 'James from Sydney signed up for SEO services', location: 'Sydney, NSW' },
  { message: 'Emma from Brisbane started their campaign', location: 'Brisbane, QLD' },
  { message: 'Michael from Perth requested a quote', location: 'Perth, WA' },
  { message: 'Lisa from Adelaide joined our client list', location: 'Adelaide, SA' },
];

export default function SocialProofNotification() {
  const [visible, setVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification({ ...randomNotif, id: Date.now() });
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const initialDelay = setTimeout(() => {
      showNotification();
      const interval = setInterval(showNotification, 15000);
      return () => clearInterval(interval);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  if (!currentNotification) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-sm transition-all duration-500 ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white border-2 border-[#FDB515] shadow-2xl rounded-lg p-4 flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-[#FDB515] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-black" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-black text-sm">{currentNotification.message}</p>
          <p className="text-gray-600 text-xs mt-1">{currentNotification.location}</p>
          <p className="text-gray-400 text-xs mt-1">Just now</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
