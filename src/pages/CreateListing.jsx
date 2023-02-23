import React, { useState } from 'react'

const CreateListing = () => {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedroom: 1,
        bathroom: 1,
        parking: false,
        furnished: false,
        address: '',
        description: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
    });
    const { type, name, bedroom, bathroom, parking, furnished,
        address, description, offer, regularPrice, discountedPrice } = formData;
    const onChange = () => { }
    return (
        <main className='max-w-6xl px-6 mx-auto'>
            <h1 className="text-3xl text-center mt-6 font-bold">
                Create a Listing
            </h1>
            <form>
                <p className="text-lg mt-6 font-semibold">
                    Sell / Rent
                </p>
                <div className="flex">
                    <button type='button' id='type' value='sale' onClick={onChange}
                        className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${type === 'rent' ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        sell
                    </button>
                    <button type='button' id='type' value='sale' onClick={onChange}
                        className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${type === 'sale' ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        rent
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Name</p>
                <input type="text" id='name' value={name} onChange={onChange} placeholder="address"
                    required className='w-full px-4 py-2 text-xl
                        text-gray-700 bg-white border border-gray-300 rounded transition
                        duration-150 ease-in-out focus:text-gray-700 focus:bg-white 
                        focus:border-slate-600 mb-6' />
                <div className="flex space-x-6">
                    <div className="">
                        <p className="w-full text-lg font-semibold">Beds</p>
                        <input type="number" id='bedroom' value={bedroom} onChange={onChange}
                            min='1' max="50" required className='px-4 py-2 text-xl text-gray-700 bg-white
                        border border-gray-300 text-center rounded transition duration-150 ease-in-out focus:border-slate-600'/>
                    </div>
                    <div className="">
                        <p className="w-full text-lg font-semibold">Baths</p>
                        <input type="number" id='bathroom' value={bathroom} onChange={onChange}
                            min='1' max="50" required className='px-4 py-2 text-xl text-gray-700 bg-white
                        border border-gray-300 text-center rounded transition duration-150 ease-in-out focus:border-slate-600'/>
                    </div>
                </div>
                <p className="text-lg mt-6 font-semibold">
                    Parking Spot
                </p>
                <div className="flex">
                    <button type='button' id='parking' value={true} onClick={onChange}
                        className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${!parking ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        yes
                    </button>
                    <button type='button' id='parking' value={false} onClick={onChange}
                        className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${parking ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        No
                    </button>
                </div>
                <p className="text-lg mt-6 font-semibold">
                    Furnished
                </p>
                <div className="flex">
                    <button type='button' id='furnished' value={true} onClick={onChange}
                        className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${!furnished ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        yes
                    </button>
                    <button type='button' id='furnished' value={false} onClick={onChange}
                        className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${furnished ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        No
                    </button>
                </div>
                <p className='text-lg mt-6 font-semibold'>Address</p>
                <textarea type="text" id='address' value={address}
                    onChange={onChange} placeholder="Name" required className='w-full px-4 py-2 text-xl
                        text-gray-700 bg-white border border-gray-300 rounded transition
                        duration-150 ease-in-out focus:text-gray-700 focus:bg-white 
                        focus:border-slate-600 mb-6' />
                <p className='text-lg font-semibold'>Description</p>
                <textarea type="text" id='description' value={description}
                    onChange={onChange} placeholder="description" required className='w-full px-4 py-2 text-xl
                        text-gray-700 bg-white border border-gray-300 rounded transition
                        duration-150 ease-in-out focus:text-gray-700 focus:bg-white 
                        focus:border-slate-600 mb-6' />
                <p className="text-lg font-semibold">
                    Offer
                </p>
                <div className="flex mb-6">
                    <button type='button' id='offer' value={true} onClick={onChange}
                        className={`mr-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${!offer ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        yes
                    </button>
                    <button type='button' id='offer' value={false} onClick={onChange}
                        className={`ml-3 w-full px-7 py-3 font-medium text-sm uppercase shadow-md
                    rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition
                    duration-150 ease-in-out ${offer ? "bg-white text-black" :
                                "bg-slate-600 text-white"}`}>
                        No
                    </button>
                </div>
                <div className="flex mb-6">
                    <div className="">
                        <p className="text-lg font-semibold">Regular price</p>
                        <div className="flex w-full items-center space-x-6 ">
                            <input type="number" id='regularPrice' value={regularPrice}
                                onChange={onChange} min="50" max="400000000000" required
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white
                            border border-gray-300 rounded transition duration-150 ease-in-out
                            focus:text-gray-700 focus:bg-white focus:border-slate-600
                            text-center' />
                            {type === 'rent' && (
                                <div className="">
                                    <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {offer && (
                    <div className="flex mb-6">
                        <div className="">
                            <p className="text-lg font-semibold">Discounted price</p>
                            <div className="flex w-full items-center space-x-6 ">
                                <input type="number" id='discountedPrice' value={discountedPrice}
                                    onChange={onChange} min="50" max="400000000000" required={offer}
                                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white
                            border border-gray-300 rounded transition duration-150 ease-in-out
                            focus:text-gray-700 focus:bg-white focus:border-slate-600
                            text-center' />
                                {type === 'rent' && (
                                    <div className="">
                                        <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div className="mb-6">
                    <p className='text-lg font-semibold'>Images</p>
                    <p className='text-gray-600'>The first image wil be the cover (max 6)</p>
                    <input type="file"
                        id='images' onChange={onChange} accept=".jpg,.png,.jpeg" multiple required
                        className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300
                        rounded transition duration-150 ease-in-out focus:bg-slate-600' />
                </div>
                <button type='submit' className='mb-6 w-full px-7 py-3 bg-blue-600 text-white
                font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition
                duration-150 ease-in-out'>
                    create listing
                </button>
            </form>
        </main>
    )
}

export default CreateListing