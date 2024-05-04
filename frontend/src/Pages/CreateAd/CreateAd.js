import React, { useState } from 'react';

const CreateAd = () => {
    const [formData, setFormData] = useState({
        productName: '',
        useDuration: '',
        description: '',
        images: [],
        video: '',
        price: '',
        meetUpLocation: '',
        currierCharge: '',
        currierBy: '',
        contactNumber: '',
        productDetails: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const images = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: images
        });
    };

    const handlePriceTypeChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            priceType: value,
            priceAmount: value === 'free' ? '' : formData.priceAmount,
            meetUpLocation: value === 'free' ? '' : formData.meetUpLocation,
            currierCharge: value === 'free' ? '' : formData.currierCharge,
            currierBy: value === 'free' ? '' : formData.currierBy
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add code to submit form data
        console.log(formData);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Sell Your Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="productName" className="block mb-2">Product Name:</label>
                    <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="useDuration" className="block mb-2">Use Duration:</label>
                    <input type="text" id="useDuration" name="useDuration" value={formData.useDuration} onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border rounded p-2 w-full h-32" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="images" className="block mb-2">Images:</label>
                    <input type="file" id="images" name="images" multiple accept="image/*" onChange={handleImageChange} className="border rounded p-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="video" className="block mb-2">Video:</label>
                    <input type="file" id="video" name="video" accept="video/*" onChange={handleChange} className="border rounded p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="priceType" className="block mb-2">Price Type:</label>
                    <select id="priceType" name="priceType" className="select select-bordered w-full max-w-xs" value={formData.priceType} onChange={handlePriceTypeChange}>
                        <option value="price">Price</option>
                        <option value="free">Free</option>
                    </select>
                </div>
                {/* Price Amount */}
                {formData.priceType === 'price' && (
                    <div className="mb-4">
                        <label htmlFor="priceAmount" className="block mb-2">Price Amount:</label>
                        <input type="number" id="priceAmount" name="priceAmount" value={formData.priceAmount} onChange={handleChange} className="border rounded p-2 w-full" required />
                    </div>
                )}
                {formData.priceType === 'free' && (
                    <div className="mb-4">
                        <label htmlFor="currierBy" className="block mb-2">Currier Charge:</label>
                        <select id="currierBy" name="currierBy" className="select select-bordered w-full max-w-xs" value={formData.priceType} onChange={handlePriceTypeChange}>
                            <option value="meetUpLocation">Meetup Location</option>
                            <option value="currier">Currier</option>
                        </select>
                    </div>
                )}
                {/* Meet Up Location */}
                {formData.priceType === 'free' && (
                    <div className="mb-4">
                        <label htmlFor="meetUpLocation" className="block mb-2">Meet Up Location:</label>
                        <input type="text" id="meetUpLocation" name="meetUpLocation" value={formData.meetUpLocation} onChange={handleChange} className="border rounded p-2 w-full" required />
                    </div>
                )}
                {/* Currier Charge
                {formData.priceType === 'free' && (
                    <div className="mb-4">
                        <label htmlFor="currierCharge" className="block mb-2">Currier Charge:</label>
                        <input type="text" id="currierCharge" name="currierCharge" value={formData.currierCharge} onChange={handleChange} className="border rounded p-2 w-full" required />
                    </div>
                )} */}
                {/* Currier By */}
                {formData.priceType === 'free' && (
                    <div className="mb-4">
                        <label htmlFor="currierBy" className="block mb-2">Currier Charge:</label>
                        <select id="currierBy" name="currierBy" className="select select-bordered w-full max-w-xs" value={formData.priceType} onChange={handlePriceTypeChange}>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </div>

                )}
                <div className="mb-4">
                        
                        <input type="text" id="currierBy" name="currierBy" value={formData.currierBy} onChange={handleChange} className="border rounded p-2 w-full" required />
                    </div>
                {/* Additional fields based on price */}
                {formData.price === 'free' && (
                    <div className="mb-4">
                        <label htmlFor="meetUpLocation" className="block mb-2">Meet Up Location:</label>
                        <input type="text" id="meetUpLocation" name="meetUpLocation" value={formData.meetUpLocation} onChange={handleChange} className="border rounded p-2 w-full" required />
                    </div>
                )}
                {formData.price === 'currier' && (
                    <div className="mb-4">
                        <label htmlFor="currierCharge" className="block mb-2">Currier Charge:</label>
                        <input type="text" id="currierCharge" name="currierCharge" value={formData.currierCharge} onChange={handleChange} className="border rounded p-2 w-full" required />
                        <label className="block mb-2">Currier By:</label>
                        <select id="currierBy" name="currierBy" value={formData.currierBy} onChange={handleChange} className="border rounded p-2 w-full" required>
                            <option value="">Select</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="contactNumber" className="block mb-2">Contact Number:</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="productDetails" className="block mb-2">Product Difficulties or Specialties:</label>
                    <textarea id="productDetails" name="productDetails" value={formData.productDetails} onChange={handleChange} className="border rounded p-2 w-full h-32" required />
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                </div>
            </form>
            {/* Preview of form data */}

        </div>
    );
};

export default CreateAd;
