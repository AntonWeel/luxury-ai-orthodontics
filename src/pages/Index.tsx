import { useState, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const BEFORE_AFTER_IMG = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/9553bf85-ffd0-4d15-ba67-ea474e306a50.jpg";
const DOCTOR_M = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/f5200402-c835-4fbf-8322-94ab6108caca.jpg";
const DOCTOR_F = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/05b8bcf4-f9e0-471a-93fb-a37318fcef13.jpg";
const DOCTOR_ME = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/028486af-88ac-40d0-be8c-209ddd293bab.jpg";
const DOCTOR_AS = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/980b2f78-5cca-44e2-980f-eb9c8803adbd.jpg";
const DOCTOR_EU = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/38cda105-edc9-411f-a72a-d266c026a714.jpg";
const DOCTOR_AF = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/9a4e596b-f193-4582-b75a-6e1eb2f70591.jpg";

const doctors = [
  { name: "Dr. Khalid Al-Rashid", title: "Orthodontist", exp: "14+ Years Exp.", rating: 4.9, reviews: "1.4k", img: DOCTOR_ME },
  { name: "Dr. Mei Lin Chen", title: "Orthodontist", exp: "10+ Years Exp.", rating: 4.8, reviews: "1.1k", img: DOCTOR_AS },
  { name: "Dr. James Fletcher", title: "Orthodontist", exp: "16+ Years Exp.", rating: 4.9, reviews: "2.0k", img: DOCTOR_EU },
  { name: "Dr. Amara Osei", title: "Orthodontist", exp: "11+ Years Exp.", rating: 4.8, reviews: "870", img: DOCTOR_AF },
];

const reviews = [
  {
    name: "Priya Sharma",
    location: "Dubai, UAE",
    rating: 5,
    text: "SmileAI gave me the confidence to start my orthodontic journey. The AI preview was so accurate and motivating!",
    avatar: DOCTOR_F,
  },
  {
    name: "Ahmed Al Mansoori",
    location: "Abu Dhabi, UAE",
    rating: 5,
    text: "Amazing experience! The team is professional and the AI technology is next level. Highly recommended.",
    avatar: DOCTOR_M,
  },
  {
    name: "Fatima Al Zahra",
    location: "Riyadh, KSA",
    rating: 5,
    text: "I loved how easy it was to see my future smile. The doctors are very supportive and knowledgeable.",
    avatar: DOCTOR_F,
  },
];

const footerLinks = {
  Services: ["AI Analysis", "Orthodontic Treatment", "Aligners", "Braces"],
  Company: ["About Us", "Our Doctors", "Careers", "Blog"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms & Conditions"],
};

const stats = [
  { icon: "Users", value: "15,000+", label: "Happy Smiles" },
  { icon: "Star", value: "4.9/5", label: "User Rating" },
  { icon: "Shield", value: "100%", label: "Secure & Private" },
  { icon: "Clock", value: "30 Sec", label: "Instant Results" },
];

export default function Index() {
  const [sliderValue, setSliderValue] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const GOOGLE_FORM_URL = "https://forms.google.com/your-form-link";

  const runAnalysis = useCallback((photoUrl: string) => {
    setUploadedPhoto(photoUrl);
    setAnalyzing(true);
    setAnalysisDone(false);
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setAnalysisDone(true);
          window.open(GOOGLE_FORM_URL, "_blank");
          return 100;
        }
        return p + 4;
      });
    }, 80);
  }, []);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      runAnalysis(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const resetUpload = () => {
    setUploadedPhoto(null);
    setAnalysisDone(false);
    setAnalyzing(false);
    setAnalysisProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-900 font-bold text-xl tracking-tight">SmileAI</span>
          <span className="text-purple-500 text-lg">✦</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Services", "How it works", "About us", "For Doctors"].map((item) => (
            <button
              key={item}
              className="text-gray-600 hover:text-purple-600 text-sm transition-colors font-medium"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("preview")}
          className="btn-purple px-5 py-2.5 text-sm flex items-center gap-2"
        >
          Get Started
          <Icon name="ArrowRight" size={14} />
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center pt-16 px-8 relative bg-gradient-to-br from-purple-50 via-white to-indigo-50 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-500 text-xs">🤖</span>
              <span className="text-purple-700 text-xs font-semibold tracking-widest uppercase">AI Powered Orthodontics</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-gray-900">
              See Your Future<br />
              <span className="text-gradient">Smile</span> with AI
            </h1>

            <p className="text-gray-500 text-lg mb-8 max-w-md leading-relaxed">
              Upload your photo and get an AI-powered preview of your perfect smile in less than 30 seconds.
            </p>

            <button
              onClick={() => scrollTo("preview")}
              className="btn-purple animate-pulse-glow px-8 py-4 text-base flex items-center gap-3 mb-8"
            >
              Start Free Preview
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                <Icon name="ArrowRight" size={16} />
              </div>
            </button>

            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-1.5">
                <Icon name="CreditCard" size={14} />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Sparkles" size={14} />
                <span>Free AI analysis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Zap" size={14} />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="flex justify-center animate-float">
            <div className="relative w-64 md:w-72">
              {/* Phone frame */}
              <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-white px-5 pt-3 pb-2 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-800">Good Morning</span>
                    <div className="flex gap-1">
                      <Icon name="Search" size={14} className="text-gray-500" />
                      <Icon name="Bell" size={14} className="text-gray-500" />
                    </div>
                  </div>
                  <div className="px-4 pb-1">
                    <p className="text-sm font-bold text-gray-900">Himanshu Sethi</p>
                  </div>

                  {/* Banner */}
                  <div className="mx-3 mb-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 p-3 relative overflow-hidden">
                    <div className="text-white">
                      <div className="text-xs text-white/80 mb-0.5">Doctor Pal</div>
                      <div className="text-sm font-bold leading-tight">Get 50% Off on<br />Online Consultant</div>
                      <button className="mt-2 bg-white text-purple-700 text-xs font-bold px-3 py-1 rounded-full">Book Now</button>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center opacity-80">
                      <img src={DOCTOR_F} alt="doctor" className="h-full w-full object-cover object-top" />
                    </div>
                  </div>

                  {/* Services grid */}
                  <div className="px-3 pb-2">
                    <p className="text-xs font-bold text-gray-800 mb-2">Explore Services</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: "🤖", label: "AI Consultant", color: "bg-purple-100" },
                        { icon: "🦷", label: "Dental Health", color: "bg-orange-100" },
                        { icon: "👨‍⚕️", label: "Connect Doctor", color: "bg-yellow-100" },
                        { icon: "📚", label: "Learning Hub", color: "bg-blue-100" },
                      ].map((s) => (
                        <div key={s.label} className={`${s.color} rounded-xl p-2.5`}>
                          <div className="text-lg mb-1">{s.icon}</div>
                          <div className="text-xs font-bold text-gray-800">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="flex justify-around py-3 border-t border-gray-100 px-4">
                    {["Home", "Grid", "Globe", "Chat", "User"].map((i) => (
                      <Icon key={i} name={i === "Home" ? "Home" : i === "Grid" ? "LayoutGrid" : i === "Globe" ? "Globe" : i === "Chat" ? "MessageCircle" : "User"} size={16} className={i === "Home" ? "text-purple-600" : "text-gray-400"} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-gray-900 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-white mb-10">
            How <span className="text-gradient">SmileAI</span> Works?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              { num: "1.", icon: "Upload", title: "Upload Photo", desc: "Upload a clear selfie or smile photo" },
              { num: "2.", icon: "Cpu", title: "AI Analysis", desc: "Our AI scans and predicts your perfect smile" },
              { num: "3.", icon: "UserCheck", title: "Get Expert Plan", desc: "Receive personalized plan from our experts" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-0 h-px border-t-2 border-dashed border-white/20" />
                )}
                <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mb-4">
                  <Icon name={step.icon} size={24} className="text-purple-400" fallback="Star" />
                </div>
                <h3 className="text-white font-bold mb-1">{step.num} {step.title}</h3>
                <p className="text-white/50 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI PREVIEW SECTION */}
      <section id="preview" className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left text */}
            <div>
              <div className="inline-flex items-center gap-2 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="text-purple-500">✦</span> AI Smile Preview
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Your New <span className="text-gradient">Smile</span><br />is Closer Than You Think!
              </h2>
              <p className="text-gray-500 mb-6">Advanced AI technology to show your future smile.</p>

              <div className="space-y-3 mb-8">
                {["Realistic AI preview", "Personalized for you", "Instant & secure"].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={12} className="text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => window.open("https://forms.gle/FxaYuWWicXGSo4iw6", "_blank")}
                className="btn-purple px-7 py-3.5 text-sm flex items-center gap-2 mb-6"
              >
                Start Free Preview
                <Icon name="ArrowRight" size={16} />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[DOCTOR_F, DOCTOR_M, DOCTOR_F].map((img, i) => (
                    <img key={i} src={img} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">15,000+ smiles transformed</span>
              </div>
            </div>

            {/* Right - Google Form CTA */}
            <div className="flex flex-col gap-4">
              <div
                  onClick={() => window.open("https://forms.gle/FxaYuWWicXGSo4iw6", "_blank")}
                  className="relative rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50 hover:border-purple-400 hover:bg-purple-100/60 cursor-pointer transition-all flex flex-col items-center justify-center gap-4 aspect-[4/5]"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                    <Icon name="ClipboardList" size={28} className="text-white" />
                  </div>
                  <div className="text-center px-6">
                    <p className="font-bold text-gray-900 mb-1">Get Your Free AI Smile Preview</p>
                    <p className="text-sm text-gray-500">Fill out a short form and our expert will prepare your personalized smile plan</p>
                  </div>
                  <div className="btn-purple px-6 py-2.5 text-sm flex items-center gap-2">
                    Open Form
                    <Icon name="ExternalLink" size={14} />
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Icon name="Lock" size={11} /> Private</span>
                    <span className="flex items-center gap-1"><Icon name="Zap" size={11} /> 30 sec</span>
                    <span className="flex items-center gap-1"><Icon name="Sparkles" size={11} /> AI-powered</span>
                  </div>
              </div>

              {/* Analyzing state - hidden, unused */}
              {analyzing && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-900 flex flex-col items-center justify-center gap-6">
                  <img src={uploadedPhoto!} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover opacity-30" />

                  {/* Scan line animation */}
                  <div className="absolute left-0 right-0 h-0.5 bg-purple-400/80 shadow-[0_0_12px_4px_rgba(168,85,247,0.5)]"
                    style={{ top: `${analysisProgress}%`, transition: "top 0.08s linear" }} />

                  <div className="relative z-10 text-center px-8">
                    <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="text-white font-bold text-lg mb-1">Анализируем рентген...</p>
                    <p className="text-white/60 text-sm mb-4">AI сканирует прикус и положение зубов</p>

                    {/* Progress bar */}
                    <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-75"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                    <p className="text-purple-300 text-sm mt-2 font-semibold">{analysisProgress}%</p>
                  </div>
                </div>
              )}

              {/* Result state */}
              {analysisDone && uploadedPhoto && (
                <div className="flex flex-col gap-4">
                  {/* Uploaded photo preview */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
                    <img src={uploadedPhoto!} alt="Your photo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                        <Icon name="CheckCircle" size={13} />
                        Photo received!
                      </div>
                    </div>
                  </div>

                  {/* CTA card */}
                  <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                      <Icon name="ClipboardList" size={22} className="text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">One last step!</h3>
                    <p className="text-gray-500 text-sm mb-4">Fill out a short form so our expert can prepare your personalized smile plan.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(GOOGLE_FORM_URL, "_blank")}
                        className="flex-1 btn-purple py-3 text-sm flex items-center justify-center gap-2"
                      >
                        Fill out the form
                        <Icon name="ExternalLink" size={14} />
                      </button>
                      <button
                        onClick={resetUpload}
                        className="px-4 py-3 border border-gray-200 text-gray-500 rounded-full text-sm hover:bg-gray-50 transition-colors"
                      >
                        <Icon name="RotateCcw" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-8 border-y border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Icon name={s.icon} size={22} className="text-purple-500" fallback="Star" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Meet Our Expert Doctors</h2>
              <p className="text-gray-500 mt-1">Certified orthodontists with years of experience</p>
            </div>
            <button className="border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              View all doctors
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {doctors.map((doc) => (
              <div key={doc.name} className="card-hover bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-3">
                  <div className="font-bold text-gray-900 text-sm">{doc.name}</div>
                  <div className="text-gray-500 text-xs mb-2">{doc.title}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-gray-700">{doc.rating}</span>
                      <span>({doc.reviews})</span>
                    </div>
                    <span className="text-purple-600 font-medium">{doc.exp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Patients Say</h2>
          <p className="text-gray-500 mb-10">Real people, real results, real smiles</p>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                    <div className="text-gray-500 text-xs">{r.location}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-purple-700 to-purple-500 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-2xl flex-shrink-0">
                💬
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">Ready to See Your Future Smile?</h3>
                <p className="text-white/80 text-sm">Upload your photo now and take the first step towards your perfect smile.</p>
              </div>
            </div>
            <button
              onClick={() => scrollTo("preview")}
              className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full hover:bg-purple-50 transition-colors whitespace-nowrap flex items-center gap-2"
            >
              Start Free Preview
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-gray-900 font-bold text-xl">SmileAI</span>
                <span className="text-purple-500 text-lg">✦</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                AI-powered orthodontic analysis for your perfect smile. Trusted by thousands worldwide.
              </p>
              <div className="flex gap-3">
                {["Instagram", "Facebook", "Youtube", "Twitter"].map((s) => (
                  <div key={s} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center cursor-pointer transition-colors">
                    <Icon name={s === "Youtube" ? "Youtube" : s === "Facebook" ? "Facebook" : s === "Instagram" ? "Instagram" : "Twitter"} size={16} className="text-gray-600" fallback="Share2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-gray-900 mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-gray-500 hover:text-purple-600 text-sm transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Download App */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Download App</h4>
              <div className="space-y-2">
                <div className="bg-black rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <Icon name="Apple" size={18} className="text-white" fallback="Smartphone" />
                  <div>
                    <div className="text-white/70 text-[10px]">Download on the</div>
                    <div className="text-white text-xs font-bold">App Store</div>
                  </div>
                </div>
                <div className="bg-black rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors">
                  <Icon name="Play" size={18} className="text-white" fallback="Smartphone" />
                  <div>
                    <div className="text-white/70 text-[10px]">GET IT ON</div>
                    <div className="text-white text-xs font-bold">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 text-center">
            <p className="text-gray-400 text-sm">© 2025 SmileAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}