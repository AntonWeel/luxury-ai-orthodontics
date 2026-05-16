import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const DOCTOR_IMG = "https://cdn.poehali.dev/projects/060ab8bb-33c9-47ff-9e89-6eeb19f67845/files/4882b408-1cb0-4c3d-9a8d-819c2bfe6ae0.jpg";

const doctors = [
  {
    name: "Елена Соколова",
    title: "Главный ортодонт",
    experience: "18 лет",
    specialty: "Элайнеры, брекеты, хирургическая ортодонтия",
    rating: 4.9,
    reviews: 312,
    img: DOCTOR_IMG,
    badge: "Топ специалист",
  },
  {
    name: "Артём Волков",
    title: "Детский ортодонт",
    experience: "12 лет",
    specialty: "Детская ортодонтия, трейнеры, пластинки",
    rating: 4.8,
    reviews: 241,
    img: DOCTOR_IMG,
    badge: "Детский эксперт",
  },
  {
    name: "Мария Иванова",
    title: "AI-ортодонт",
    experience: "9 лет",
    specialty: "3D планирование, цифровая ортодонтия",
    rating: 5.0,
    reviews: 189,
    img: DOCTOR_IMG,
    badge: "AI специалист",
  },
];

const services = [
  { icon: "Sparkles", label: "AI анализ улыбки", desc: "Загрузи фото — получи 3D-план за 60 секунд" },
  { icon: "Scan", label: "3D визуализация", desc: "Увидь результат до начала лечения" },
  { icon: "Star", label: "Элайнеры", desc: "Невидимые каппы от ведущих брендов" },
  { icon: "Shield", label: "Гарантия результата", desc: "Фиксированная цена, без доплат" },
];

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:30", "16:00", "17:00"];

const weekDays = [
  { day: "Пн", date: 19 },
  { day: "Вт", date: 20 },
  { day: "Ср", date: 21 },
  { day: "Чт", date: 22 },
  { day: "Пт", date: 23 },
  { day: "Сб", date: 24 },
];

export default function Index() {
  const [sliderValue, setSliderValue] = useState(50);
  const [activeDay, setActiveDay] = useState(1);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("home");
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setScanDone(false);
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Icon name="Sparkles" size={14} className="text-primary" />
          </div>
          <span className="font-display text-xl font-semibold tracking-wide text-foreground">OrthoAI</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[
            { id: "home", label: "Главная" },
            { id: "transform", label: "AI Анализ" },
            { id: "doctors", label: "Ортодонты" },
            { id: "booking", label: "Запись" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-body transition-colors ${
                activeNav === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("booking")}
          className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
        >
          Записаться
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-bg relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full border border-primary/10 animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full border border-primary/10" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 animate-fade-up">
            <Icon name="Zap" size={12} className="text-primary" />
            <span className="text-xs font-body text-primary tracking-widest uppercase">AI-Powered Orthodontics</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-4 leading-tight animate-fade-up">
            Улыбка мечты
            <span className="block text-gradient font-medium italic">через 60 секунд анализа</span>
          </h1>

          <p className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up-delay-1">
            Загрузи фото — наш AI покажет финальный результат лечения ещё до начала. Ведущие ортодонты, 3D-планирование, гарантия результата.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
            <button
              onClick={() => scrollTo("transform")}
              className="bg-primary text-primary-foreground font-body font-medium px-8 py-4 rounded-full hover:bg-primary/90 transition-all hover:scale-105 animate-pulse-glow text-base"
            >
              Запустить AI анализ
            </button>
            <button
              onClick={() => scrollTo("doctors")}
              className="border border-border text-foreground font-body font-medium px-8 py-4 rounded-full hover:border-primary/40 transition-all text-base"
            >
              Наши ортодонты →
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-16 animate-fade-up-delay-3">
            {[
              { num: "2 400+", label: "пациентов" },
              { num: "98%", label: "довольных результатом" },
              { num: "3D", label: "визуализация" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-semibold text-primary">{stat.num}</div>
                <div className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground font-body">прокрути вниз</span>
          <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((s) => (
            <div
              key={s.label}
              className="card-hover bg-card border border-border rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon name={s.icon} size={18} className="text-primary" fallback="Star" />
              </div>
              <div className="font-body font-medium text-sm text-foreground">{s.label}</div>
              <div className="font-body text-xs text-muted-foreground leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI SMILE TRANSFORM */}
      <section id="transform" className="py-24 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
              <Icon name="Cpu" size={12} className="text-primary" />
              <span className="text-xs font-body text-primary tracking-widest uppercase">AI Визуализация</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
              3D трансформация улыбки
              <span className="block text-gradient italic font-medium">в реальном времени</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Перетащи ползунок и увидь разницу. Наш AI анализирует прикус, положение зубов и строит точный прогноз результата.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Before/After Slider */}
            <div className="relative rounded-3xl overflow-hidden border border-border glow-teal aspect-[16/7] bg-secondary">
              {/* AFTER */}
              <div className="absolute inset-0 bg-gradient-to-r from-card via-card to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-6xl text-primary/20 font-light">После</div>
                  <div className="mt-2 flex justify-center gap-1">
                    {[...Array(32)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-sm bg-gradient-to-b from-white to-primary/30"
                        style={{ height: `${24 + Math.sin(i * 0.3) * 4}px`, opacity: 0.7 }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 text-xs font-body text-primary/60 tracking-widest uppercase">Идеальный прикус</div>
                </div>
              </div>

              {/* BEFORE clipped */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-background to-background/80 flex items-center justify-center overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
              >
                <div className="text-center">
                  <div className="font-display text-6xl text-muted-foreground/20 font-light">До</div>
                  <div className="mt-2 flex justify-center gap-1">
                    {[...Array(32)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-sm bg-gradient-to-b from-white/40 to-muted-foreground/20"
                        style={{
                          height: `${16 + Math.abs(Math.sin(i * 0.5) * 12)}px`,
                          marginTop: `${Math.sin(i * 0.7) * 8}px`,
                          opacity: 0.5,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 text-xs font-body text-muted-foreground/60 tracking-widest uppercase">Исходное состояние</div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary z-10 flex items-center justify-center"
                style={{ left: `${sliderValue}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Icon name="ChevronsLeftRight" size={14} className="text-primary-foreground" />
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 z-20">
                <span className="font-body text-xs text-muted-foreground">До лечения</span>
              </div>
              <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1 z-20">
                <span className="font-body text-xs text-primary">После AI лечения</span>
              </div>
            </div>

            <div className="mt-4 px-2">
              <input
                type="range"
                min={5}
                max={95}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="smile-slider w-full h-1 bg-border rounded-full outline-none"
              />
            </div>

            {/* AI Scan */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="relative inline-block rounded-2xl overflow-hidden border border-border bg-card px-8 py-6 text-center w-full max-w-md">
                {scanning && (
                  <div className="absolute left-0 right-0 h-0.5 bg-primary/60 animate-scan z-10" />
                )}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className={`w-2 h-2 rounded-full ${scanDone ? "bg-primary" : scanning ? "bg-yellow-400 animate-pulse" : "bg-muted-foreground"}`} />
                  <span className="font-body text-sm text-muted-foreground">
                    {scanDone ? "Анализ завершён — результат готов" : scanning ? "AI сканирует прикус..." : "Загрузи фото для персонального анализа"}
                  </span>
                </div>
                {scanDone ? (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-left">
                    <div className="font-body text-xs text-primary mb-2 uppercase tracking-wider">AI Диагноз</div>
                    <div className="space-y-1">
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Тип прикуса</span>
                        <span className="text-foreground">Дистальный</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Срок лечения</span>
                        <span className="text-primary font-medium">14–18 мес.</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Рекомендация</span>
                        <span className="text-foreground">Элайнеры</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleScan}
                    disabled={scanning}
                    className="w-full bg-primary text-primary-foreground font-body font-medium py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    <Icon name={scanning ? "Loader" : "ScanFace"} size={16} className={scanning ? "animate-spin" : ""} />
                    {scanning ? "Анализируем..." : "Запустить AI анализ"}
                  </button>
                )}
              </div>
              {scanDone && (
                <button
                  onClick={() => scrollTo("booking")}
                  className="bg-primary text-primary-foreground font-body font-medium px-8 py-3 rounded-full hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Записаться к ортодонту →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
              <Icon name="Users" size={12} className="text-primary" />
              <span className="text-xs font-body text-primary tracking-widest uppercase">Команда</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              Ведущие ортодонты
              <span className="block text-gradient italic font-medium">клиники OrthoAI</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div key={doc.name} className="card-hover bg-card border border-border rounded-3xl overflow-hidden group">
                <div className="relative h-56 bg-secondary overflow-hidden">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1">
                    <span className="font-body text-xs text-primary">{doc.badge}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl font-medium text-foreground">{doc.name}</h3>
                  <p className="font-body text-sm text-primary mb-2">{doc.title}</p>
                  <p className="font-body text-xs text-muted-foreground mb-4 leading-relaxed">{doc.specialty}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Star" size={14} className="text-yellow-400" />
                      <span className="font-body text-sm font-medium text-foreground">{doc.rating}</span>
                      <span className="font-body text-xs text-muted-foreground">({doc.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span className="font-body text-xs">{doc.experience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollTo("booking")}
                    className="w-full border border-primary/30 text-primary font-body font-medium py-2.5 rounded-xl hover:bg-primary/10 transition-all text-sm"
                  >
                    Записаться к врачу
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6 bg-card/30 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
              <Icon name="CalendarCheck" size={12} className="text-primary" />
              <span className="text-xs font-body text-primary tracking-widest uppercase">Запись онлайн</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              Забронируй консультацию
              <span className="block text-gradient italic font-medium">бесплатно</span>
            </h2>
            <p className="font-body text-muted-foreground mt-3">Первая консультация с AI-анализом — 0 ₽. Без обязательств.</p>
          </div>

          {submitted ? (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Icon name="CheckCircle" size={32} className="text-primary" />
              </div>
              <h3 className="font-display text-3xl font-medium text-foreground mb-2">Запись принята!</h3>
              <p className="font-body text-muted-foreground">Мы позвоним вам в течение 15 минут для подтверждения.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-3xl p-6">
                <h3 className="font-body font-medium text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  Выберите дату
                </h3>
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                  {weekDays.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveDay(i)}
                      className={`flex flex-col items-center min-w-[48px] py-3 px-2 rounded-2xl border transition-all ${
                        activeDay === i
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className="font-body text-xs mb-1">{d.day}</span>
                      <span className="font-body font-medium text-sm">{d.date}</span>
                      <span className="font-body text-xs opacity-60">мая</span>
                    </button>
                  ))}
                </div>

                <h3 className="font-body font-medium text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  Время приёма
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setActiveSlot(slot)}
                      className={`py-2 rounded-xl border font-body text-sm transition-all ${
                        activeSlot === slot
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-6 flex flex-col gap-4">
                <h3 className="font-body font-medium text-foreground flex items-center gap-2">
                  <Icon name="User" size={16} className="text-primary" />
                  Ваши данные
                </h3>

                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Алексей Петров"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">Пожелания (необязательно)</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Опишите вашу ситуацию..."
                    rows={3}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                {activeSlot && (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 flex items-center gap-2">
                    <Icon name="CheckCircle" size={14} className="text-primary" />
                    <span className="font-body text-sm text-primary">
                      {weekDays[activeDay].day}, {weekDays[activeDay].date} мая · {activeSlot}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-auto bg-primary text-primary-foreground font-body font-medium py-4 rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Icon name="CalendarCheck" size={16} />
                  Подтвердить запись — бесплатно
                </button>

                <p className="font-body text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-16 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "MapPin", title: "Адрес", lines: ["Москва, Тверская 15", "2-й этаж, офис 201"] },
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 000-00-00", "Пн–Сб, 9:00–20:00"] },
              { icon: "MessageCircle", title: "WhatsApp", lines: ["Написать в чат", "Ответим за 5 минут"] },
            ].map((c) => (
              <div key={c.title} className="card-hover bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 min-w-[40px] rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon name={c.icon} size={16} className="text-primary" fallback="Info" />
                </div>
                <div>
                  <div className="font-body font-medium text-foreground text-sm mb-1">{c.title}</div>
                  {c.lines.map((l) => (
                    <div key={l} className="font-body text-xs text-muted-foreground">{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/30 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Icon name="Sparkles" size={12} className="text-primary" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">OrthoAI</span>
          </div>
          <p className="font-body text-xs text-muted-foreground">© 2025 OrthoAI. Все права защищены.</p>
          <div className="flex gap-4">
            <span className="font-body text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Политика конфиденциальности</span>
            <span className="font-body text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Контакты</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
