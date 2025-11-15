import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {

  return (
    <main className="relative flex flex-col lg:flex-row items-center lg:items-start min-h-screen px-6 lg:px-24 py-24 text-left bg-whitestone dark:bg-black overflow-hidden transition-colors duration-500">
      <motion.div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute w-40 h-40 bg-redddd rounded-full opacity-30 -top-10 -left-10"
          animate={{ y: [0, 25, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-greenyy rounded-full opacity-20 -bottom-20 right-10"
          animate={{ y: [0, -35, 0], x: [0, -25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-56 h-56 bg-blueee rounded-full opacity-25 top-1/3 left-1/2"
          animate={{ y: [0, 20, 0], x: [0, 20, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-10 lg:right-24 transform -translate-y-1/2"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaLock className="text-redddd w-24 h-24 lg:w-28 lg:h-28 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-2xl lg:ml-24 lg:mt-0 mt-16 text-black dark:text-whitestone transition-colors duration-500"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          <span className="text-redddd">SecureKit</span> – Secure File Vault API
        </h1>

        <p className="mt-6 text-lg md:text-xl text-black/90 dark:text-whitestone/90">
          🔐 Secure Vault — a first solution to securely upload, store, and
          manage files with robust end-to-end encryption and API-driven control.
        </p>

        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Link to={'/login'}>
            <button className="flex items-center justify-center gap-2 bg-redddd text-whitestone dark:text-black px-7 py-3 rounded-lg font-semibold text-lg shadow-lg shadow-redddd/30 hover:scale-105 hover:shadow-redddd/50 transition-all">
              Get Started
              <span aria-hidden="true">&rarr;</span>
            </button>
          </Link>
          <button className="bg-transparent border border-black dark:border-whitestone text-black dark:text-whitestone px-5 py-2 rounded-lg font-semibold text-lg hover:bg-black hover:text-whitestone dark:hover:bg-whitestone dark:hover:text-black hover:scale-105 transition-all">
            Explore Docs
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default HeroSection;
