import { useState } from 'react';
import './uploadContainer.css'

import leaf1 from '../../../../assets/images/ChatGPT Image Apr 12, 2025, 07_56_03 PM.png'
import leaf2 from '../../../../assets/images/ChatGPT Image Apr 12, 2025, 07_54_39 PM.png'
import tile1 from '../../../../assets/images/Logo.png'

/*
                        <div className="form-group">
                            <label htmlFor="text4">UPLOADER</label>
                            <input className='inputsama'
                                type="text"
                                id="text4"
                                name="text4"
                                value={formData.text4}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
*/

function App() {
    // Szöveges mezők állapota
    const [formData, setFormData] = useState({
        text1: '',
        text2: '',
        text3: '',
        text4: '',
        dropdown: 'option1', // Alapértelmezett érték
    });

    // Fájlok állapota
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    // Szöveges mezők változásának kezelése
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fájlfeltöltés kezelése
    const handleFileChange = (e, fileNumber) => {
        const file = e.target.files[0];
        if (fileNumber === 1) {
            setFile1(file);
        } else {
            setFile2(file);
        }
    };

    // Űrlap elküldése
    const handleSubmit = (e) => {
        e.preventDefault();

        // Itt dolgozd fel az adatokat
        console.log('Szöveges adatok:', formData);
        console.log('Első fájl:', file1);
        console.log('Második fájl:', file2);

        // Küldés szerverre vagy további feldolgozás
    };

    return (
        <>
            <div className="backgroundBox"></div>

            <form className="sUploadContainer" onSubmit={handleSubmit}>
                <h2 className='bigahhtext'>Upload Your Song</h2>
                <img className='leaf1' src={leaf1} alt="" />
                <img className='leaf2' src={leaf2} alt="" />
                <img className='leaf3' src={leaf2} alt="" />
                <img className='tile1' src={tile1} alt="" />
                <div className="formLeft">
                    <div id='inputT1' className="form-group">
                        <label htmlFor="text1">SONG TITLE</label>
                        <input className='inputsama'
                            type="text"
                            id="text1"
                            name="text1"
                            value={formData.text1}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text2">ARTIST NAME</label>
                        <input className='inputsama'
                            type="text"
                            id="text2"
                            name="text2"
                            value={formData.text2}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text3">ALBUM NAME</label>
                        <input className='inputsama'
                            type="text"
                            id="text3"
                            name="text3"
                            value={formData.text3}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                </div>

                <div className="formRight">
                    <div className="form-group">
                        <label htmlFor="dropdown">GENRE</label>
                        <select className='inputsama'
                            id="dropdown"
                            name="dropdown"
                            value={formData.dropdown}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="option1">Első lehetőség</option>
                            <option value="option2">Második lehetőség</option>
                            <option value="option3">Harmadik lehetőség</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="file1">SONG IMAGE <p className='max5'>max. 5mb</p></label>
                        <input className='uploadFile'
                            type="file"
                            id="file1"
                            onChange={(e) => handleFileChange(e, 1)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file2">MP3 FILE OF THE SONG</label>
                        <input className='uploadFile'
                            type="file"
                            id="file2"
                            onChange={(e) => handleFileChange(e, 2)}
                            required
                        />
                    </div>
                </div>

                <button className='bigahhbutton' type="submit">UPLOAD SONG</button>
            </form>

        </>
    )
}

export default App