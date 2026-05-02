import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import { Trophy, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proofUrl, setProofUrl] = useState('');
  const [verdict, setVerdict] = useState(null);
  const phone = localStorage.getItem('phone');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskService.getActive(phone);
        setTask(data);
      } catch (err) {
        console.error("Task fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [phone]);

  const handleProof = async () => {
    if (!proofUrl) return alert("Photo toh daal bhai!");
    try {
      const res = await taskService.submitProof(task._id, proofUrl);
      setVerdict(res);
      // Success ke baad refresh logic
    } catch (err) {
        console.error("Proof submission failed", err);
      alert("Submission failed");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-black">Loading...</div>;

  if (!task) return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Koi active challenge nahi hai!</h2>
      <button onClick={() => window.location.href='/create'} className="bg-[#4F46E5] px-8 py-4 rounded-2xl font-bold">New Task Start Kar</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 pb-24">
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-8 bg-[#2a2a2a] p-4 rounded-2xl border border-white/5">
        <div className="flex items-center space-x-2">
          <Trophy className="text-yellow-500" size={20} />
          <span className="font-bold">21 DAY STREAK 🔥</span>
        </div>
        <div className="text-xs text-gray-400">Level {task.level}/4</div>
      </div>

      {/* Main Task Card */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#312e81] rounded-[2rem] p-8 mb-8 shadow-[0_20px_50px_rgba(79,70,229,0.2)]">
        <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">Active Goal</label>
        <h2 className="text-4xl font-black mt-2 mb-6 leading-tight">{task.goal}</h2>
        
        <div className="flex items-center space-x-4 bg-black/20 p-4 rounded-2xl">
          <Clock className="text-white/60" />
          <div>
            <p className="text-[10px] uppercase font-bold opacity-60">Deadline</p>
            <p className="font-mono text-lg">{new Date(task.deadline).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Proof Section */}
      <div className="bg-[#2a2a2a] rounded-[2rem] p-6 border border-white/5">
        <h3 className="font-bold mb-4 flex items-center text-orange-400">
          <AlertTriangle size={18} className="mr-2" /> SUBMIT PROOF NOW
        </h3>
        
        <div className="relative h-64 bg-black rounded-2xl mb-4 border-2 border-dashed border-gray-800 flex items-center justify-center overflow-hidden">
          {proofUrl ? (
            <img src={proofUrl} className="w-full h-full object-cover" />
          ) : (
            <p className="text-gray-500 text-sm text-center px-6">Goal pura kiya? Click photo & upload. AI will judge you.</p>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => setProofUrl(reader.result);
              reader.readAsDataURL(file);
            }}
          />
        </div>

        <button 
          onClick={handleProof}
          className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg active:scale-95 transition-all"
        >
          SUBMIT TO AI 📸
        </button>
      </div>

      {/* Verdict Popup (Simulated) */}
      {verdict && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50">
          <div className="bg-[#2a2a2a] p-8 rounded-[2rem] text-center border border-white/10 w-full max-w-sm">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-2">VERDICT IN!</h2>
            <p className="text-gray-400 mb-6 italic">"{verdict.verdict}"</p>
            <button onClick={() => setVerdict(null)} className="w-full bg-[#4F46E5] py-4 rounded-xl font-bold">Thik Hai</button>
          </div>
        </div>
      )}
    </div>
  );
}