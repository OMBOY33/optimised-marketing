import { useState } from 'react';
import { Phone, Mail, MessageSquare, X } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white border-2 border-gray-200 shadow-2xl rounded-lg p-4 w-64 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-black uppercase text-sm">Quick Contact</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <a
              href="tel:1300678177"
              className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-[#FDB515] hover:text-black transition-all rounded group"
            >
              <Phone className="w-5 h-5" />
              <div>
                <div className="text-xs uppercase font-bold">Call Us</div>
                <div className="text-sm">1300 678 177</div>
              </div>
            </a>
            <a
              href="mailto:info@optimisedmarketing.com.au"
              className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-[#FDB515] hover:text-black transition-all rounded group"
            >
              <Mail className="w-5 h-5" />
              <div>
                <div className="text-xs uppercase font-bold">Email</div>
                <div className="text-sm text-xs">Send Message</div>
              </div>
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-[#FDB515] hover:text-black transition-all rounded group"
            >
              <MessageSquare className="w-5 h-5" />
              <div>
                <div className="text-xs uppercase font-bold">Book Call</div>
                <div className="text-sm text-xs">Strategy Session</div>
              </div>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-black text-[#FDB515] rotate-45'
            : 'bg-[#FDB515] text-black hover:scale-110'
        }`}
      >
        {isOpen ? <X className="w-7 h-7" /> : <Phone className="w-7 h-7" />}
      </button>
    </div>
  );
}
