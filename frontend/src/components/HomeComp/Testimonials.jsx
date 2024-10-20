import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { quote: "I feel energized and motivated.", author: "Mark G.", role: "Personal Trainer" },
        { quote: "Ascend Fitness is the perfect tool for achieving your goals.", author: "Sarah B.", role: "Fitness Blogger" },
        { quote: "Fitness is not just a hobby, it's a lifestyle.", author: "Emily T.", role: "Yoga Instructor" },
        { quote: "Find balance and harmony in your life.", author: "John D.", role: "Adventure Enthusiast" },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Join Ascend community and connect with like-minded individuals</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                            <blockquote className="text-lg mb-4">{testimonial.quote}</blockquote>
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <div className="font-semibold">{testimonial.author}</div>
                                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

