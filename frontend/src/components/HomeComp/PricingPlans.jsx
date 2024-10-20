import React from 'react';

const PricingPlans = () => {
    const plans = [
        { name: "Basic", price: "$19/month", features: ["10 workouts monthly", "Exercise library", "Join the fitness community"] },
        { name: "Pro", price: "$46/month", features: ["20 workouts monthly", "Exercise library", "Join the fitness community"] },
        { name: "Premium", price: "$64/month", features: ["Unlimited workouts", "Exercise library", "Join the fitness community"] },
    ];

    return (
        <section className="bg-purple-100 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Choose your plan</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="text-3xl font-bold mb-4">{plan.price}</div>
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full px-4 py-2 rounded ${index === 1 ? "bg-purple-600 text-white" : "border border-gray-300 hover:bg-gray-100"}`}>
                                {index === 0 ? "Choose Basic" : index === 1 ? "Choose Pro" : "Choose Premium"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;

