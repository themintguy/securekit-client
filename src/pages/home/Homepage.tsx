import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineShieldCheck, HiOutlineLockClosed } from "react-icons/hi";
import { FaAws } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Homepage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const features = [
        {
            icon: <HiOutlineShieldCheck size={32} className="text-emerald-400" />,
            title: "Zero-Knowledge Encryption",
            description: "Data is encrypted on your device using keys derived from your password. We never see your plaintext."
        },
        {
            icon: <FaAws size={32} className="text-orange-400" />,
            title: "AWS Cloud Infrastructure",
            description: "Built on industry-leading AWS services including EC2, S3, RDS, and CloudFront for maximum durability."
        },
        {
            icon: <HiOutlineLockClosed size={32} className="text-blue-400" />,
            title: "Secure Authentication",
            description: "Robust identity management with JWT, Google OAuth, and memory-hardened key derivation (PBKDF2)."
        }
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg-main overflow-hidden text-text-primary px-4 py-12 pt-32">
            <Navbar />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px]" />


            <motion.div
                className="absolute top-0 -left-20 w-[32rem] h-[32rem] bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 12, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 -right-20 w-[32rem] h-[32rem] bg-green-500/20 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 15, repeat: Infinity }}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-5xl w-full space-y-16"
            >

                <motion.div variants={itemVariants} className="text-center space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        <span style={{ color: "var(--color-accent)" }}>Secure</span>
                        <span style={{ color: "var(--color-primary-soft)" }}>Kit</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                        Architected a server-side backend for a zero-knowledge encrypted storage system using Node.js (Express), PostgreSQL (AWS RDS), and AWS S3, ensuring the server never accesses plaintext data or encryption keys.
                        Implemented JWT-based authentication, Google OAuth, and secure vault unlock workflows.
                        Designed scalable and secure file delivery with AWS EC2 and CloudFront, including recovery flows that preserve zero-knowledge guarantees by resetting encrypted vaults.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/vault">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-black font-bold text-lg shadow-lg shadow-emerald-400/20 transition-all hover:bg-emerald-300"
                            >
                                Access Vault
                            </motion.button>
                        </Link>
                        <Link to="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-xl border border-emerald-400/30 text-emerald-400 font-semibold text-lg hover:bg-emerald-400/10 transition-all backdrop-blur-sm"
                            >
                                Create Account
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>



                <motion.div variants={itemVariants} className="pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-white/5 transition-colors">
                                <div className="p-4 rounded-full bg-white/5 border border-white/10 shadow-xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
                                <p className="text-text-muted leading-relaxed max-w-xs">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </motion.div>
            <Footer />
        </div >
    );
};

export default Homepage;
