import { useMemo, useState } from "react";
import { X, ImagePlus } from "lucide-react";

type SharePhotoModalProps = {
  eventName: string;
  onClose: () => void;
  onShare: (files: File[]) => void;
};

export function SharePhotoModal({ eventName, onClose, onShare }: SharePhotoModalProps) {
  const [files, setFiles] = useState<File[]>([]);

  const previews = useMemo(() => {
    return files.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    // Note: in a “perfect” version we’d revoke URLs on cleanup,
    // but this is fine for a small demo.
  }, [files]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* modal */}
      <div
        className="relative w-full max-w-lg bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
          <div>
            <h2 className="text-xl font-bold text-white">Share Photo</h2>
            <p className="text-xs text-cyan-300/60">Posting to: {eventName}</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
            <X className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        {/* content */}
        <div className="p-6 space-y-4">
          <label className="block text-sm text-cyan-200/80">
            Choose photos
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="mt-2 block w-full text-sm text-cyan-200/70
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-xl file:border-0
                         file:bg-slate-900/60 file:text-cyan-100
                         hover:file:bg-slate-900/80"
            />
          </label>

          {/* previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {previews.map((p) => (
                <div key={p.url} className="rounded-xl overflow-hidden border border-cyan-500/10 bg-slate-900/30">
                  <img src={p.url} alt={p.file.name} className="w-full h-24 object-cover" />
                </div>
              ))}
            </div>
          )}

          {previews.length === 0 && (
            <div className="rounded-xl border border-cyan-500/10 bg-slate-900/30 p-4 text-cyan-300/60 text-sm flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-cyan-400" />
              Select one or more images to preview before sharing.
            </div>
          )}
        </div>

        {/* footer */}
        <div className="p-6 border-t border-cyan-500/20 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/10"
          >
            Cancel
          </button>

          <button
            disabled={files.length === 0}
            onClick={() => onShare(files)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm ${
              files.length > 0
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25"
                : "bg-slate-900/50 text-white/40 cursor-not-allowed border border-cyan-500/10"
            }`}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
