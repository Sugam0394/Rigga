import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Zap, Target, Users } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleStart = () => {
    if (phone.length < 10) return alert('Bhai, sahi number daal!');
    localStorage.setItem('phone', phone);
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col justify-between p-6">
      {/* Header */}
      <div className="text-center pt-10">
        <h1 className="text-6xl font-black tracking-tighter text-[#4F46E5]">RIGGA <span className="text-white">💀</span></h1>
        <p className="text-gray-400 mt-2 font-medium">Baate kam, Kaam zyada.</p>
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#3730a3] rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 leading-tight">India's Toughest Accountability Game</h2>
        <p className="opacity-90">Goal set kar, photo upload kar. Pura nahi kiya toh AI tera bura hal karega.[cite: 2]</p>
      </div>

      {/* Steps List */}
      <div className="space-y-6 my-8">
        {[
          { icon: <Target />, t: "Set Goal", d: "Gym, Study, ya No Sugar" },
          { icon: <Zap />, t: "Lock Stake", d: "Embarrassing photo upload kar" },
          { icon: <Users />, t: "Add Witness", d: "Friend tera mazaak udayega" }
        ].map((s, i) => (
          <div key={i} className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-[#4F46E5]">{s.icon}</div>
            <div>
              <h4 className="font-bold">{s.t}</h4>
              <p className="text-xs text-gray-400">{s.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="space-y-4 pb-6">
        <div className="bg-[#2a2a2a] rounded-2xl p-2 flex border border-white/10 focus-within:border-[#4F46E5]">
          <span className="p-3 text-gray-500 font-bold">+91</span>
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="bg-transparent w-full p-3 outline-none font-bold"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button 
          onClick={handleStart}
          className="w-full bg-[#4F46E5] hover:bg-[#4338ca] py-5 rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95"
        >
          START CHALLENGE 🚀
        </button>
      </div>
    </div>
  );
}