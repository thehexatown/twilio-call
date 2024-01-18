import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [phone, setPhone] = useState<string | undefined>('');

  const handleCall = async () => {
    try {
      const response = await fetch('/api/make-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error('Error making API call')
      }
    } catch (error) {
      toast.error('Error making API call')
    }
  };


  return (
    <main className='h-screen bg-blue-100 flex items-center'>
      <div className='max-w-md mx-auto space-y-8'>
        <PhoneInput
          defaultCountry='pk'
          value={phone}
          onChange={(enteredPhone) => setPhone(enteredPhone)}
        />

        <button
          onClick={handleCall}
          type='submit'
          className='w-full rounded-xl flex justify-center p-2 bg-white border-2 border-blue-600'
        >
          Call
        </button>
        <ToastContainer />
      </div>
    </main>
  );
}

