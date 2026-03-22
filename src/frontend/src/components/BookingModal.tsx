import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Design, Order } from "../types";

interface BookingModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Order) => void;
  currentUserName: string;
}

export default function BookingModal({
  design,
  isOpen,
  onClose,
  onSubmit,
  currentUserName,
}: BookingModalProps) {
  const [form, setForm] = useState({
    customerName: currentUserName || "",
    phone: "",
    whatsapp: "",
    preferredDate: "",
    notes: "",
  });
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file.name);
  };

  const handleSubmit = async () => {
    if (!form.customerName || !form.phone || !form.preferredDate) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const order: Order = {
      id: `o${Date.now()}`,
      designId: design?.id || "",
      designName: design?.name || "",
      designCategory: design?.category || "",
      customerName: form.customerName,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      preferredDate: form.preferredDate,
      notes: form.notes,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      uploadedFile,
    };

    onSubmit(order);
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setForm({
        customerName: "",
        phone: "",
        whatsapp: "",
        preferredDate: "",
        notes: "",
      });
      setUploadedFile("");
      onClose();
    }, 2000);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent
        data-ocid="booking.dialog"
        className="max-w-md bg-card border-gold/20 max-h-[90vh] overflow-y-auto"
      >
        {success ? (
          <div data-ocid="booking.success_state" className="py-10 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-foreground mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-taupe font-sans text-sm">
              We'll contact you shortly on WhatsApp to confirm the details.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-xl text-foreground">
                Book This Design
              </DialogTitle>
              {design && (
                <div className="flex items-center gap-3 mt-2 p-3 rounded-xl border border-gold/20 bg-accent/30">
                  <div
                    className="w-12 h-12 rounded-lg flex-shrink-0"
                    style={{ background: design.gradient }}
                  />
                  <div>
                    <p className="font-serif text-sm text-foreground font-semibold">
                      {design.name}
                    </p>
                    <p className="font-sans text-xs text-gold">
                      ₹{design.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div>
                <Label
                  htmlFor="bk-name"
                  className="font-sans text-xs text-taupe uppercase tracking-wider"
                >
                  Your Name *
                </Label>
                <Input
                  data-ocid="booking.name.input"
                  id="bk-name"
                  value={form.customerName}
                  onChange={(e) => handleChange("customerName", e.target.value)}
                  placeholder="Full name"
                  className="mt-1 border-gold/20 focus:border-gold bg-ivory"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label
                    htmlFor="bk-phone"
                    className="font-sans text-xs text-taupe uppercase tracking-wider"
                  >
                    Phone *
                  </Label>
                  <Input
                    data-ocid="booking.phone.input"
                    id="bk-phone"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-1 border-gold/20 focus:border-gold bg-ivory"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="bk-wa"
                    className="font-sans text-xs text-taupe uppercase tracking-wider"
                  >
                    WhatsApp
                  </Label>
                  <Input
                    data-ocid="booking.whatsapp.input"
                    id="bk-wa"
                    value={form.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    placeholder="Same as phone"
                    className="mt-1 border-gold/20 focus:border-gold bg-ivory"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="bk-date"
                  className="font-sans text-xs text-taupe uppercase tracking-wider"
                >
                  Preferred Date *
                </Label>
                <Input
                  data-ocid="booking.date.input"
                  id="bk-date"
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) =>
                    handleChange("preferredDate", e.target.value)
                  }
                  className="mt-1 border-gold/20 focus:border-gold bg-ivory"
                />
              </div>
              <div>
                <Label
                  htmlFor="bk-notes"
                  className="font-sans text-xs text-taupe uppercase tracking-wider"
                >
                  Notes / Special Requirements
                </Label>
                <Textarea
                  data-ocid="booking.notes.textarea"
                  id="bk-notes"
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Size, colour preferences, occasion details..."
                  className="mt-1 border-gold/20 focus:border-gold bg-ivory resize-none h-20"
                />
              </div>
              <div>
                <Label className="font-sans text-xs text-taupe uppercase tracking-wider">
                  Upload Reference Design (optional)
                </Label>
                <label
                  data-ocid="booking.upload_button"
                  className="mt-1 flex items-center gap-2 px-4 py-2 border border-dashed border-gold/30 rounded-xl cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors"
                >
                  <Upload className="w-4 h-4 text-taupe" />
                  <span className="font-sans text-sm text-taupe">
                    {uploadedFile || "Choose file..."}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <DialogFooter className="mt-4 gap-2">
              <Button
                data-ocid="booking.cancel.button"
                variant="ghost"
                onClick={onClose}
                className="text-taupe hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                data-ocid="booking.submit.button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gradient-gold text-charcoal font-sans font-semibold rounded-full px-6 hover:opacity-90 shadow-gold"
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
