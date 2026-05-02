import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../services/api';
import { ArrowLeft, Camera, Calendar, UserCheck } from 'lucide-react';

export default function CreateTask() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: localStorage.getItem('phone') || '',
    goal: '',
    stakeType: 'photo',
    stakeUrl: '',
    witness: { name: '', phone: '' },
    deadline: '',
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, stakeUrl: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!form.goal || !form.stakeUrl || !form.witness.phone || !form.deadline) {
      return alert('Bhai, saari fields bharna zaroori hai!');
    }
    
    setLoading(true);
    try {
      await taskService.createTask({
        ...form,
        deadline: new Date(form.deadline).toISOString(),
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Task create nahi hua'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      <button onClick={() => navigate('/')} className="mb-6 opacity-50 hover:opacity-100 flex items-center">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <h2 className="text-3xl font-black mb-8 tracking-tight">NEW CHALLENGE 🔐</h2>

      <div className="space-y-6 pb-24">
        {/* Goal Input */}
        <div className="bg-[#2a2a2a] p-5 rounded-3xl border border-white/5">
          <label className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest">Goal Kya Hai?</label>
          <input 
            type="text" 
            placeholder="e.g. 6AM Gym, No Sugar" 
            className="w-full bg-transparent border-b border-gray-700 py-3 outline-none focus:border-[#4F46E5] transition-all"
            onChange={(e) => setForm({...form, goal: e.target.value})}
          />
        </div>

        {/* Stake Upload */}
        <div className="bg-[#2a2a2a] p-5 rounded-3xl border border-white/5">
          <label className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-3 block">Stake (Your Secret Photo)</label>
          <div className="relative h-48 bg-black rounded-2xl border-2 border-dashed border-gray-800 flex flex-col items-center justify-center overflow-hidden">
            {form.stakeUrl ? (
              <img src={form.stakeUrl} className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera className="text-gray-600 mb-2" />
                <p className="text-xs text-gray-500 text-center px-4">Upload a photo that will be sent to your witness if you fail.</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>

        {/* Witness Details */}
        <div className="bg-[#2a2a2a] p-5 rounded-3xl border border-white/5 space-y-4">
          <label className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest">Witness (Kaun Nazar Rakhega?)</label>
          <div className="flex items-center space-x-3 bg-black/30 p-3 rounded-xl">
            <UserCheck size={18} className="text-gray-500" />
            <input 
              type="text" placeholder="Witness Name" 
              className="bg-transparent w-full outline-none text-sm"
              onChange={(e) => setForm({...form, witness: {...form.witness, name: e.target.value}})}
            />
          </div>
          <div className="flex items-center space-x-3 bg-black/30 p-3 rounded-xl">
            <span className="text-gray-500 text-sm font-bold">+91</span>
            <input 
              type="tel" placeholder="Witness Phone" 
              className="bg-transparent w-full outline-none text-sm"
              onChange={(e) => setForm({...form, witness: {...form.witness, phone: e.target.value}})}
            />
          </div>
        </div>

        {/* Deadline */}
        <div className="bg-[#2a2a2a] p-5 rounded-3xl border border-white/5">
          <label className="text-xs font-bold text-[#4F46E5] uppercase tracking-widest mb-3 block">Khatam Kab Karna Hai?</label>
          <div className="flex items-center space-x-3">
            <Calendar size={18} className="text-[#4F46E5]" />
            <input 
              type="datetime-local" 
              className="bg-transparent w-full outline-none text-sm p-2"
              onChange={(e) => setForm({...form, deadline: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="fixed bottom-6 left-6 right-6 max-w-[402px] mx-auto">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#4F46E5] py-5 rounded-2xl font-black text-xl shadow-[0_10px_20px_rgba(79,70,229,0.3)] disabled:opacity-50 active:scale-95 transition-all"
        >
          {loading ? 'LOCKING IT IN...' : 'LOCK CHALLENGE 🔐'}
        </button>
      </div>
    </div>
  );
}