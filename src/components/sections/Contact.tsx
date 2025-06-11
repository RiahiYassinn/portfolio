import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import { Mail, MapPin, Send, Linkedin, Github } from "lucide-react";
import emailjs from "emailjs-com";

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate form submission
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setSubmitted(true);
  //     setFormData({
  //       name: "",
  //       email: "",
  //       subject: "",
  //       message: "",
  //     });

  //     // Reset success message after 5 seconds
  //     setTimeout(() => {
  //       setSubmitted(false);
  //     }, 5000);
  //   }, 1500);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_dezg8ig",
        "template_s42jsfj",
        formData,
        "Qf_U23Cbr-r93UQsN" // Public key
      )
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert("Failed to send message. Please try again.");
        console.error(error);
      });
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: "Email",
      content: "yassineriahi540@gmail.com",
      link: "mailto:yassineriahi540@gmail.com",
    },
    {
      icon: <MapPin size={20} />,
      title: "Location",
      content: "Ariana, Tunisia",
      link: null,
    },
    {
      icon: <Linkedin size={20} />,
      title: "LinkedIn",
      content: "linkedin.com/in/yassine-riahi",
      link: "https://www.linkedin.com/in/yassine-riahi-63a69b242/",
    },
    {
      icon: <Github size={20} />,
      title: "GitHub",
      content: "github.com/RiahiYassinn",
      link: "https://github.com/RiahiYassinn",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-light-500 dark:bg-dark-600 relative"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Get In Touch"
          subtitle="Let's connect and discuss opportunities"
        />

        <motion.div
          ref={ref}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary-500 dark:text-light-100 mb-6">
              Contact Information
            </h3>

            <p className="text-dark-400 dark:text-light-300 mb-8 leading-relaxed">
              I'm currently looking for summer internship opportunities for
              2025. Whether you have a question or just want to say hi, I'll do
              my best to get back to you as soon as possible!
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-2 rounded-full bg-light-300 dark:bg-dark-400 text-primary-500 dark:text-accent-500 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-500 dark:text-accent-500">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-dark-400 dark:text-light-300 hover:text-primary-500 dark:hover:text-accent-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-dark-400 dark:text-light-300">
                        {info.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white dark:bg-dark-700 rounded-lg border border-light-300 dark:border-dark-400 shadow-md">
              <h4 className="text-lg font-semibold mb-2 text-primary-500 dark:text-light-100">
                Looking for summer internship opportunities
              </h4>
              <p className="text-dark-400 dark:text-light-300">
                Available for software engineering roles starting June 2025.
                Open to remote, hybrid, or on-site positions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-dark-700 p-6 md:p-8 rounded-lg shadow-md border border-light-300 dark:border-dark-400">
            <h3 className="text-2xl font-bold text-primary-500 dark:text-light-100 mb-6">
              Send Me a Message
            </h3>

            {submitted ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-400">
                Thanks for your message! I'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-dark-400 dark:text-light-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-light-300 dark:border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500 focus:border-transparent bg-light-100 dark:bg-dark-600 text-dark-500 dark:text-light-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-dark-400 dark:text-light-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-light-300 dark:border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500 focus:border-transparent bg-light-100 dark:bg-dark-600 text-dark-500 dark:text-light-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-dark-400 dark:text-light-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-light-300 dark:border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500 focus:border-transparent bg-light-100 dark:bg-dark-600 text-dark-500 dark:text-light-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-dark-400 dark:text-light-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-light-300 dark:border-dark-400 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-500 focus:border-transparent bg-light-100 dark:bg-dark-600 text-dark-500 dark:text-light-100 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
