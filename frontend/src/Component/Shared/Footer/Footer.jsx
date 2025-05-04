const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-gray-100 py-4 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-lg font-medium mb-2 md:mb-0">
                    @ {new Date().getFullYear()} All rights reserved.
                </p>
                <p className="text-lg font-medium">
                    Created by <span className="text-white font-semibold">Monjurul</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
