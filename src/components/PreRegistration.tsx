import { useState, FormEvent, useEffect, useRef, RefObject } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  UserCheck, Utensils, Send, CheckCircle2, ShieldCheck, 
  MapPin, Phone, Mail, Award, Sparkles, Building2, Globe, MessageSquare 
} from "lucide-react";

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 8, 
  maxDistance = 3,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
}

const EyeBall = ({ 
  size = 32, 
  pupilSize = 10, 
  maxDistance = 6,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
  activeType: "customer" | "restaurant";
  setActiveType: (type: "customer" | "restaurant") => void;
  onCustomerRegister: (data: { name: string; email: string; phone: string; city: string; notify: boolean }) => void;
  onRestaurantRegister: (data: {
    restaurantName: string;
    ownerName: string;
    email: string;
    phone: string;
    city: string;
    cuisineType: string;
    averageDailyOrders: string;
    website?: string;
    message?: string;
  }) => void;
}

export default function PreRegistration({
  activeType,
  setActiveType,
  onCustomerRegister,
  onRestaurantRegister
}: PreRegistrationProps) {
  // Customer Form State
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custCity, setCustCity] = useState("San Francisco");
  const [custNotify, setCustNotify] = useState(true);

  // Restaurant Form State
  const [restName, setRestName] = useState("");
  const [restOwner, setRestOwner] = useState("");
  const [restEmail, setRestEmail] = useState("");
  const [restPhone, setRestPhone] = useState("");
  const [restCity, setRestCity] = useState("San Francisco");
  const [restCuisine, setRestCuisine] = useState("");
  const [restOrders, setRestOrders] = useState("10-30");
  const [restWebsite, setRestWebsite] = useState("");
  const [restMessage, setRestMessage] = useState("");

  // UI States
  const [custSuccess, setCustSuccess] = useState(false);
  const [restSuccess, setRestSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
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

  const popularCities = ["San Francisco", "New York", "Seattle", "Austin", "Chicago", "Other"];

  // Validations
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?[0-9\s-]{8,15}$/.test(phone);

  const handleCustomerSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!custName.trim()) newErrors.custName = "Name is required";
    if (!custEmail.trim()) {
      newErrors.custEmail = "Email is required";
    } else if (!validateEmail(custEmail)) {
      newErrors.custEmail = "Invalid email format";
    }
    if (!custPhone.trim()) {
      newErrors.custPhone = "Phone number is required";
    } else if (!validatePhone(custPhone)) {
      newErrors.custPhone = "Invalid phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      onCustomerRegister({
        name: custName,
        email: custEmail,
        phone: custPhone,
        city: custCity,
        notify: custNotify
      });
      setIsSubmitting(false);
      setCustSuccess(true);
    }, 800);
  };

  const handleRestaurantSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!restName.trim()) newErrors.restName = "Restaurant Name is required";
    if (!restOwner.trim()) newErrors.restOwner = "Owner Name is required";
    if (!restEmail.trim()) {
      newErrors.restEmail = "Email is required";
    } else if (!validateEmail(restEmail)) {
      newErrors.restEmail = "Invalid email format";
    }
    if (!restPhone.trim()) {
      newErrors.restPhone = "Phone number is required";
    } else if (!validatePhone(restPhone)) {
      newErrors.restPhone = "Invalid phone number";
    }
    if (!restCuisine.trim()) newErrors.restCuisine = "Cuisine type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      onRestaurantRegister({
        restaurantName: restName,
        ownerName: restOwner,
        email: restEmail,
        phone: restPhone,
        city: restCity,
        cuisineType: restCuisine,
        averageDailyOrders: restOrders,
        website: restWebsite,
        message: restMessage
      });
      setIsSubmitting(false);
      setRestSuccess(true);
    }, 800);
  };

  const resetForms = () => {
    setCustSuccess(false);
    setRestSuccess(false);
    setCustName("");
    setCustEmail("");
    setCustPhone("");
    setRestName("");
    setRestOwner("");
    setRestEmail("");
    setRestPhone("");
    setRestCuisine("");
    setRestWebsite("");
    setRestMessage("");
  };

  return (
    <div id="pre-register" className="relative overflow-hidden bg-[#F8F9FB] border-t border-[#EAEAEA]/60 py-20 sm:py-24 md:py-28">
      {/* Blurred glow balls */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto section-container-padding relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#FA5903] uppercase font-mono bg-[#FA5903]/5 px-3 py-1.5 rounded-full border border-[#FA5903]/20">
            Secure Your Status
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111111] mt-4 mb-4 leading-none">
            Join the Launch Cohort.
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Space is strictly allocated by signup priority. Pre-register below to receive guaranteed launch vouchers, featured placement, or courier details when we enter your neighborhood.
          </p>
        </div>

        {/* FORMS WRAPPER WITH TWO-COLUMN DESKTOP LAYOUT */}
        <div className="bg-[#FFFFFF]/65 backdrop-blur-md border border-[#EAEAEA]/60 rounded-[15px] p-4 sm:p-8 shadow-md shadow-orange-950/2 relative">
          
          {/* Decorative outline glow */}
          <div className="absolute inset-0 rounded-[15px] border border-orange-200/10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch">
            
            {/* Left Column: Interactive Cartoon Characters */}
            <div className="relative hidden lg:col-span-5 lg:flex flex-col justify-between bg-gradient-to-br from-orange-600 via-[#FA5903] to-amber-500 p-8 rounded-[15px] text-white overflow-hidden shadow-lg min-h-[480px]">
              {/* Brand Header */}
              <div className="relative z-20 flex items-center gap-2 text-base font-extrabold tracking-tight">
                <div className="size-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="size-4 text-white" />
                </div>
                <span>ZopiqNow Launch</span>
              </div>

              {/* Characters container */}
              <div className="relative z-20 flex items-end justify-center h-[300px]">
                <div className="relative" style={{ width: '320px', height: '280px' }}>
                  
                  {/* Purple tall rectangle character - Back layer */}
                  <div 
                    ref={purpleRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                      left: '35px',
                      width: '100px',
                      height: isTyping ? '260px' : '230px',
                      backgroundColor: '#6C3FF5',
                      borderRadius: '10px 10px 0 0',
                      zIndex: 1,
                      transform: isLookingAtEachOther
                        ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(25px)` 
                        : `skewX(${purplePos.bodySkew || 0}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Eyes */}
                    <div 
                      className="absolute flex gap-4 transition-all duration-700 ease-in-out"
                      style={{
                        left: isLookingAtEachOther ? '30px' : `${25 + purplePos.faceX}px`,
                        top: isLookingAtEachOther ? '35px' : `${25 + purplePos.faceY}px`,
                      }}
                    >
                      <EyeBall 
                        size={12} 
                        pupilSize={5} 
                        maxDistance={3} 
                        eyeColor="white" 
                        pupilColor="#2D2D2D" 
                        isBlinking={isPurpleBlinking}
                        forceLookX={isLookingAtEachOther ? 3 : undefined}
                        forceLookY={isLookingAtEachOther ? 4 : undefined}
                      />
                      <EyeBall 
                        size={12} 
                        pupilSize={5} 
                        maxDistance={3} 
                        eyeColor="white" 
                        pupilColor="#2D2D2D" 
                        isBlinking={isPurpleBlinking}
                        forceLookX={isLookingAtEachOther ? 3 : undefined}
                        forceLookY={isLookingAtEachOther ? 4 : undefined}
                      />
                    </div>
                  </div>

                  {/* Black tall rectangle character - Middle layer */}
                  <div 
                    ref={blackRef}
                    className="absolute bottom-0 transition-all duration-700 ease-in-out"
                    style={{
                      left: '135px',
                      width: '75px',
                      height: '180px',
                      backgroundColor: '#2D2D2D',
                      borderRadius: '8px 8px 0 0',
                      zIndex: 2,
                      transform: isLookingAtEachOther
                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(12px)`
                        : `skewX(${blackPos.bodySkew || 0}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Eyes */}
                    <div 
                      className="absolute flex gap-3 transition-all duration-700 ease-in-out"
                      style={{
                        left: isLookingAtEachOther ? '18px' : `${15 + blackPos.faceX}px`,
                        top: isLookingAtEachOther ? '15px' : `${18 + blackPos.faceY}px`,
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
                    {/* Eyes - just pupils, no white */}
                    <div 
                      className="absolute flex gap-5 transition-all duration-200 ease-out"
                      style={{
                        left: `${45 + (orangePos.faceX || 0)}px`,
                        top: `${50 + (orangePos.faceY || 0)}px`,
                      }}
                    >
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" />
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" />
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
                    {/* Eyes - just pupils, no white */}
                    <div 
                      className="absolute flex gap-4 transition-all duration-200 ease-out"
                      style={{
                        left: `${25 + (yellowPos.faceX || 0)}px`,
                        top: `${25 + (yellowPos.faceY || 0)}px`,
                      }}
                    >
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" />
                      <Pupil size={8} maxDistance={3} pupilColor="#2D2D2D" />
                    </div>
                    {/* Horizontal line for mouth */}
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

            {/* Right Column: Forms / Success States */}
            <div className="col-span-1 lg:col-span-7 flex flex-col justify-center p-2 sm:p-4">
              
              <AnimatePresence mode="wait">
                {/* 1. CUSTOMER SUCCESS STATE */}
                {activeType === "customer" && custSuccess && (
                  <motion.div
                    key="customer-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#111111] mb-2">
                      You are On the List!
                    </h3>
                    <p className="text-[#555555] max-w-md mx-auto text-xs sm:text-sm leading-relaxed mb-6">
                      Thank you, <span className="text-[#111111] font-semibold">{custName}</span>! Your customer pre-registration was recorded. We sent a reservation voucher to <span className="text-[#FA5903] font-medium">{custEmail}</span>.
                    </p>

                    {/* VIP Placement Card representation */}
                    <div className="max-w-sm mx-auto p-5 rounded-[15px] bg-gradient-to-tr from-orange-100/10 via-white to-white/90 border border-[#EAEAEA]/60 text-left mb-6 shadow-xs relative overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-100/5 rounded-full blur-2xl" />
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#FA5903] font-bold">Pass Status</p>
                          <h4 className="text-base font-bold font-display text-[#111111]">VIP Launch Member</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-mono text-gray-400 uppercase">Queue Position</p>
                          <p className="text-sm font-extrabold text-emerald-600 font-mono">#00{Math.floor(Math.random() * 800) + 140}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-black/5 pt-3 text-xs font-sans text-gray-500">
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase font-mono">Voucher Code</p>
                          <p className="text-xs font-extrabold text-[#1A1A1A] font-mono uppercase">ZOPIQPASS5</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-400 uppercase font-mono">Bonus Credits</p>
                          <p className="text-xs font-extrabold text-[#1A1A1A]">$25.00</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={resetForms}
                      className="px-6 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 hover:text-[#1A1A1A] transition-all cursor-pointer shadow-sm"
                    >
                      Register Another User
                    </button>
                  </motion.div>
                )}

                {/* 2. RESTAURANT SUCCESS STATE */}
                {activeType === "restaurant" && restSuccess && (
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
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#111111] mb-2">
                      Become a Launch Partner
                    </h3>
                    <p className="text-[#555555] max-w-md mx-auto text-xs sm:text-sm leading-relaxed mb-6">
                      Application recorded for <span className="text-[#111111] font-semibold">{restName}</span>. We've assigned a dedicated partner manager to audit your details. Check <span className="text-[#FA5903] font-medium">{restEmail}</span> for onboarding schedules.
                    </p>

                    {/* Partner Card representation */}
                    <div className="max-w-sm mx-auto p-5 rounded-[15px] bg-gradient-to-tr from-emerald-100/10 via-white to-white/90 border border-[#EAEAEA]/60 text-left mb-6 shadow-xs relative overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-100/5 rounded-full blur-2xl" />
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold">Partner Code</p>
                          <h4 className="text-base font-bold font-display text-[#111111]">Wave 1 Launch Partner</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-mono text-gray-400 uppercase">Comm. Guarantee</p>
                          <p className="text-sm font-extrabold text-emerald-600 font-mono">0% first 30d</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-black/5 pt-3 text-xs font-sans text-gray-500">
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase font-mono">Status</p>
                          <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-full uppercase inline-block">Pending Audit</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-400 uppercase font-mono">Dedicated Agent</p>
                          <p className="text-[10px] text-[#1A1A1A] font-semibold font-display">TBD (Assigned 24h)</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={resetForms}
                      className="px-6 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 hover:text-[#1A1A1A] transition-all cursor-pointer shadow-sm"
                    >
                      Onboard Another Kitchen
                    </button>
                  </motion.div>
                )}

                {/* 3. CUSTOMER REGISTRATION FORM */}
                {activeType === "customer" && !custSuccess && (
                  <motion.div
                    key="customer-form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Tab Switcher inline for perfect layout */}
                    <div className="flex items-center p-1 bg-gray-100/60 border border-black/5 rounded-xl max-w-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveType("customer");
                          setErrors({});
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                          (activeType as string) === "customer"
                            ? "bg-white text-[#FF5C00] shadow-sm"
                            : "text-gray-500 hover:text-[#1A1A1A]"
                        }`}
                      >
                        For Customers
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveType("restaurant");
                          setErrors({});
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                          (activeType as string) === "restaurant"
                            ? "bg-white text-[#FF5C00] shadow-sm"
                            : "text-gray-500 hover:text-[#1A1A1A]"
                        }`}
                      >
                        For Restaurants
                      </button>
                    </div>

                    <form onSubmit={handleCustomerSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <UserCheck className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              required
                              value={custName}
                              onChange={(e) => setCustName(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              placeholder="John Doe"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                errors.custName ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                              } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                            />
                          </div>
                          {errors.custName && <p className="text-[10px] text-red-500 font-bold">{errors.custName}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <Mail className="w-4 h-4" />
                            </div>
                            <input
                              type="email"
                              required
                              value={custEmail}
                              onChange={(e) => setCustEmail(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              placeholder="johndoe@example.com"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                errors.custEmail ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                              } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                            />
                          </div>
                          {errors.custEmail && <p className="text-[10px] text-red-500 font-bold">{errors.custEmail}</p>}
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <Phone className="w-4 h-4" />
                            </div>
                            <input
                              type="tel"
                              required
                              value={custPhone}
                              onChange={(e) => setCustPhone(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              placeholder="+1 (555) 000-0000"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                errors.custPhone ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                              } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                            />
                          </div>
                          {errors.custPhone && <p className="text-[10px] text-red-500 font-bold">{errors.custPhone}</p>}
                        </div>

                        {/* City Select */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Preferred Launch City
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <select
                              value={custCity}
                              onChange={(e) => setCustCity(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAEAEA]/60 focus:border-[#FA5903]/50 text-[#111111] text-sm focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer shadow-xs"
                            >
                              {popularCities.map((city) => (
                                <option key={city} value={city} className="bg-white text-[#111111]">
                                  {city}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <div className="flex items-start space-x-3 pt-2">
                        <input
                          type="checkbox"
                          id="notify-launch"
                          checked={custNotify}
                          onChange={(e) => setCustNotify(e.target.checked)}
                          className="w-4.5 h-4.5 rounded bg-white border border-gray-300 text-[#FA5903] focus:ring-0 cursor-pointer mt-0.5"
                        />
                        <label htmlFor="notify-launch" className="text-[11px] text-gray-500 leading-normal cursor-pointer select-none">
                          Notify me when you launch! Keep me updated with wave releases, local curated restaurants, and secret culinary tables.
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-extrabold text-sm transition-all duration-300 shadow-md shadow-orange-950/10 hover:shadow-orange-950/20 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Processing..." : "Join Customer Early Access"}</span>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 4. RESTAURANT PARTNER FORM */}
                {activeType === "restaurant" && !restSuccess && (
                  <motion.div
                    key="restaurant-form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Tab Switcher inline for perfect layout */}
                    <div className="flex items-center p-1 bg-gray-100/60 border border-black/5 rounded-xl max-w-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveType("customer");
                          setErrors({});
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                          (activeType as string) === "customer"
                            ? "bg-white text-[#FF5C00] shadow-sm"
                            : "text-gray-500 hover:text-[#1A1A1A]"
                        }`}
                      >
                        For Customers
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveType("restaurant");
                          setErrors({});
                        }}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                          (activeType as string) === "restaurant"
                            ? "bg-white text-[#FF5C00] shadow-sm"
                            : "text-gray-500 hover:text-[#1A1A1A]"
                        }`}
                      >
                        For Restaurants
                      </button>
                    </div>

                    <form onSubmit={handleRestaurantSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Restaurant Name */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Restaurant Name
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

                        {/* Owner Name */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Owner/Manager Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <UserCheck className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              required
                              value={restOwner}
                              onChange={(e) => setRestOwner(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              placeholder="Lucia Rossi"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                errors.restOwner ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                              } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                            />
                          </div>
                          {errors.restOwner && <p className="text-[10px] text-red-500 font-bold">{errors.restOwner}</p>}
                        </div>

                        {/* Owner Email */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Business Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <Mail className="w-4 h-4" />
                            </div>
                            <input
                              type="email"
                              required
                              value={restEmail}
                              onChange={(e) => setRestEmail(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              placeholder="partner@mamalucia.com"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                errors.restEmail ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                              } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                            />
                          </div>
                          {errors.restEmail && <p className="text-[10px] text-red-500 font-bold">{errors.restEmail}</p>}
                        </div>

                        {/* Business Phone */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Contact Phone Number
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

                        {/* Cuisine Type */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Cuisine Type / Specialty
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <Utensils className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              required
                              value={restCuisine}
                              onChange={(e) => setRestCuisine(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              placeholder="Neapolitan Pizza"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border ${
                                errors.restCuisine ? "border-red-500 focus:border-red-500" : "border-[#EAEAEA]/60 focus:border-[#FA5903]/50"
                              } text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs`}
                            />
                          </div>
                          {errors.restCuisine && <p className="text-[10px] text-red-500 font-bold">{errors.restCuisine}</p>}
                        </div>

                        {/* Avg Daily Orders */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Average Daily Orders
                          </label>
                          <div className="relative">
                            <select
                              value={restOrders}
                              onChange={(e) => setRestOrders(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EAEAEA]/60 focus:border-[#FA5903]/50 text-[#111111] text-sm focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer shadow-xs"
                            >
                              <option value="Under 10">Under 10 orders / day</option>
                              <option value="10-30">10 to 30 orders / day</option>
                              <option value="30-75">30 to 75 orders / day</option>
                              <option value="Over 75">Over 75 orders / day</option>
                            </select>
                          </div>
                        </div>

                        {/* Website */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Website or Instagram (Optional)
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <Globe className="w-4 h-4" />
                            </div>
                            <input
                              type="url"
                              value={restWebsite}
                              onChange={(e) => setRestWebsite(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              placeholder="https://mamaluciapizza.com"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAEAEA]/60 focus:border-[#FA5903]/50 text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all shadow-xs"
                            />
                          </div>
                        </div>

                        {/* Launch City */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                            Restaurant City
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <select
                              value={restCity}
                              onChange={(e) => setRestCity(e.target.value)}
                              onFocus={() => setIsTyping(true)}
                              onBlur={() => setIsTyping(false)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAEAEA]/60 focus:border-[#FA5903]/50 text-[#111111] text-sm focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer shadow-xs"
                            >
                              {popularCities.map((city) => (
                                <option key={city} value={city} className="bg-white text-[#111111]">
                                  {city}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-700 tracking-wide block">
                          Special Message / POS System (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <textarea
                            rows={2}
                            value={restMessage}
                            onChange={(e) => setRestMessage(e.target.value)}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            placeholder="Toast, Clover, custom requirements..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#EAEAEA]/60 focus:border-[#FA5903]/50 text-[#111111] placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all resize-none shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#FA5903] hover:bg-[#EB5507] text-white font-extrabold text-sm transition-all duration-300 shadow-md shadow-orange-950/10 hover:shadow-orange-950/20 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Processing..." : "Become a Launch Partner"}</span>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div> {/* End Right Column */}
          </div> {/* End Grid */}
        </div> {/* End Forms Wrapper */}

      </div>
    </div>
  );
}
