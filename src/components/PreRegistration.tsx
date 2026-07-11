import { useState, FormEvent, useEffect, useRef, RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, CheckCircle2, MapPin, Phone, Building2, Instagram, FileText, User 
} from "lucide-react";

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
  mouseX: number;
  mouseY: number;
}

const Pupil = ({ 
  size = 8, 
  maxDistance = 3,
  pupilColor = "black",
  forceLookX,
  forceLookY,
  mouseX,
  mouseY
}: PupilProps) => {
  const pupilRef = useRef<HTMLDivElement>(null);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
  mouseX: number;
  mouseY: number;
}

const EyeBall = ({ 
  size = 32, 
  pupilSize = 10, 
  maxDistance = 6,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
  mouseX,
  mouseY
}: EyeBallProps) => {
  const eyeRef = useRef<HTMLDivElement>(null);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

interface PreRegistrationProps {
  onRestaurantRegister: (data: {
    restaurantName: string;
    ownerName: string;
    cityAddress: string;
    phone: string;
    instagram?: string;
    menu?: string;
  }) => void;
}

interface DebugInfoType {
  url: string;
  method: string;
  status?: number;
  statusText?: string;
  errorName?: string;
  errorMessage?: string;
  errorStack?: string;
  rawResponse?: string;
  browserEnv?: {
    userAgent: string;
    origin: string;
    href: string;
    isIframe: boolean;
    cookiesEnabled: boolean;
  };
}

export default function PreRegistration({
  onRestaurantRegister
}: PreRegistrationProps) {
  // Detailed debug state for domain failure triage
  const [debugInfo, setDebugInfo] = useState<DebugInfoType | null>(null);

  // Google Sheets active status/errors tracking
  const [sheetsStatus, setSheetsStatus] = useState<{ configured: boolean; error?: string } | null>(null);

  // Restaurant Form State
  const [restName, setRestName] = useState("");
  const [restOwnerName, setRestOwnerName] = useState("");
  const [restCityAddress, setRestCityAddress] = useState("");
  const [restPhone, setRestPhone] = useState("");
  const [restInstagram, setRestInstagram] = useState("");
  const [restMenu, setRestMenu] = useState("");
  const [restSuccess, setRestSuccess] = useState(false);

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
  const [iframeCookieWarning, setIframeCookieWarning] = useState(false);

  const showToast = (message: string, type: "success" | "error" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, type === "warning" ? 10000 : 5000);
  };

  // Character Animation States
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Completely disable mousemove tracking on touch-only devices to save CPU and battery
    const isTouchOnly = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (isTouchOnly) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMouseX(e.clientX);
          setMouseY(e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effects
  useEffect(() => {
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Look at each other when typing changes
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  const calculatePosition = (ref: RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const faceX = Math.max(-10, Math.min(10, deltaX / 25));
    const faceY = Math.max(-8, Math.min(8, deltaY / 35));
    const bodySkew = Math.max(-4, Math.min(4, -deltaX / 150));
    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const validatePhone = (phone: string) => /^\+?[0-9\s().-]{8,20}$/.test(phone);

  const getBrowserEnv = () => ({
    userAgent: navigator.userAgent,
    origin: window.location.origin,
    href: window.location.href,
    isIframe: window.self !== window.top,
    cookiesEnabled: navigator.cookieEnabled,
  });

  const handleRestaurantSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: Record<string, string> = {};

    if (!restName.trim()) newErrors.restName = "Restaurant Name is required";
    if (!restOwnerName.trim()) newErrors.restOwnerName = "Owner / Manager Name is required";
    if (!restCityAddress.trim()) newErrors.restCityAddress = "City Name & Address is required";
    if (!restPhone.trim()) {
      newErrors.restPhone = "Phone number is required";
    } else if (!validatePhone(restPhone)) {
      newErrors.restPhone = "Invalid phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please correct the errors on the form.", "error");
      return;
    }

    setErrors({});
    setDebugInfo(null);
    setIsSubmitting(true);

    const url = "/api/register";
    const payload = {
      restaurantName: restName,
      ownerName: restOwnerName,
      cityAddress: restCityAddress,
      phone: restPhone,
      instagram: restInstagram,
      menu: restMenu,
      honeypot,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      let data: any = null;
      let rawText = "";
      try {
        rawText = await response.text();
        data = JSON.parse(rawText);
      } catch (parseErr: any) {
        console.error("Failed to parse response body as JSON:", parseErr);
      }

      if (response.ok && data?.success) {
        onRestaurantRegister({
          restaurantName: restName,
          ownerName: restOwnerName,
          cityAddress: restCityAddress,
          phone: restPhone,
          instagram: restInstagram,
          menu: restMenu,
        });
        setRestSuccess(true);
        setSheetsStatus({
          configured: data.sheetsConfigured ?? true,
          error: data.sheetsError,
        });
        
        if (data.sheetsConfigured === false) {
          showToast(
            `Onboarded successfully! Note: Sheet storage failed (${data.sheetsError || "configuration pending"}).`,
            "warning"
          );
        } else {
          showToast("Application submitted successfully! Our team will contact you soon 🚀", "success");
        }
      } else {
        const errMessage = data?.message || "Submission failed.";
        showToast(errMessage, "error");
        if (data?.errors) {
          setErrors(data.errors);
        }

        const debugData: DebugInfoType = {
          url,
          method: "POST",
          status: response.status,
          statusText: response.statusText,
          errorName: "APIResponseError",
          errorMessage: errMessage,
          rawResponse: rawText || JSON.stringify(data),
          browserEnv: getBrowserEnv(),
        };
        setDebugInfo(debugData);

        console.error("=== SYSTEM DIAGNOSTICS: API RESPONSE FAILURE ===");
        console.error("Request URL:", url);
        console.error("Status Code:", response.status, response.statusText);
        console.error("Server Payload Sent:", payload);
        console.error("Server Response Raw:", rawText);
        console.error("Browser Env Details:", debugData.browserEnv);
      }
    } catch (err: any) {
      console.error("=== SYSTEM DIAGNOSTICS: NETWORK / UNEXPECTED FAILURE ===");
      console.error("Network error submitting restaurant form:", err);
      
      const debugData: DebugInfoType = {
        url,
        method: "POST",
        errorName: err?.name || "NetworkError",
        errorMessage: err?.message || "Failed to fetch / network failure",
        errorStack: err?.stack || "",
        browserEnv: getBrowserEnv(),
      };
      setDebugInfo(debugData);

      console.error("Request URL:", url);
      console.error("Browser Env Details:", debugData.browserEnv);

      if (window.self !== window.top) {
        setIframeCookieWarning(true);
        showToast("Secure session check blocked. Please open in a new tab.", "error");
      } else {
        showToast(`Something went wrong: ${err?.message || "Network failure"}. Details logged to console.`, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForms = () => {
    setRestName("");
    setRestOwnerName("");
    setRestCityAddress("");
    setRestPhone("");
    setRestInstagram("");
    setRestMenu("");
    setHoneypot("");
    setRestSuccess(false);
    setSheetsStatus(null);
    setErrors({});
  };

  const renderDiagnostics = () => {
    return null;
  };

  return (
    <div 
      id="pre-register" 
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[35px] pb-[70px] z-10"
    >
      <div className="absolute inset-0 top-12 overflow-hidden pointer-events-none rounded-[2.5rem] z-0">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
            Join the Launch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-[#111111] mt-4 mb-5 leading-none">
            Become a Launch Partner
          </h2>
          <p className="text-[#555555] text-xs sm:text-sm md:text-base leading-relaxed">
            Register your restaurant today to receive onboarding updates before ZopiqNow launches in your city.
          </p>
        </div>

        {/* Unified Framed Card */}
        <div className="max-w-5xl mx-auto rounded-[30px] border border-[#EAEAEA]/80 bg-[#FFFFFF] shadow-xl overflow-hidden shadow-orange-950/2">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Left Column: Hand-drawn visual brand characters panel */}
            <div className="col-span-1 lg:col-span-5 bg-[#FA5903] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white">
              
              <div className="relative z-20">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 font-bold">Priority Waiting List</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold leading-tight mt-2 mb-4">
                  Welcome to the future of delivery.
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm">
                  Our cute dispatchers are monitoring this page! Type in your details and watch them react in real-time.
                </p>
              </div>

              {/* Reactive Characters Stage */}
              <div className="relative h-[220px] w-full my-6 select-none z-10 flex items-end justify-center">
                <div className="relative w-[280px] h-[200px]">
                  
                  {/* Purple tall rectangle character - Back Left */}
                  <div 
                    ref={purpleRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                      left: '40px',
                      width: '80px',
                      height: '170px',
                      backgroundColor: '#9E86FF',
                      borderRadius: '40px 40px 0 0',
                      zIndex: 1,
                      transform: `skewX(${purplePos.bodySkew || 0}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Eyes */}
                    <div 
                      className="absolute flex gap-3 transition-all duration-200 ease-out"
                      style={{
                        left: `${18 + (purplePos.faceX || 0)}px`,
                        top: `${35 + (purplePos.faceY || 0)}px`,
                      }}
                    >
                      <EyeBall 
                        size={12} 
                        pupilSize={5} 
                        maxDistance={3} 
                        eyeColor="white" 
                        pupilColor="#2D2D2D" 
                        isBlinking={isPurpleBlinking}
                        forceLookX={isLookingAtEachOther ? 1.5 : undefined}
                        forceLookY={isLookingAtEachOther ? 0 : undefined}
                        mouseX={mouseX}
                        mouseY={mouseY}
                      />
                      <EyeBall 
                        size={12} 
                        pupilSize={5} 
                        maxDistance={3} 
                        eyeColor="white" 
                        pupilColor="#2D2D2D" 
                        isBlinking={isPurpleBlinking}
                        forceLookX={isLookingAtEachOther ? 1.5 : undefined}
                        forceLookY={isLookingAtEachOther ? 0 : undefined}
                        mouseX={mouseX}
                        mouseY={mouseY}
                      />
                    </div>
                  </div>

                  {/* Black circle character - Middle Back */}
                  <div 
                    ref={blackRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                      left: '110px',
                      width: '100px',
                      height: '100px',
                      backgroundColor: '#2D2D2D',
                      borderRadius: '50%',
                      zIndex: 2,
                      transform: `skewX(${blackPos.bodySkew || 0}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Eyes */}
                    <div 
                      className="absolute flex gap-2 transition-all duration-200 ease-out"
                      style={{
                        left: `${30 + (blackPos.faceX || 0)}px`,
                        top: `${32 + (blackPos.faceY || 0)}px`,
                      }}
                    >
                      <EyeBall 
                        size={12} 
                        pupilSize={5} 
                        maxDistance={3} 
                        eyeColor="white" 
                        pupilColor="#2D2D2D" 
                        isBlinking={isBlackBlinking}
                        forceLookX={isLookingAtEachOther ? 0 : undefined}
                        forceLookY={isLookingAtEachOther ? -2 : undefined}
                        mouseX={mouseX}
                        mouseY={mouseY}
                      />
                      <EyeBall 
                        size={12} 
                        pupilSize={5} 
                        maxDistance={3} 
                        eyeColor="white" 
                        pupilColor="#2D2D2D" 
                        isBlinking={isBlackBlinking}
                        forceLookX={isLookingAtEachOther ? 0 : undefined}
                        forceLookY={isLookingAtEachOther ? -2 : undefined}
                        mouseX={mouseX}
                        mouseY={mouseY}
                      />
                    </div>
                  </div>

                  {/* Orange semi-circle character - Front left */}
                  <div 
                    ref={orangeRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                      left: '0px',
                      width: '140px',
                      height: '120px',
                      zIndex: 3,
                      backgroundColor: '#FF9B6B',
                      borderRadius: '70px 70px 0 0',
                      transform: `skewX(${orangePos.bodySkew || 0}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Eyes - just pupils */}
                    <div 
                      className="absolute flex gap-5 transition-all duration-200 ease-out"
                      style={{
                        left: `${45 + (orangePos.faceX || 0)}px`,
                        top: `${50 + (orangePos.faceY || 0)}px`,
                      }}
                    >
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} />
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} />
                    </div>
                  </div>

                  {/* Yellow tall rectangle character - Front right */}
                  <div 
                    ref={yellowRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                      left: '180px',
                      width: '90px',
                      height: '140px',
                      backgroundColor: '#E8D754',
                      borderRadius: '45px 45px 0 0',
                      zIndex: 4,
                      transform: `skewX(${yellowPos.bodySkew || 0}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Eyes - just pupils */}
                    <div 
                      className="absolute flex gap-4 transition-all duration-200 ease-out"
                      style={{
                        left: `${25 + (yellowPos.faceX || 0)}px`,
                        top: `${25 + (yellowPos.faceY || 0)}px`,
                      }}
                    >
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} />
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} />
                    </div>
                    {/* Mouth */}
                    <div 
                      className="absolute w-12 h-[3px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                      style={{
                        left: `${20 + (yellowPos.faceX || 0)}px`,
                        top: `${55 + (yellowPos.faceY || 0)}px`,
                      }}
                    />
                  </div>

                </div>
              </div>

              {/* Tag links */}
              <div className="relative z-20 flex items-center gap-4 text-[10px] text-white/60">
                <span>Secure SSL Sandbox</span>
                <span>•</span>
                <span>Priority Allocation</span>
              </div>

              {/* Decorative subtle patterns */}
              <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:16px_16px]" />
              <div className="absolute top-1/4 right-1/4 size-40 bg-white/10 rounded-full blur-2xl" />
            </div>

            {/* Right Column: Form / Success States */}
            <div className="col-span-1 lg:col-span-7 flex flex-col justify-center p-6 sm:p-10">
              
              <AnimatePresence mode="wait">
                {restSuccess ? (
                  <motion.div
                    key="restaurant-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-[#111111] mb-2">
                      Thank You!
                    </h3>
                    <p className="text-sm font-bold text-[#FA5903] mb-4">
                      We've received your pre registration.
                    </p>
                    <p className="text-[#555555] max-w-md mx-auto text-xs sm:text-sm leading-relaxed mb-8">
                      Our team will review your information and contact you when onboarding begins in your city.
                    </p>

                    <button
                      onClick={resetForms}
                      className="px-6 py-2 rounded-xl bg-[#FA5903] hover:bg-[#EB5507] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Onboard Another Kitchen
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pre-reg-forms-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="text-left">
                        <h4 className="text-lg font-bold text-[#111111] font-display">Become a Launch Partner</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Register your food business today and secure priority onboarding before ZopiqNow launches in your city.</p>
                      </div>

                      <form onSubmit={handleRestaurantSubmit} className="space-y-4">
                        {/* Honeypot field for bot spam protection */}
                        <input
                          type="text"
                          name="honeypot"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          className="hidden"
                          style={{ display: "none" }}
                          tabIndex={-1}
                          autoComplete="off"
                        />

                        <div className="space-y-4 text-left">
                          {/* Restaurant Name */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                              Restaurant / Business Name *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <Building2 className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                required
                                value={restName}
                                onChange={(e) => setRestName(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                placeholder="Mama Lucia's Pizzeria"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                  errors.restName ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                                } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                              />
                            </div>
                            {errors.restName && <p className="text-[10px] text-red-500 font-bold">{errors.restName}</p>}
                          </div>

                          {/* Owner / Manager Name */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                              Owner or Manager Name *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <User className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                required
                                value={restOwnerName}
                                onChange={(e) => setRestOwnerName(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                placeholder="Lucia Moretti"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                  errors.restOwnerName ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                                } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                              />
                            </div>
                            {errors.restOwnerName && <p className="text-[10px] text-red-500 font-bold">{errors.restOwnerName}</p>}
                          </div>

                          {/* City and Address */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                              City Name & Address *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <MapPin className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                required
                                value={restCityAddress}
                                onChange={(e) => setRestCityAddress(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                placeholder="e.g. San Francisco - 100 Mission St"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                  errors.restCityAddress ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                                } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                              />
                            </div>
                            {errors.restCityAddress && <p className="text-[10px] text-red-500 font-bold">{errors.restCityAddress}</p>}
                          </div>

                          {/* Contact Phone */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <Phone className="w-4 h-4" />
                              </div>
                              <input
                                type="tel"
                                required
                                value={restPhone}
                                onChange={(e) => setRestPhone(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                placeholder="+1 (555) 123-4567"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                  errors.restPhone ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                                } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                              />
                            </div>
                            {errors.restPhone && <p className="text-[10px] text-red-500 font-bold">{errors.restPhone}</p>}
                          </div>

                          {/* Instagram (Optional) */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                              Instagram Link (Optional)
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <Instagram className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                value={restInstagram}
                                onChange={(e) => setRestInstagram(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                placeholder="e.g. @mamalucias_pizzeria"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAEAEA]/60 focus:border-[#FA5903]/50 text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs"
                              />
                            </div>
                          </div>

                          {/* Menu Link / Details (Optional) */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                              Menu Link or Details (Optional)
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <FileText className="w-4 h-4" />
                              </div>
                              <input
                                type="text"
                                value={restMenu}
                                onChange={(e) => setRestMenu(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                placeholder="e.g. https://mamalucia.com/menu or Pizza/Pasta specialty"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAEAEA]/60 focus:border-[#FA5903]/50 text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Iframe Third-Party Cookie Warning */}
                        <AnimatePresence>
                          {iframeCookieWarning && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-[#6B3F02] text-[11px] leading-relaxed space-y-3 mt-4"
                            >
                              <div className="flex items-start gap-2.5 text-left">
                                <span className="text-base select-none shrink-0">⚠️</span>
                                <div className="text-left">
                                  <p className="font-bold text-[#452802] text-xs">Secure Verification Blocked</p>
                                  <p className="text-[#6B3F02]/90 mt-0.5">
                                    Your browser's security settings are blocking third-party cookies inside this iframe preview. Since our secure registration portal requires verification to persist entries, please open the application in a new tab to submit successfully!
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1 flex gap-2 justify-start">
                                <a
                                  href={window.location.origin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FA5903] text-white font-extrabold rounded-lg text-[10px] uppercase tracking-wider hover:bg-[#EB5507] transition-all shadow-sm"
                                >
                                  Open in New Tab ↗
                                </a>
                                <button
                                  type="button"
                                  onClick={() => setIframeCookieWarning(false)}
                                  className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-[#452802] font-bold rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  Dismiss
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {renderDiagnostics()}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center space-x-2 py-3 mt-4 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-extrabold text-sm transition-all duration-300 shadow-md shadow-orange-950/10 hover:shadow-orange-950/20 cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                          <span>{isSubmitting ? "Processing..." : "Become a Launch Partner"}</span>
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div> {/* End Right Column */}
          </div> {/* End Grid */}
        </div> {/* End Forms Wrapper */}

      </div>

      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-semibold max-w-sm ${
              toast.type === "success"
                ? "bg-white border-emerald-100 text-emerald-800"
                : toast.type === "warning"
                ? "bg-amber-50 border-amber-200 text-amber-900 shadow-amber-900/5"
                : "bg-white border-red-100 text-red-800"
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              toast.type === "success" 
                ? "bg-emerald-50 text-emerald-600" 
                : toast.type === "warning"
                ? "bg-amber-100 text-amber-700 animate-pulse"
                : "bg-red-50 text-red-600"
            }`}>
              {toast.type === "success" ? "✓" : toast.type === "warning" ? "⚠" : "!"}
            </div>
            <span className="flex-1 text-xs">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer font-extrabold text-base ml-2 shrink-0"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
