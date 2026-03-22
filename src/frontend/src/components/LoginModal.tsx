import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Scissors } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { User } from "../types";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const ADMIN_EMAIL = "admin@studio.com";
const ADMIN_PASSWORD = "admin123";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
}: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    if (mode === "signup" && !name) {
      toast.error("Please enter your name.");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    if (
      mode === "login" &&
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      onLogin({ email, name: "Admin", isAdmin: true });
      toast.success("Welcome back, Admin!");
    } else if (email && password.length >= 6) {
      onLogin({ email, name: name || email.split("@")[0], isAdmin: false });
      toast.success(`Welcome, ${name || email.split("@")[0]}!`);
    } else {
      toast.error("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setEmail("");
    setPassword("");
    setName("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent
        data-ocid="login.dialog"
        className="max-w-sm bg-card border-gold/20"
      >
        <DialogHeader>
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
              <Scissors className="w-5 h-5 text-charcoal" />
            </div>
          </div>
          <DialogTitle className="font-serif text-xl text-foreground text-center">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <p className="text-taupe font-sans text-xs text-center">
            Aalia Tailoring Studio
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {mode === "signup" && (
            <div>
              <Label
                htmlFor="ln-name"
                className="font-sans text-xs text-taupe uppercase tracking-wider"
              >
                Full Name
              </Label>
              <Input
                data-ocid="login.name.input"
                id="ln-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1 border-gold/20 focus:border-gold bg-ivory"
              />
            </div>
          )}
          <div>
            <Label
              htmlFor="ln-email"
              className="font-sans text-xs text-taupe uppercase tracking-wider"
            >
              Email
            </Label>
            <Input
              data-ocid="login.email.input"
              id="ln-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 border-gold/20 focus:border-gold bg-ivory"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
          <div>
            <Label
              htmlFor="ln-pass"
              className="font-sans text-xs text-taupe uppercase tracking-wider"
            >
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                data-ocid="login.password.input"
                id="ln-pass"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="border-gold/20 focus:border-gold bg-ivory pr-10"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-foreground"
              >
                {showPass ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {mode === "login" && (
            <p className="text-taupe font-sans text-xs">
              Admin login: admin@studio.com / admin123
            </p>
          )}

          <Button
            data-ocid="login.submit.button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full gradient-gold text-charcoal font-sans font-semibold rounded-full hover:opacity-90 shadow-gold"
          >
            {isLoading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create Account"}
          </Button>

          <p className="text-center font-sans text-sm text-taupe">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  data-ocid="login.switch.button"
                  onClick={() => setMode("signup")}
                  className="text-gold hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  data-ocid="login.switch.button"
                  onClick={() => setMode("login")}
                  className="text-gold hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
