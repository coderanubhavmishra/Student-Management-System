function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-5 mt-auto">

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

                <p className="text-sm">
                    © {new Date().getFullYear()} Student Management System
                </p>

                <p className="text-sm mt-2 md:mt-0">
                    Developed by <span className="font-semibold text-white">Anubhav Mishra</span>
                </p>

            </div>

        </footer>
    );
}

export default Footer;