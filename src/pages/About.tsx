import InfoSection from "../components/about/InfoSection";
import { FaLock, FaShieldAlt, FaUserSecret, FaKey } from "react-icons/fa";
import Header from "../components/Header";
import TechStacks from "../components/about/TechStacks";

const About = () => {
  return (
    <>
    <Header/>
      <div className="min-h-screen bg-darkbg p-6 md:p-12">
        <InfoSection
          heading="🔒 End-to-End Encryption"
          intro="SecureKit implements a multi-layer encryption model on top of Amazon S3 to ensure full confidentiality and integrity of stored files."
          items={[
            {
              title: " encryption supported",
              description:
                "Choose between client-side AES-256-GCM encryption (zero-knowledge) or SecureKit-managed server-side encryption before the data reaches S3.",
              icon: <FaShieldAlt size={40} className="text-blue-400" />,
            },
            {
              title: "AES-256 encryption at rest",
              description:
                "All files are stored in S3 using AES-256 (SSE-KMS or SSE-S3) with optional envelope encryption.",
              icon: <FaLock size={40} className="text-green-400" />,
            },
            {
              title: "Encrypted metadata support",
              description:
                "Sensitive metadata (file names, tags, custom fields) can be encrypted before being stored in S3 metadata or SecureKit’s indexing layer.",
              icon: <FaUserSecret size={40} className="text-purple-400" />,
            },
            {
              title: "Zero-knowledge option",
              description:
                "When client-side encryption is enabled, SecureKit and AWS only store ciphertext—plaintext never leaves the client.",
              icon: <FaKey size={40} className="text-red-400" />,
            },
          ]}
        />
      </div>
      <TechStacks/>
    </>
  );
};

export default About;
