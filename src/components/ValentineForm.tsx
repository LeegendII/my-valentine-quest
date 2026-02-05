import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Copy, MessageCircle, Send, ArrowLeft } from "lucide-react";

interface ValentineFormProps {
  onSend: () => void;
  onBack: () => void;
}

export const ValentineForm = ({ onSend, onBack }: ValentineFormProps) => {
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");

  const generateMessage = () => {
    const defaultMessage = `💕 Will you be my Valentine? 💕\n\nDear ${recipientName || "My Love"},\n\n${message || "I think you're amazing and I'd love to spend Valentine's Day with you!"}\n\nWith love,\n${senderName || "Your Secret Admirer"} ❤️`;
    return defaultMessage;
  };

  const handleWhatsApp = () => {
    if (!recipientName.trim()) {
      toast({
        title: "Missing recipient name",
        description: "Please enter your valentine's name",
        variant: "destructive",
      });
      return;
    }
    const text = encodeURIComponent(generateMessage());
    window.open(`https://wa.me/?text=${text}`, "_blank");
    onSend();
  };

  const handleEmail = () => {
    if (!recipientName.trim()) {
      toast({
        title: "Missing recipient name",
        description: "Please enter your valentine's name",
        variant: "destructive",
      });
      return;
    }
    const subject = encodeURIComponent(`💕 Will you be my Valentine, ${recipientName}? 💕`);
    const body = encodeURIComponent(generateMessage());
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    onSend();
  };

  const handleCopyLink = async () => {
    if (!recipientName.trim()) {
      toast({
        title: "Missing recipient name",
        description: "Please enter your valentine's name",
        variant: "destructive",
      });
      return;
    }
    const text = generateMessage();
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied! 💕",
        description: "Your valentine message has been copied to clipboard",
      });
      onSend();
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="text-center px-4 animate-bounce-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-quicksand text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="flex justify-center gap-3 mb-4 text-2xl sm:text-3xl opacity-80">
        <span className="animate-pulse">💌</span>
        <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>💕</span>
        <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>💌</span>
      </div>

      <h2 className="font-dancing text-3xl sm:text-4xl md:text-5xl text-primary mb-2">
        Send Your Love!
      </h2>
      <p className="font-quicksand text-muted-foreground text-sm sm:text-base mb-6">
        Fill in the details to create your Valentine message
      </p>

      {/* Form */}
      <div className="max-w-md mx-auto space-y-4 text-left">
        <div className="space-y-2">
          <Label htmlFor="sender" className="font-quicksand text-foreground/80">
            Your Name 💝
          </Label>
          <Input
            id="sender"
            placeholder="Enter your name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="bg-card/80 border-primary/20 focus:border-primary font-quicksand"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient" className="font-quicksand text-foreground/80">
            Your Valentine's Name 💗
          </Label>
          <Input
            id="recipient"
            placeholder="Enter their name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="bg-card/80 border-primary/20 focus:border-primary font-quicksand"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="font-quicksand text-foreground/80">
            Your Message 💬 (optional)
          </Label>
          <Textarea
            id="message"
            placeholder="Write a sweet message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-card/80 border-primary/20 focus:border-primary font-quicksand min-h-[100px] resize-none"
          />
        </div>
      </div>

      {/* Share buttons */}
      <div className="mt-8 space-y-3">
        <p className="font-quicksand text-muted-foreground text-sm mb-4">
          Choose how to send your Valentine 💕
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Button
            onClick={handleWhatsApp}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-quicksand font-semibold flex-1 gap-2 py-5"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </Button>

          <Button
            onClick={handleEmail}
            className="bg-gradient-romantic text-primary-foreground font-quicksand font-semibold flex-1 gap-2 py-5"
          >
            <Mail className="w-5 h-5" />
            Email
          </Button>

          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="border-2 border-primary/50 text-primary hover:bg-primary/10 font-quicksand font-semibold flex-1 gap-2 py-5"
          >
            <Copy className="w-5 h-5" />
            Copy
          </Button>
        </div>
      </div>

      {/* Footer hint */}
      <p className="font-quicksand text-muted-foreground/60 text-xs mt-8 italic">
        Your message will open in your chosen app ready to send 🚀
      </p>
    </div>
  );
};
