import React from 'react';

const Features = () => {
    const features = [
        { title: "Elevate your fitness routine", description: "Unlock your full potential and reach new heights.", iconPath: "..." },
        { title: "Better Sleep", description: "Experience deep, restful sleep and wake up feeling rejuvenated.", iconPath: "..." },
        { title: "Less Stress", description: "Reduce stress and improve your mental wellbeing.", iconPath: "..." },
    ];

    return (
        <section className="bg-purple-100 py-20">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                {features.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-md">
                        <svg className="w-12 h-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d={item.iconPath} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                        <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;

