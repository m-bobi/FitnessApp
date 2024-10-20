import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-6">
                        <h4 className="font-bold mb-2">About Us</h4>
                        <ul className="space-y-1">
                            <li><Link className="text-gray-600 hover:text-gray-900" to="#">Our Story</Link></li>
                            <li><Link className="text-gray-600 hover:text-gray-900" to="#">Careers</Link></li>
                            <li><Link className="text-gray-600 hover:text-gray-900" to="#">Blog</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-6">
                        <h4 className="font-bold mb-2">Support</h4>
                        <ul className="space-y-1">
                            <li><Link className="text-gray-600 hover:text-gray-900" to="#">Contact Us</Link></li>
                            <li><Link className="text-gray-600 hover:text-gray-900" to="#">FAQs</Link></li>
                            <li><Link className="text-gray-600 hover:text-gray-900" to="#">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-6">
                        <h4 className="font-bold mb-2">Connect</h4>
                        <ul className="space-y-1">
                            <li><Link className="text-gray-600 hover:text-gray-900" to="#">Facebook</Link></li>
                                <li><Link className="text-gray-600 hover:text-gray-900" to="#">Instagram</Link></li>
                                <li><Link className="text-gray-600 hover:text-gray-900" to="#">Twitter</Link></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/4 mb-6">
                            <h4 className="font-bold mb-2">Newsletter</h4>
                            <form className="flex flex-col">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="border border-gray-300 rounded px-3 py-2 mb-2"
                                />
                                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 py-4 text-center">
                    <p className="text-gray-600 text-sm">© 2024 Ascend. All rights reserved.</p>
                </div>
            </footer>
        );
    };

    export default Footer;

