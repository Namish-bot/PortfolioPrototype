import React, { useState, useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

const API_URL = "http://127.0.0.1:8000/guestbook";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function GuestBook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      setError("Failed to load guest book entries.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    let drawing = null;
    if (canvasRef.current) {
      drawing = await canvasRef.current.exportImage("png");
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, drawing }),
      });
      if (!res.ok) throw new Error("Failed to submit entry.");
      setName("");
      setMessage("");
      if (canvasRef.current) canvasRef.current.clearCanvas();
      fetchEntries();
    } catch (err) {
      setError("Failed to submit entry.");
    }
    setSubmitting(false);
  };

  const handleDownload = async (entry, asPDF = false) => {
    const card = document.getElementById(`guestbook-entry-${entry.id}`);
    if (!card) return;
    const canvas = await html2canvas(card);
    if (asPDF) {
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(canvas, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`guestbook-entry-${entry.id}.pdf`);
    } else {
      const link = document.createElement("a");
      link.download = `guestbook-entry-${entry.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <section id="guestbook" className="mt-32 c-space">
      <h2 className="text-heading mb-2 text-center">Guest Book</h2>
      <p className="text-lg text-neutral-300 mb-8 text-center">Share a message or a doodle—your words and art will inspire future visitors!</p>
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-midnight to-navy/80 border border-white/10 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto flex flex-col gap-6 mb-16"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <input
            className="flex-1 px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-royal"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="flex-1 px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-royal"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={2}
          />
        </div>
        <div>
          <label className="block text-neutral-300 mb-2">Draw something (optional):</label>
          <div className="rounded-lg overflow-hidden border border-white/10 bg-storm" style={{ width: 320, height: 200 }}>
            <ReactSketchCanvas
              ref={canvasRef}
              width={320}
              height={200}
              strokeWidth={4}
              strokeColor="#00FF00"
              backgroundColor="transparent"
              style={{ borderRadius: 12 }}
            />
          </div>
          <button
            type="button"
            className="mt-2 px-3 py-1 rounded bg-royal text-white font-bold hover:bg-indigo"
            onClick={() => canvasRef.current && canvasRef.current.clearCanvas()}
          >
            Clear Drawing
          </button>
        </div>
        {error && <p className="text-red-400 font-bold">{error}</p>}
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-royal text-white font-bold hover:bg-indigo transition-colors duration-200 shadow self-end"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Sign Guest Book"}
        </button>
      </form>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Messages & Drawings</h3>
      {loading ? (
        <p className="text-neutral-400 text-center">Loading entries...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              id={`guestbook-entry-${entry.id}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(92,51,204,0.25)" }}
              className="relative bg-gradient-to-br from-midnight to-navy/80 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col w-full max-w-xs min-h-[320px] transition-transform duration-300 hover:shadow-2xl"
            >
              <div className="flex flex-col flex-1 p-6">
                <h4 className="text-lg font-bold text-white mb-1">{entry.name}</h4>
                <p className="text-neutral-300 mb-4">{entry.message}</p>
                {entry.drawing_filename && (
                  <img
                    src={`http://127.0.0.1:8000/guestbook_backend/drawings/${entry.drawing_filename}`}
                    alt="Drawing"
                    className="rounded-lg border border-white/10 bg-storm object-contain w-full h-32 mb-2"
                  />
                )}
                <span className="text-xs text-neutral-500 mt-auto">
                  {new Date(entry.created_at).toLocaleString()}
                </span>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 rounded bg-royal text-white font-bold hover:bg-indigo"
                    onClick={() => handleDownload(entry, false)}
                  >
                    Download Image
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-royal text-white font-bold hover:bg-indigo"
                    onClick={() => handleDownload(entry, true)}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
} 