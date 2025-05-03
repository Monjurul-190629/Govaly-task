const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-4 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-md font-medium mb-2 md:mb-0">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
                <p className="text-md font-medium">
                    Created by <span className="text-blue-600">Monjurul</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
