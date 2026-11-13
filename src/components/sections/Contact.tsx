import { useState } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import emailjs   from "emailjs-com";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";

const contactInfo = [
  { icon: <Mail size={18} />, title: "Email", content: "yassineriahi540@gmail.com", link: "mailto:yassineriahi540@gmail.com" },
  { icon: <MapPin size={18} />, title: "Location", content: "Ariana, Tunisia" },
  { icon: <Linkedin size={18} />, title: "LinkedIn", content: "linkedin.com/in/yassine-riahi", link: "https://www.linkedin.com/in/yassine-riahi-63a69b242/" },
  { icon: <Github size={18} />, title: "GitHub", content: "github.com/RiahiYassinn", link: "https://github.com/RiahiYassinn" },
];

const Contact: FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    emailjs
      .send("service_dezg8ig", "template_s42jsfj", formData, "Qf_U23Cbr-r93UQsN")
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        window.setTimeout(() => setSubmitted(false), 5000);
      })
      .catch(() => {
        setError("Your message could not be sent. Please try again or email me directly.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section id="contact" className="bg-light-500 py-20 dark:bg-dark-800 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Get in Touch" subtitle="Have a project or an idea to discuss? I’d be glad to hear from you." />

        <motion.div
          ref={ref}
          className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-[1.75rem] border border-light-600 bg-light-100 shadow-xl shadow-dark-900/5 dark:border-dark-400 dark:bg-dark-700 dark:shadow-black/20 lg:grid-cols-[.82fr_1.18fr]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.45 }}
        >
          <div className="bg-dark-800 p-6 text-white dark:bg-dark-900 sm:p-8 lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-300">Say hello</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Let’s start a conversation.</h3>
            <p className="mt-4 text-sm leading-6 text-light-300">
              I’m a Computer Science Engineer and recent graduate focused on full-stack development and applied AI. Reach out about a role, a project, or a technical conversation.
            </p>

            <ul className="mt-8 space-y-5">
              {contactInfo.map((info) => (
                <li key={info.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-accent-300">
                    {info.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-light-400">{info.title}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith("mailto:") ? undefined : "_blank"}
                        rel={info.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="mt-1 inline-block break-all text-sm text-light-100 transition-colors hover:text-accent-300"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-light-100">{info.content}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl font-semibold tracking-tight text-dark-800 dark:text-light-100">Send me a message</h3>
            <p className="mt-2 text-sm text-dark-400 dark:text-light-300">I’ll get back to you as soon as I can.</p>

            {submitted ? (
              <div role="status" className="mt-6 rounded-xl border border-accent-200 bg-accent-50 p-4 text-sm text-accent-800 dark:border-accent-800 dark:bg-accent-900/30 dark:text-accent-200">
                Thanks for your message. I’ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-dark-500 dark:text-light-200">Your name</label>
                    <input id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className="w-full rounded-xl border border-light-600 bg-light-200 px-4 py-3 text-sm text-dark-800 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 dark:border-dark-400 dark:bg-dark-600 dark:text-light-100" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-dark-500 dark:text-light-200">Email address</label>
                    <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-light-600 bg-light-200 px-4 py-3 text-sm text-dark-800 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 dark:border-dark-400 dark:bg-dark-600 dark:text-light-100" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-dark-500 dark:text-light-200">Subject</label>
                  <input id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full rounded-xl border border-light-600 bg-light-200 px-4 py-3 text-sm text-dark-800 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 dark:border-dark-400 dark:bg-dark-600 dark:text-light-100" />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-dark-500 dark:text-light-200">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full resize-y rounded-xl border border-light-600 bg-light-200 px-4 py-3 text-sm text-dark-800 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 dark:border-dark-400 dark:bg-dark-600 dark:text-light-100" />
                </div>

                {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl">
                  {isSubmitting ? "Sending…" : <>Send message <Send size={16} aria-hidden="true" /></>}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
