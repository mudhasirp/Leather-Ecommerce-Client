import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../Components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../Components/ui/input-otp";

const OtpVerify = ({ email = "****@gmail.com", onVerify }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const shakeRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (showError && shakeRef.current) {
      shakeRef.current.classList.add("animate-shake");
      const timer = setTimeout(() => {
        shakeRef.current?.classList.remove("animate-shake");
        setShowError(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setShowError(true);
      return;
    }
    setIsSubmitting(true);

    if (onVerify) {
      onVerify(otp, () => setIsSubmitting(false));
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setIsResendDisabled(true);
    setOtp("");
  };

  return (
    <div className="space-y-8 text-center animate-fade-in">
      <div className="space-y-2">
        <h1 className="font-sans text-6xl font-light tracking-tight text-foreground">
          FRESH
          <br />
          MART
        </h1>
        <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent mx-auto my-4" />
        <p className="text-xs tracking-widest text-muted-foreground font-light">
          AVAILABLE FRESH VEGETABLES
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-light">
            Enter the verification code sent to your email
          </p>
          <p className="text-xs text-muted-foreground font-light">{email}</p>
        </div>

        <div ref={shakeRef} className="flex justify-center">
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={setOtp}
            containerClassName="gap-3"
            aria-invalid={showError}
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="border-border/50 bg-card text-foreground text-lg font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all h-12 w-12 rounded-lg"
              />
              <InputOTPSlot
                index={1}
                className="border-border/50 bg-card text-foreground text-lg font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all h-12 w-12 rounded-lg"
              />
              <InputOTPSlot
                index={2}
                className="border-border/50 bg-card text-foreground text-lg font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all h-12 w-12 rounded-lg"
              />
              <InputOTPSlot
                index={3}
                className="border-border/50 bg-card text-foreground text-lg font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all h-12 w-12 rounded-lg"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || otp.length !== 4}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-widest uppercase text-sm h-11 transition-all rounded-sm disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Verify Account"}
        </Button>
      </form>

      <div className="space-y-3 pt-4 border-t border-border/30">
        {isResendDisabled ? (
          <p className="text-xs text-muted-foreground font-light">
            Didn&apos;t receive the code? Resend in{" "}
            <span className="text-accent font-medium">{timeLeft}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-xs font-light text-muted-foreground hover:text-accent transition-colors uppercase tracking-widest"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpVerify;
