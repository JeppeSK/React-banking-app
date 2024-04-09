import { useState, useEffect } from 'react';

function useFetchCreditInformation() {
    const [creditInfo, setCreditInfo] = useState({
        expiryDate: null,
        serialNumber: null,
        CVV: null,
    });

    useEffect(() => {
        async function fetchCreditDetails() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3001/api/user/account/creditcard/details', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }

                const data = await response.json();
                setCreditInfo({
                    serialNumber: data.serialNumber,
                    CVV: data.cvv,
                    expiryDate: data.expiryDate,
                });
            } catch (error) {
                console.error('There was a problem fetching the credit card information:', error);
                // You could update the state to indicate an error here, if desired
            }
        }

        fetchCreditDetails();
    }, []);

    return creditInfo;
}

export default useFetchCreditInformation;