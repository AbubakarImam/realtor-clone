import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'
import { useNavigate } from 'react-router';
import SegmentToggle from '../components/ui/SegmentToggle';

const YES_NO = [
    { label: 'Yes', val: true },
    { label: 'No', val: false },
];

const CreateListing = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false)
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
        latitude: 0,
        longitude: 0,
        images: {}
    });
    const { type, name, bedroom, bathroom, parking, furnished, latitude, longitude,
        address, description, offer, regularPrice, discountedPrice, images } = formData;
    const onChange = (e) => {
        let boolean = null;
        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                images: e.target.files
            })
            )
        }
        if (!e.target.files) {
            setFormData((prev) => ({
                ...prev,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (+discountedPrice >= +regularPrice) {
            setLoading(false)
            toast.error('Discounted price needs to be less than regular price')
            return;
        }
        if (images.length > 6) {
            setLoading(false);
            toast.error("maximum of 6 images allowed");
            return
        }
        const storeImage = async (images) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${images.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, images);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            })
        }
        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch((error) => {
            setLoading(false);
            toast.error('Images not uploaded');
            return
        });
        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;
        const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
        setLoading(false);
        toast.success('Listing created')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <main className='max-w-3xl px-4 sm:px-6 mx-auto pb-16'>
            <div className="border-b-2 border-ink pb-4 pt-8 mb-8 px-1">
                <h1 className="text-2xl sm:text-3xl font-semibold text-ink">File a record</h1>
            </div>
            <form onSubmit={onSubmit} className="ledger-card p-5 sm:p-8 space-y-7">
                <div>
                    <p className="field-label mb-2">Listing type</p>
                    <SegmentToggle
                        id="type"
                        value={type}
                        onSelect={onChange}
                        options={[
                            { label: 'Sell', val: 'sale' },
                            { label: 'Rent', val: 'rent' },
                        ]}
                    />
                </div>

                <div>
                    <p className="field-label mb-2">Name</p>
                    <input type="text" id='name' value={name} onChange={onChange} placeholder="e.g. Maple Street Bungalow"
                        required className='ledger-input' />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="field-label mb-2">Beds</p>
                        <input type="number" id='bedroom' value={bedroom} onChange={onChange}
                            min='1' max="50" required className='ledger-input text-center' />
                    </div>
                    <div>
                        <p className="field-label mb-2">Baths</p>
                        <input type="number" id='bathroom' value={bathroom} onChange={onChange}
                            min='1' max="50" required className='ledger-input text-center' />
                    </div>
                </div>

                <div>
                    <p className="field-label mb-2">Parking spot</p>
                    <SegmentToggle id="parking" value={parking} onSelect={onChange} options={YES_NO} />
                </div>

                <div>
                    <p className="field-label mb-2">Furnished</p>
                    <SegmentToggle id="furnished" value={furnished} onSelect={onChange} options={YES_NO} />
                </div>

                <div>
                    <p className="field-label mb-2">Address</p>
                    <textarea id='address' value={address}
                        onChange={onChange} placeholder="Address" required className='ledger-input' />
                </div>

                {!geolocationEnabled && (
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="field-label mb-2">Latitude</p>
                            <input type="number" value={latitude} id="latitude"
                                onChange={onChange} required min={-90} max={90}
                                className='ledger-input text-center' />
                        </div>
                        <div>
                            <p className="field-label mb-2">Longitude</p>
                            <input type="number" value={longitude} id="longitude"
                                onChange={onChange} required min={-180} max={180}
                                className='ledger-input text-center' />
                        </div>
                    </div>
                )}

                <div>
                    <p className="field-label mb-2">Description</p>
                    <textarea id='description' value={description}
                        onChange={onChange} placeholder="Description" required className='ledger-input' />
                </div>

                <div>
                    <p className="field-label mb-2">Offer / discount</p>
                    <SegmentToggle id="offer" value={offer} onSelect={onChange} options={YES_NO} />
                </div>

                <div>
                    <p className="field-label mb-2">Regular price</p>
                    <div className="flex items-center gap-4">
                        <input type="number" id='regularPrice' value={regularPrice}
                            onChange={onChange} min="50" max="400000000000" required
                            className='ledger-input text-center' />
                        {type === 'rent' && (
                            <p className="text-sm text-ink-faint whitespace-nowrap">$ / Month</p>
                        )}
                    </div>
                </div>

                {offer && (
                    <div>
                        <p className="field-label mb-2">Discounted price</p>
                        <div className="flex items-center gap-4">
                            <input type="number" id='discountedPrice' value={discountedPrice}
                                onChange={onChange} min="50" max="400000000000" required={offer}
                                className='ledger-input text-center' />
                            {type === 'rent' && (
                                <p className="text-sm text-ink-faint whitespace-nowrap">$ / Month</p>
                            )}
                        </div>
                    </div>
                )}

                <div>
                    <p className="field-label mb-1">Images</p>
                    <p className="text-sm text-ink-faint mb-2">The first image will be the cover (max 6)</p>
                    <input type="file"
                        id='images' onChange={onChange} accept=".jpg,.png,.jpeg" multiple required
                        className='ledger-input file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:font-mono file:text-xs file:font-semibold file:uppercase file:tracking-stamped file:bg-ink file:text-paper hover:file:bg-ink/90' />
                </div>

                <button type='submit' className='w-full px-7 py-3 bg-stamp text-paper
                font-mono font-semibold text-xs uppercase tracking-stamped rounded-sm shadow-stamp
                hover:bg-stamp-dark transition-colors duration-150 ease-in-out'>
                    File this record
                </button>
            </form>
        </main>
    )
}

export default CreateListing
