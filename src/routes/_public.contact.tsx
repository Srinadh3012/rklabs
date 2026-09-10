import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/contact")({
  component: Contact,
});

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thanks for your message! We will get back to you shortly.");
    }, 1000);
  };

  return (
    <div className="w-full pb-20">
      {/* Page Header */}
      <section className="relative pt-16 md:pt-24 pb-12 overflow-hidden border-b border-white/10 bg-[#0f172a]/50">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0f172a]/0 to-transparent" />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Have a question or need a quote? Reach out to us and our expert technicians will assist
            you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5">
                      <MapPin className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Our Location</h3>
                      <p className="text-slate-400">
                        Shop No 5, Sri Srinivasa Complex
                        <br />
                        Opp. R.T.C Bus Stand
                        <br />
                        Guntur, Andhra Pradesh 522001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5">
                      <Phone className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                      <p className="text-slate-400">
                        <a
                          href="tel:+919666984949"
                          className="hover:text-cyan-400 transition-colors"
                        >
                          +91 96669 84949
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5">
                      <Mail className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                      <p className="text-slate-400">
                        <a
                          href="mailto:info@rkrepairlabs.com"
                          className="hover:text-cyan-400 transition-colors"
                        >
                          info@rkrepairlabs.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/5">
                      <Clock className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Business Hours</h3>
                      <p className="text-slate-400">
                        Monday - Saturday: 10:00 AM - 8:30 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden border border-white/10 aspect-video bg-[#1e293b] relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.4182998632616!2d80.4195551!3d16.3150446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a75a4222b8609%3A0x5b8731d711a07ad8!2sRk%20repair%20labs!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RK Repair Labs Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-[#1e293b]/50 border border-white/10 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Your Name</label>
                    <Input
                      required
                      placeholder="John Doe"
                      className="bg-[#020617] border-white/10 h-12 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Phone Number</label>
                    <Input
                      required
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-[#020617] border-white/10 h-12 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                      Email Address (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-[#020617] border-white/10 h-12 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Device & Issue</label>
                    <Textarea
                      required
                      placeholder="E.g. MacBook Pro M1 - Screen cracked"
                      className="bg-[#020617] border-white/10 min-h-[120px] resize-y text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-bold bg-cyan-500 hover:bg-cyan-400 text-black"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                  <p className="text-slate-400 text-sm mb-4">Or reach us instantly via WhatsApp</p>
                  <a
                    href="https://wa.me/919666984949"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
