import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, CheckCircle, Copy, Send, Sparkles, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data';
import type { BookingFormData } from '../types';

interface BookingSectionProps {
  preselectedServiceId: string | null;
}

export function BookingContactSection({ preselectedServiceId }: BookingSectionProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: preselectedServiceId || 'full-auto-detailing',
    vehicleDetails: '',
    projectDetails: '',
    locationZip: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [submittedDraft, setSubmittedDraft] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Synchronize preselected service when updated from ServicesSection
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format.';
    }

    if (!formData.vehicleDetails.trim()) {
      newErrors.vehicleDetails = 'Please specify vehicle Year, Make, and Model.';
    }

    if (!formData.locationZip.trim()) {
      newErrors.locationZip = 'Please provide your City or ZIP Code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === formData.serviceId) || SERVICES[0];

  const generateEmailBody = () => {
    return `Hello Ultimate Auto Detailing,

I would like to request an automotive detailing consultation. Here are my vehicle and booking details:

- Client Name: ${formData.fullName}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Requested Service: ${selectedServiceObj.name}
- Vehicle Details: ${formData.vehicleDetails}
- Location / ZIP: ${formData.locationZip}
- Project Details / Notes:
${formData.projectDetails ? formData.projectDetails : 'Standard consultation requested.'}

Looking forward to hearing from you.`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(
      `Detailing Request: ${selectedServiceObj.name} - ${formData.vehicleDetails}`
    );
    const body = encodeURIComponent(generateEmailBody());
    const mailtoUrl = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUrl;
    setSubmittedDraft(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmailBody());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="relative bg-[#050505] py-24 sm:py-32 scroll-mt-12"
      aria-label="Book Your Detailing Appointment"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.1em] text-white"
          >
            BOOK YOUR DETAIL
          </motion.h2>

          <div className="w-20 h-[2px] bg-[#D4A72C] mx-auto my-5" aria-hidden="true" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#C7C7C7] font-light leading-relaxed"
          >
            Request a personalized detailing consultation for your vehicle. Reach out directly or complete the inquiry form below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#D4A72C] font-semibold mb-2 block">
                Direct Inquiries
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.08em] text-white mb-6">
                LOS ANGELES STUDIO
              </h3>

              <p className="text-sm text-[#C7C7C7] font-light leading-relaxed mb-8">
                For prompt quotes, bespoke project consultations, or questions regarding our detailing process, connect with us through phone or email.
              </p>

              <div className="space-y-6">
                {/* Phone Link */}
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  id="contact-phone-card"
                  className="flex items-center gap-4 p-5 bg-[#111111] border border-[#D4A72C]/25 hover:border-[#F5C542] transition-colors group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#050505] text-[#F5C542] border border-[#D4A72C]/30 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C7C7C7]/60 block font-semibold">
                      Telephone
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#F5C542] transition-colors">
                      {BUSINESS_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* Email Link */}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  id="contact-email-card"
                  className="flex items-center gap-4 p-5 bg-[#111111] border border-[#D4A72C]/25 hover:border-[#F5C542] transition-colors group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#050505] text-[#F5C542] border border-[#D4A72C]/30 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] uppercase tracking-widest text-[#C7C7C7]/60 block font-semibold">
                      Email Address
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F5C542] transition-colors break-all">
                      {BUSINESS_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Facebook Official Link */}
                <a
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-facebook-card"
                  className="flex items-center gap-4 p-5 bg-[#111111] border border-[#D4A72C]/25 hover:border-[#F5C542] transition-colors group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#050505] text-[#F5C542] border border-[#D4A72C]/30 shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] uppercase tracking-widest text-[#C7C7C7]/60 block font-semibold">
                      Official Facebook
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F5C542] transition-colors flex items-center gap-1.5">
                      <span>@UltimateCarDetailingSolutions</span>
                      <span className="text-[10px] text-[#D4A72C] font-normal">↗</span>
                    </span>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-4 p-5 bg-[#111111] border border-white/5">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#050505] text-[#D4A72C] border border-[#D4A72C]/30 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C7C7C7]/60 block font-semibold">
                      Service Region
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {BUSINESS_INFO.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Honest Flow Transparency Notice */}
            <div className="mt-8 p-4 bg-[#111111]/80 border-l-2 border-[#D4A72C] text-xs text-[#C7C7C7] font-light leading-relaxed">
              <span className="text-white font-medium block mb-1">Direct Communication Flow:</span>
              Submitting the booking inquiry initiates a prepared email to our direct studio inbox (<span className="text-white">{BUSINESS_INFO.email}</span>) without intermediary tracking.
            </div>
          </motion.div>

          {/* Right Column: Interactive Estimate Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#111111] border border-[#D4A72C]/30 p-6 sm:p-10 relative"
          >
            <AnimatePresence mode="wait">
              {!submittedDraft ? (
                <form id="booking-estimate-form" onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="booking-fullName"
                        className="block text-xs uppercase tracking-[0.14em] text-white font-semibold mb-2"
                      >
                        Full Name <span className="text-[#F5C542]">*</span>
                      </label>
                      <input
                        type="text"
                        id="booking-fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alexander Vance"
                        className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white placeholder-[#C7C7C7]/40 focus:outline-none focus:ring-1 focus:ring-[#F5C542] ${
                          errors.fullName ? 'border-red-500' : 'border-white/15'
                        }`}
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && (
                        <span className="text-[11px] text-red-400 mt-1 block">{errors.fullName}</span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs uppercase tracking-[0.14em] text-white font-semibold mb-2"
                      >
                        Phone Number <span className="text-[#F5C542]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="booking-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 440-726-4593"
                        className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white placeholder-[#C7C7C7]/40 focus:outline-none focus:ring-1 focus:ring-[#F5C542] ${
                          errors.phone ? 'border-red-500' : 'border-white/15'
                        }`}
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-400 mt-1 block">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Email & Location/ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-xs uppercase tracking-[0.14em] text-white font-semibold mb-2"
                      >
                        Email Address <span className="text-[#F5C542]">*</span>
                      </label>
                      <input
                        type="email"
                        id="booking-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. client@example.com"
                        className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white placeholder-[#C7C7C7]/40 focus:outline-none focus:ring-1 focus:ring-[#F5C542] ${
                          errors.email ? 'border-red-500' : 'border-white/15'
                        }`}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-locationZip"
                        className="block text-xs uppercase tracking-[0.14em] text-white font-semibold mb-2"
                      >
                        Project Location / ZIP <span className="text-[#F5C542]">*</span>
                      </label>
                      <input
                        type="text"
                        id="booking-locationZip"
                        value={formData.locationZip}
                        onChange={(e) => setFormData({ ...formData, locationZip: e.target.value })}
                        placeholder="e.g. Los Angeles, 90028"
                        className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white placeholder-[#C7C7C7]/40 focus:outline-none focus:ring-1 focus:ring-[#F5C542] ${
                          errors.locationZip ? 'border-red-500' : 'border-white/15'
                        }`}
                        aria-required="true"
                        aria-invalid={!!errors.locationZip}
                      />
                      {errors.locationZip && (
                        <span className="text-[11px] text-red-400 mt-1 block">{errors.locationZip}</span>
                      )}
                    </div>
                  </div>

                  {/* Service Needed Dropdown */}
                  <div>
                    <label
                      htmlFor="booking-serviceId"
                      className="block text-xs uppercase tracking-[0.14em] text-white font-semibold mb-2"
                    >
                      Service Needed <span className="text-[#F5C542]">*</span>
                    </label>
                    <select
                      id="booking-serviceId"
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full bg-[#050505] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5C542]"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.id} className="bg-[#111111] text-white py-2">
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle Details */}
                  <div>
                    <label
                      htmlFor="booking-vehicleDetails"
                      className="block text-xs uppercase tracking-[0.14em] text-white font-semibold mb-2"
                    >
                      Vehicle Details (Year, Make, Model) <span className="text-[#F5C542]">*</span>
                    </label>
                    <input
                      type="text"
                      id="booking-vehicleDetails"
                      value={formData.vehicleDetails}
                      onChange={(e) => setFormData({ ...formData, vehicleDetails: e.target.value })}
                      placeholder="e.g. 2024 Porsche 911 GT3 (Metallic Jet Black)"
                      className={`w-full bg-[#050505] border px-4 py-3 text-sm text-white placeholder-[#C7C7C7]/40 focus:outline-none focus:ring-1 focus:ring-[#F5C542] ${
                        errors.vehicleDetails ? 'border-red-500' : 'border-white/15'
                      }`}
                      aria-required="true"
                      aria-invalid={!!errors.vehicleDetails}
                    />
                    {errors.vehicleDetails && (
                      <span className="text-[11px] text-red-400 mt-1 block">{errors.vehicleDetails}</span>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="booking-projectDetails"
                      className="block text-xs uppercase tracking-[0.14em] text-white font-semibold mb-2"
                    >
                      Project Details / Specific Requests
                    </label>
                    <textarea
                      id="booking-projectDetails"
                      rows={3}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Note any paint swirls, interior condition, preferred timelines, or specific surface concerns..."
                      className="w-full bg-[#050505] border border-white/15 px-4 py-3 text-sm text-white placeholder-[#C7C7C7]/40 focus:outline-none focus:ring-1 focus:ring-[#F5C542]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="booking-submit-button"
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#F5C542] via-[#D4A72C] to-[#F5C542] text-[#050505] font-extrabold text-xs sm:text-sm uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_0_20px_rgba(212,167,44,0.35)] hover:shadow-[0_0_30px_rgba(245,197,66,0.65)] hover:brightness-110 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Sparkles className="w-4 h-4 text-[#050505]" />
                    <span>BOOK YOUR DETAIL</span>
                  </button>
                </form>
              ) : (
                /* Honest Submission Confirmation & Draft Card */
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="w-16 h-16 bg-[#050505] border border-[#F5C542] text-[#F5C542] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="font-display text-2xl font-bold uppercase tracking-[0.1em] text-white">
                      DETAIL INQUIRY PREPARED
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C7C7C7] font-light mt-2 max-w-md mx-auto">
                      Your inquiry has been compiled and opened in your email client addressed to{' '}
                      <strong className="text-white">{BUSINESS_INFO.email}</strong>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="text-left bg-[#050505] border border-white/10 p-5 space-y-2 text-xs text-[#C7C7C7]">
                    <div>
                      <span className="text-[#D4A72C] font-semibold uppercase tracking-wider block">Service:</span>
                      <span className="text-white">{selectedServiceObj.name}</span>
                    </div>
                    <div>
                      <span className="text-[#D4A72C] font-semibold uppercase tracking-wider block">Vehicle:</span>
                      <span className="text-white">{formData.vehicleDetails}</span>
                    </div>
                    <div>
                      <span className="text-[#D4A72C] font-semibold uppercase tracking-wider block">Client:</span>
                      <span className="text-white">{formData.fullName} • {formData.phone}</span>
                    </div>
                    <div>
                      <span className="text-[#D4A72C] font-semibold uppercase tracking-wider block">Location:</span>
                      <span className="text-white">{formData.locationZip}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex-1 py-3 px-4 bg-[#050505] border border-[#D4A72C]/50 text-white hover:text-[#F5C542] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                    >
                      <Copy className="w-4 h-4 text-[#D4A72C]" />
                      <span>{copied ? 'Details Copied!' : 'Copy Inquiry Text'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedDraft(false)}
                      className="flex-1 py-3 px-4 bg-[#F5C542] text-[#050505] font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Edit or New Request
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
