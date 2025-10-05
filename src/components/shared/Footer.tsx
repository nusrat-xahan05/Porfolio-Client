
const Footer = () => {
    return (
        <footer
            className="py-6 bg-[rgba(7,16,42,0.9)] text-gray-400 text-center text-sm"
            id="next-section"
        >
            <h5 className="font-normal mb-1 text-gray-200">
                Designed & Developed by <span className="bg-gradient-to-r from-[#FD705C] via-[#FFCFCC] to-[#f3829e] bg-clip-text text-transparent font-semibold">Nusrat Jahan</span>
            </h5>
            <p>
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
