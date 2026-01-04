const Footer = () => {
    return (
        <footer className="absolute bottom-0 left-0 right-0 z-50 py-6 text-center backdrop-blur-md bg-bg-main/50 border-t border-white/5">
            <p className="text-sm text-text-muted">
                built by{" "}
                <a
                    href="https://www.k31.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-text-primary hover:text-[#424242] transition-colors"
                >
                    kranthi
                </a>
            </p>
        </footer>
    );
};

export default Footer;
