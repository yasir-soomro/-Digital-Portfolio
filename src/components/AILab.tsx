import { useState } from 'react';
import { motion } from 'motion/react';
import { generateImage, generateVideo, analyzeMedia, chatThinking, chatFast, generateSpeech } from '../lib/gemini';
import { Loader2, Image as ImageIcon, Video, Brain, Zap, Mic, Upload } from 'lucide-react';

type Tab = 'image' | 'video' | 'analyze' | 'chat';

export default function AILab() {
  const [activeTab, setActiveTab] = useState<Tab>('image');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Inputs
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (activeTab === 'image') {
        const res = await generateImage(prompt, aspectRatio, imageSize);
        setResult(res);
      } else if (activeTab === 'video') {
        const res = await generateVideo(prompt, aspectRatio);
        setResult(res);
      } else if (activeTab === 'analyze') {
        if (!file) throw new Error('Please upload an image or video');
        const base64 = filePreview?.split(',')[1];
        if (!base64) throw new Error('File processing failed');
        const res = await analyzeMedia(prompt || 'Describe this media', base64, file.type);
        setResult(res || 'No analysis returned');
      } else if (activeTab === 'chat') {
        // Simple heuristic: if prompt contains "think", use thinking model
        if (prompt.toLowerCase().includes('think') || prompt.length > 50) {
          const res = await chatThinking(prompt);
          setResult(res || 'No response');
        } else {
          const res = await chatFast(prompt);
          setResult(res || 'No response');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async () => {
    if (!result || activeTab === 'image' || activeTab === 'video') return;
    try {
      const audioUrl = await generateSpeech(result);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error('TTS failed', err);
    }
  };

  return (
    <section id="ai-lab" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4">
          AI <span className="text-[var(--accent)] neon-text">Laboratory</span>
        </h2>
        <p className="text-base sm:text-xl opacity-60 max-w-2xl mx-auto">
          Experimenting with the latest generative models.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: 'image', icon: ImageIcon, label: 'Image Gen' },
            { id: 'video', icon: Video, label: 'Video Gen' },
            { id: 'analyze', icon: Brain, label: 'Analyze' },
            { id: 'chat', icon: Zap, label: 'Chat & Think' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as Tab); setResult(null); setError(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-[var(--accent)] text-black font-bold' 
                  : 'glass hover:bg-[var(--glass-border)]'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {activeTab === 'analyze' && (
            <div className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-8 text-center hover:border-[var(--accent)] transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {filePreview ? (
                file.type.startsWith('video') ? (
                  <video src={filePreview} className="max-h-48 mx-auto rounded-lg" controls />
                ) : (
                  <img src={filePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                )
              ) : (
                <div className="flex flex-col items-center gap-2 opacity-60">
                  <Upload size={32} />
                  <span>Upload Image or Video</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                activeTab === 'image' ? "A futuristic city with flying cars..." :
                activeTab === 'video' ? "A neon hologram of a cat driving..." :
                activeTab === 'analyze' ? "Describe what's happening in this image..." :
                "Ask me anything..."
              }
              className="w-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors resize-none h-32"
            />
            
            {activeTab === 'image' && (
              <div className="flex flex-wrap gap-4">
                <select 
                  value={aspectRatio} 
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-lg px-3 py-2 outline-none"
                >
                  <option value="1:1">1:1 (Square)</option>
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="4:3">4:3</option>
                  <option value="3:4">3:4</option>
                </select>
                <select 
                  value={imageSize} 
                  onChange={(e) => setImageSize(e.target.value)}
                  className="bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-lg px-3 py-2 outline-none"
                >
                  <option value="1K">1K</option>
                  <option value="2K">2K</option>
                  <option value="4K">4K</option>
                </select>
              </div>
            )}

             {activeTab === 'video' && (
              <div className="flex flex-wrap gap-4">
                <select 
                  value={aspectRatio} 
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-lg px-3 py-2 outline-none"
                >
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                </select>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || (!prompt && !file)}
            className="w-full py-4 rounded-xl bg-[var(--accent)] text-black font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
            Generate / Analyze
          </button>

          {/* Results */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200">
              {error}
            </div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)]"
            >
              {activeTab === 'image' ? (
                <img src={result} alt="Generated" className="w-full rounded-lg" />
              ) : activeTab === 'video' ? (
                <video src={result} controls className="w-full rounded-lg" autoPlay loop />
              ) : (
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-[var(--text-primary)]">{result}</p>
                  <button 
                    onClick={handleTTS}
                    className="mt-4 flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
                  >
                    <Mic size={16} /> Listen to response
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
