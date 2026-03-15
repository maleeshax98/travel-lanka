'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Destinations', href: '#' },
        { name: 'Activities', href: '#' },
        { name: 'Travel Guides', href: '#' },
        { name: 'Tour Packages', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Our Team', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Travel Safety', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ],
    },
  ]

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8">Travel <span className="text-blue-500">Lanka</span></h3>
              <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                We're on a mission to showcase the breathtaking beauty and rich heritage of Sri Lanka to the world. Join our journey.
              </p>
              
              <div className="relative max-w-md">
                <input 
                  type="email" 
                  placeholder="Drop your email for travel inspiration" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-full transition-colors font-bold flex items-center space-x-2">
                  <span>Sign Up</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {footerLinks.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF8C38] mb-8">{section.title}</h4>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group font-medium">
                          <span>{link.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10 mb-12">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Office</div>
              <div className="text-gray-300 font-medium">Galle Road, Colombo 03, Sri Lanka</div>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Call Us</div>
              <div className="text-gray-300 font-medium">+94 (77) 123 4567</div>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Email</div>
              <div className="text-gray-300 font-medium">hello@travellanka.com</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-gray-500 text-sm">
          <div>
            © {currentYear} Travel Lanka Inc. Crafted with ❤️ for Sri Lanka.
          </div>
          <div className="flex items-center space-x-8">
            <a href="#" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
