import axios from 'axios';
import React, { useEffect, useState } from 'react';

const specialtyColorMap = {
    Cardiology: 'text-red-600 font-bold',
    Neurology: 'text-blue-600 font-bold',
    Pediatrics: 'text-green-600 font-bold',
    Orthopedics: 'text-purple-600 font-bold',
    Urology: 'text-pink-600 font-bold',
    Gastroenterology: 'text-cyan-500 font-bold',
    Ophthalmology: 'text-yellow-400 font-bold'
};

function Table() {
    const [userdata, setUserdata] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiToken = process.env.REACT_APP_API_TOKEN;
        const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID;

        axios.get(`https://api.lowcodeapi.com/googlesheets/spreadsheetid/get?spreadsheetId=${spreadsheetId}&gid=0&tab=tabledata&api_token=${apiToken}`)
            .then((res) => {
                console.log(res.data.result.data);
                setUserdata(res.data.result.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data.');
            });
    }, []);

    return (
        <>
            <div className='text-3xl font-bold text-center m-6'>______ Rendering Doctor's Data ______</div>
            <div className='overflow-x-auto'>
                {error ? (
                    <div className='text-center text-red-600'>{error}</div>
                ) : (
                    <table className='min-w-full bg-white'>
                        <thead className='bg-gray-900 text-white'>
                            <tr>
                                <th className='py-2 px-4 border'>DoctorID</th>
                                <th className='py-2 px-4 border'>FirstName</th>
                                <th className='py-2 px-4 border'>LastName</th>
                                <th className='py-2 px-4 border'>Specialty</th>
                                <th className='py-2 px-4 border'>Address</th>
                                <th className='py-2 px-4 border'>Years Of Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userdata.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    <td className='py-2 px-4 border'>{item.DoctorID}</td>
                                    <td className='py-2 px-4 border'>{item.FirstName}</td>
                                    <td className='py-2 px-4 border'>{item.LastName}</td>
                                    <td className={`py-2 px-4 border ${specialtyColorMap[item.Specialty] || ''}`}>
                                        {item.Specialty}
                                    </td>
                                    <td className='py-2 px-4 border'>{item.Address}</td>
                                    <td className='py-2 px-4 border'>{item['Years Of Experience']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default Table;
