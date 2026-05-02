import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { ArrowLeft, Flame, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const phone = localStorage.getItem('phone');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await taskService.getHistory(phone);
        setData(res.data);
      } catch (err) {
        
        console.error("History load failed", err);
      }
    };
    fetchHistory();
  }, [phone]);

  if (!data) return <div className="bg-black h-screen text-white flex items-center justify-center font-black">FETCHING YOUR LEGACY...</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 pb-20">
      <button onClick={() => navigate('/dashboard')} className="mb-6 opacity-50 hover:opacity-100 flex items-center">
        <ArrowLeft size={20} className="mr-2" /> Dashboard
      </button>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-5 rounded-[2rem] shadow-lg">
          <Flame size={24} className="mb-2" />
          <h4 className="text-2xl font-black">{data.user.currentStreak}</h4>
          <p className="text-[10px] uppercase font-bold opacity-80">Day Streak</p>
        </div>
        <div className="bg-[#2a2a2a] p-5 rounded-[2rem] border border-white/5">
          <CheckCircle2 size={24} className="mb-2 text-[#4F46E5]" />
          <h4 className="text-2xl font-black">{data.user.completed}</h4>
          <p className="text-[10px] uppercase font-bold opacity-50">Tasks Done</p>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Past Challenges</h3>
      
      {/* Task List */}
      <div className="space-y-4">
        {data.taskBoxes.map((t, i) => (
          <div key={i} className="bg-[#2a2a2a] p-5 rounded-3xl border border-white/5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg">{t.goal}</h4>
              <p className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</p>
            </div>
            {t.status === 'done' ? (
              <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold uppercase">Safe</span>
            ) : (
              <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase italic flex items-center">
                <XCircle size={12} className="mr-1" /> Roasted
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}