import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20order%20mangoes!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95 md:bottom-6"
      aria-label="Order via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
