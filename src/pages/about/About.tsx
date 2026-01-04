import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { HiOutlineShieldCheck, HiOutlineServer, HiOutlineDatabase, HiOutlineLockClosed, HiOutlineExternalLink } from "react-icons/hi";
import { FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";

const About = () => {
    const [ec2Status, setEc2Status] = useState<'Checking' | 'Running' | 'Offline'>('Checking');
    const [rdsStatus, setRdsStatus] = useState<'Checking' | 'Available' | 'Offline'>('Checking');
    const [cdnStatus, setCdnStatus] = useState<'Checking' | 'Enabled' | 'Offline'>('Checking');

    useEffect(() => {
        const checkHealth = async () => {
            // Simulate Health Check
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                setEc2Status('Running');
                setRdsStatus('Available');
                setCdnStatus('Enabled');
            } catch {
                setEc2Status('Offline');
                setRdsStatus('Offline');
                setCdnStatus('Offline');
            }
        };

        checkHealth();
    }, []);

    const getStatusColor = (status: string) => {
        if (status === 'Checking') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
        if (status === 'Running' || status === 'Available' || status === 'Enabled') return 'bg-green-500/10 text-green-400 border-green-500/20';
        return 'bg-red-500/10 text-red-500 border-red-500/20';
    };

    const features = [
        {
            icon: <HiOutlineShieldCheck size={24} />,
            title: "Zero-Knowledge Architecture",
            description: "We never see your password or your keys. Your data is encrypted on your device."
        },
        {
            icon: <HiOutlineServer size={24} />,
            title: "Secure Backend",
            description: "Powered by Node.js, Express, and protected by industry-standard security practices."
        },
        {
            icon: <HiOutlineDatabase size={24} />,
            title: "Reliable Storage",
            description: "Your encrypted blobs are deeply stored in AWS S3 with high durability and availability."
        }
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center pt-32 bg-bg-main overflow-hidden text-text-primary px-4">
            <Navbar />

            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-12 mb-20"
            >
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        About <span className="text-emerald-400">SecureKit</span>
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        A demonstration of modern secure file storage principles, built with a focus on privacy and user control.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-xl bg-bg-surface/30 backdrop-blur-md border border-white/5 flex flex-col items-center gap-4 hover:border-[#424242]/30 transition-colors">
                            <div className="text-emerald-400 p-3 bg-emerald-500/10 rounded-lg">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="w-full pt-24 max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Built With Modern Tech</h2>
                        <div className="h-1 w-20 bg-emerald-500/20 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                category: "Frontend",
                                items: "React, TypeScript, Framer Motion, Tailwind CSS",
                                icon: <FaReact className="text-blue-400" size={28} />
                            },
                            {
                                category: "Backend",
                                items: "Node.js (Express), Middleware Architecture",
                                icon: <FaNodeJs className="text-green-500" size={28} />
                            },
                            {
                                category: "Database",
                                items: "PostgreSQL on AWS RDS",
                                icon: <SiPostgresql className="text-blue-300" size={28} />
                            },
                            {
                                category: "cloud Infrastructure",
                                items: "AWS S3, EC2, CloudFront CDN",
                                icon: <FaAws className="text-orange-400" size={28} />
                            },
                            {
                                category: "Security Core",
                                items: "AES-256-GCM, PBKDF2, JWT Auth",
                                icon: <HiOutlineLockClosed className="text-emerald-400" size={28} />
                            }
                        ].map((stack, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group flex flex-col h-full hover:border-[#424242]/30"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300">
                                        {stack.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-text-primary capitalize">{stack.category}</h3>
                                </div>
                                <p className="text-text-muted text-sm leading-relaxed pl-1">
                                    {stack.items}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full pt-8 pb-16 max-w-5xl mx-auto space-y-8">
                    {/* EC2 Card */}
                    <div className="rounded-2xl bg-[#0f1115] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="bg-[#1a1d23] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <span className="ml-4 text-sm font-mono text-text-muted">securekit-backend-instance</span>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(ec2Status)}`}>
                                {ec2Status === 'Checking' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />}
                                {ec2Status === 'Running' && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                                {ec2Status === 'Offline' && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                {ec2Status === 'Checking' ? 'Checking...' : ec2Status}
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 font-mono text-sm">
                            <div className="space-y-6">
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Instance ID</div>
                                    <div className="text-emerald-400">i-08dedb0d7291a6e62</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Public IPv4 Address</div>
                                    <div className="text-white">16.112.53.82</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Public DNS</div>
                                    <div className="text-text-muted break-all">ec2-16-112-53-82.ap-south-2.compute.amazonaws.com</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Instance Type</div>
                                    <div className="text-white">t3.medium <span className="text-text-muted text-xs ml-2">(2 vCPUs)</span></div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Region</div>
                                    <div className="text-white">ap-south-2 <span className="text-text-muted text-xs">(Hyderabad)</span></div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Private IPv4 Address</div>
                                    <div className="text-white">172.31.4.213</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">VPC ID</div>
                                    <div className="text-white">vpc-01b8595f164c24514</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Virtualization</div>
                                    <div className="text-white">HVM</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RDS Card */}
                    <div className="rounded-2xl bg-[#0f1115] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="bg-[#1a1d23] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <span className="ml-4 text-sm font-mono text-text-muted">securekit-db-primary</span>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(rdsStatus)}`}>
                                {rdsStatus === 'Checking' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />}
                                {rdsStatus === 'Available' && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                                {rdsStatus === 'Offline' && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                {rdsStatus === 'Checking' ? 'Checking...' : rdsStatus}
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 font-mono text-sm">
                            <div className="space-y-6">
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">DB Identifier</div>
                                    <div className="text-blue-400">securekit-db-primary</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Engine</div>
                                    <div className="text-white flex items-center gap-2">
                                        PostgreSQL 15.4
                                        <SiPostgresql className="text-blue-300" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Endpoint</div>
                                    <div className="text-text-muted break-all">securekit-db.c08dedb0.ap-south-2.rds.amazonaws.com</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Instance Class</div>
                                    <div className="text-white">db.t3.medium</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Region</div>
                                    <div className="text-white">ap-south-2 <span className="text-text-muted text-xs">(Hyderabad)</span></div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Port</div>
                                    <div className="text-white">5432</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">VPC ID</div>
                                    <div className="text-white">vpc-01b8595f164c24514</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Storage</div>
                                    <div className="text-white">20 GiB <span className="text-text-muted text-xs">(gp3)</span></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* S3 + CloudFront Card */}
                    <div className="rounded-2xl bg-[#0f1115] border border-white/10 overflow-hidden shadow-2xl">
                        <div className="bg-[#1a1d23] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <span className="ml-4 text-sm font-mono text-text-muted">securekit-storage-cdn</span>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(cdnStatus)}`}>
                                {cdnStatus === 'Checking' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />}
                                {cdnStatus === 'Enabled' && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                                {cdnStatus === 'Offline' && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                {cdnStatus === 'Checking' ? 'Checking...' : cdnStatus}
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 font-mono text-sm">
                            <div className="space-y-6">
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Distribution ID</div>
                                    <div className="text-purple-400">E3X............</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">CloudFront Domain</div>
                                    <div className="text-white flex items-center gap-2 break-all">
                                        <a href="https://d18d88vde7kuvr.cloudfront.net" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                                            d18d88vde7kuvr.cloudfront.net
                                            <HiOutlineExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Origin</div>
                                    <div className="text-text-muted break-all">securekit-assets.s3.ap-south-2.amazonaws.com</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Price Class</div>
                                    <div className="text-white">All Edge Locations</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Region</div>
                                    <div className="text-white">ap-south-2 <span className="text-text-muted text-xs">(Hyderabad)</span></div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">S3 Bucket</div>
                                    <div className="text-orange-400">securekit-assets</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">SSL Certificate</div>
                                    <div className="text-white">ACM</div>
                                </div>
                                <div>
                                    <div className="text-text-muted mb-1 text-xs uppercase tracking-wider">Protocol</div>
                                    <div className="text-white">HTTPS Only</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default About;
