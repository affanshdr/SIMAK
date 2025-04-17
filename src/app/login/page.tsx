'use client';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import Navbar from '../../components/Navbar';

export default function Masuk() {
  return (
    <div
      style={{ fontFamily: 'var(--font-poppins)' }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 to-yellow-100"
    >
      <Navbar />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side - Image or Illustration */}
        <motion.div
          className="hidden lg:flex flex-1 items-center justify-center bg-yellow-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/login-ilustrasii.png"
            alt="Login Illustration"
            className="max-w-md w-full"
          />
        </motion.div>

        {/* Right Side - Form */}
        <div className="flex flex-1 items-center justify-center p-6">
          <motion.div
            className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold text-gray-800">SIMAK</h1>
              <h2 className="text-lg font-semibold text-yellow-600 mt-1">
                Masuk ke akunmu
              </h2>
            </motion.div>

            <form className="space-y-6">
              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-yellow-600 mb-1 block"
                >
                  Email
                </label>
                <div className="flex items-center bg-white/60 border border-gray-300 rounded-lg px-3">
                  <FiMail className="text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-yellow-600 mb-1 block"
                >
                  Password
                </label>
                <div className="flex items-center bg-white/60 border border-gray-300 rounded-lg px-3">
                  <FiLock className="text-gray-500" />
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium rounded-lg shadow-md hover:scale-[1.02] transition-transform"
                whileTap={{ scale: 0.98 }}
              >
                Masuk
              </motion.button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 text-sm text-gray-600">
              Belum punya akun?{' '}
              <a
                href="#"
                className="font-medium text-yellow-600 hover:underline"
              >
                Daftar disini
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
