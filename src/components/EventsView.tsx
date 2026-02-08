import w1 from "../assets/w1.jpg";
import w2 from "../assets/w2.jpg";
import w3 from "../assets/w3.jpg";
import z1 from "../assets/z1.jpg";
import z2 from "../assets/z2.jpg";
import { useMemo, useState, useEffect, useRef } from "react";
import { SharePhotoModal } from "./SharePhotoModal";
import { Play, Pause, Volume2 } from "lucide-react";

import {
  Camera,
  Clock,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Music,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";

interface EventsViewProps {
  selectedEventId?: string | null;
  onViewEventOnMap?: (eventId: string) => void;
}


interface Event {
  id: string;
  name: string;
  artist: string;
  location: string;
  startTime: string;
  endTime: string;
  status: "live" | "upcoming" | "ended";
  attendees: number;
  gradient: string;
  photoUrl?: string;
  trackTitle?: string;
  trackUrl?: string;
}

interface Photo {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userSchool: string;
  userGradient: string;
  eventId: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;

  imageUrl: string;
}

export function EventsView({ selectedEventId = null }: EventsViewProps) {
const [activeEventId, setActiveEventId] = useState(selectedEventId || "1");
const audioRef = useRef<HTMLAudioElement | null>(null);
const [isPlaying, setIsPlaying] = useState(false);
const [nowPlayingEventId, setNowPlayingEventId] = useState<string | null>(null);
const [progress, setProgress] = useState(0); // 0..1
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);
  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };
  const onTimeUpdate = () => {
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  audio.addEventListener("play", onPlay);
  audio.addEventListener("pause", onPause);
  audio.addEventListener("ended", onEnded);
  audio.addEventListener("timeupdate", onTimeUpdate);

  return () => {
    audio.removeEventListener("play", onPlay);
    audio.removeEventListener("pause", onPause);
    audio.removeEventListener("ended", onEnded);
    audio.removeEventListener("timeupdate", onTimeUpdate);
  };
}, [activeEventId]);
const toggleEventSnippet = async (event: Event) => {
  if (!event.trackUrl) return;

  // create audio once
  if (!audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.9;
  }

  const audio = audioRef.current;

  // if clicking the same event that's currently loaded -> toggle play/pause
  const sameEvent = nowPlayingEventId === event.id;

  if (sameEvent) {
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
    return;
  }

  // switching to a new event
  audio.pause();
  audio.currentTime = 0;
  audio.src = event.trackUrl;

  setNowPlayingEventId(event.id);

  try {
    await audio.play(); // must be triggered by user click
  } catch {
    // if browser blocks, user can click again; you can toast if you want
    setIsPlaying(false);
  }
};

const [isShareOpen, setIsShareOpen] = useState(false);
const [shareTargetEventId, setShareTargetEventId] = useState<string | null>(null);

const [shareForm, setShareForm] = useState({
  title: "",
  location: "",
  when: "",
});

const [file, setFile] = useState<File | null>(null);
const [previewUrl, setPreviewUrl] = useState<string | null>(null);

// create a preview URL for the chosen image
useEffect(() => {
  if (!file) {
    setPreviewUrl(null);
    return;
  }
  const url = URL.createObjectURL(file);
  setPreviewUrl(url);
  return () => URL.revokeObjectURL(url);
}, [file]);


const [events, setEvents] = useState<Event[]>([
  {
    id: "1",
    name: "Main Stage",
    artist: "The Weeknd",
    location: "Central Arena",
    startTime: "8:00 PM",
    endTime: "10:30 PM",
    status: "live",
    attendees: 5420,
    gradient: "from-pink-500 to-purple-500",
    
    trackTitle: "Blinding Lights (Preview)",
    trackUrl: "/audio/weeknd-preview.mp3",
  },
  {
    id: "2",
    name: "VIP Stage",
    artist: "Zara Larsson",
    location: "East Pavilion",
    startTime: "7:30 PM",
    endTime: "9:45 PM",
    status: "live",
    attendees: 3280,
    gradient: "from-cyan-500 to-blue-500",

    trackTitle: "Lush Life (Preview)",
    trackUrl: "/audio/zara-preview.mp3",
  },
  {
    id: "3",
    name: "Side Stage",
    artist: "Adele",
    location: "VIP Lounge",
    startTime: "10:45 PM",
    endTime: "12:00 AM",
    status: "upcoming",
    attendees: 890,
    gradient: "from-purple-500 to-indigo-500",
     trackTitle: "N/A",
    trackUrl: "/audio/adele-preview.mp3",
  },
]);


const [photos, setPhotos] = useState<Photo[]>([     {
      id: "1",
      userId: "u1",
      userName: "Emma Wilson",
      userAvatar: "EW",
      userSchool: "UT at Austin",
      userGradient: "from-cyan-400 to-blue-500",
      eventId: "1",
      caption: "The energy here is insane! 🔥",
      timestamp: "2 min ago",
      likes: 47,
      comments: 8,
      isLiked: false,
      imageUrl: w3,
    },
    {
      id: "2",
      userId: "u2",
      userName: "Jake Thompson",
      userAvatar: "JT",
      userSchool: "UC Berkeley",
      userGradient: "from-purple-400 to-pink-500",
      eventId: "1",
      caption: "Best show of the year hands down",
      timestamp: "5 min ago",
      likes: 89,
      comments: 12,
      isLiked: true,
      imageUrl: w2,
    },
    {
      id: "3",
      userId: "u3",
      userName: "Lisa Chen",
      userAvatar: "LC",
      userSchool: "Stanford University",
      userGradient: "from-green-400 to-emerald-500",
      eventId: "1",
      caption: "Found the perfect spot!",
      timestamp: "8 min ago",
      likes: 34,
      comments: 5,
      isLiked: false,
      imageUrl: w1
    },
    {
      id: "4",
      userId: "u4",
      userName: "Sarah Mitchell",
      userAvatar: "SM",
      userSchool: "MIT",
      userGradient: "from-pink-400 to-purple-500",
      eventId: "2",
      caption: "Zara Larsson just killed it on stage!",
      timestamp: "3 min ago",
      likes: 56,
      comments: 9,
      isLiked: true,
      imageUrl: z1
    },
    {
      id: "5",
      userId: "u5",
      userName: "Mark Davis",
      userAvatar: "MD",
      userSchool: "UCLA",
      userGradient: "from-orange-400 to-red-500",
      eventId: "2",
      caption: "The choreo is next level",
      timestamp: "7 min ago",
      likes: 72,
      comments: 11,
      isLiked: false,
      imageUrl: z2
    },
  ]);

  const activeEvent = events.find((e) => e.id === activeEventId) || events[0];
  const eventPhotos = photos.filter((p) => p.eventId === activeEventId);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Live Events</h2>
          <p className="text-cyan-300/70">
            Share and view real-time moments from the festival
          </p>
        </div>
      <button
  onClick={() => {
    setShareTargetEventId(activeEventId); // share to currently selected event
    setIsShareOpen(true);
  }}
  className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30 rounded-xl text-white font-medium transition-all flex items-center gap-2"
>
  <Camera className="w-5 h-5" />
  Share Photo
</button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => setActiveEventId(event.id)}
            className={`text-left p-5 rounded-2xl border transition-all ${activeEventId === event.id
                ? "bg-slate-800/80 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                : "bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/40"
              }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.gradient} flex items-center justify-center`}
              >
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full">
                {event.status === "live" && (
                  <>
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
                    <span className="text-xs text-pink-200 font-medium">
                      LIVE
                    </span>
                  </>
                )}
                {event.status === "upcoming" && (
                  <span className="text-xs text-cyan-300 font-medium">
                    UPCOMING
                  </span>
                )}
                {event.status === "ended" && (
                  <span className="text-xs text-slate-300 font-medium">
                    ENDED
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{event.name}</h3>
            <p className="text-cyan-300/80 text-sm mb-3">{event.artist}</p>
            <div className="flex items-center gap-4 text-xs text-cyan-300/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.startTime}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {event.attendees.toLocaleString()}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeEvent.gradient} flex items-center justify-center`}
                >
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {activeEvent.artist}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-cyan-300/70">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {activeEvent.location}
                    </span>
                    <span>•</span>
                    <span>
                      {activeEvent.startTime} - {activeEvent.endTime}
                    </span>
                  </div>
                </div>
              </div>
              {activeEvent.status === "live" && (
                <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/40 rounded-xl">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                  <span className="text-pink-200 font-semibold">LIVE NOW</span>
                </div>
                
              )}


            </div>
  {activeEvent.trackUrl && (
  <div className="mt-4 flex items-center gap-3">
    <button
      onClick={() => toggleEventSnippet(activeEvent)}
      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 text-white font-medium transition-all flex items-center gap-2"
    >
      {isPlaying && nowPlayingEventId === activeEvent.id ? (
        <Pause className="w-5 h-5" />
      ) : (
        <Play className="w-5 h-5" />
      )}
      <span>
        {isPlaying && nowPlayingEventId === activeEvent.id ? "Pause" : "Play"} snippet
      </span>
    </button>

    <div className="flex-1">
      <div className="flex items-center gap-2 text-xs text-cyan-300/70 mb-1">
        <Volume2 className="w-4 h-4" />
        <span className="truncate">
          Now playing: {activeEvent.trackTitle ?? "Live Preview"}
        </span>
      </div>

      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
          style={{
            width:
              nowPlayingEventId === activeEvent.id ? `${Math.round(progress * 100)}%` : "0%",
          }}
        />
      </div>
    </div>
  </div>
)}
<br></br>
<br></br>

            {activeEvent.status === "live" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-cyan-400" />
                    Live Photos ({eventPhotos.length})
                  </h4>
                  <p className="text-xs text-cyan-300/60">
                    Photos expire when event ends
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eventPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-slate-900/50 rounded-xl overflow-hidden border border-cyan-500/10 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                        <img
                          src={photo.imageUrl}
                          alt={photo.caption}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white">
                          <Clock className="w-3 h-3" />
                          {photo.timestamp}
                        </div>
                      </div>


                      <div className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${photo.userGradient} flex items-center justify-center text-white font-semibold text-sm ring-2 ring-cyan-400/30 flex-shrink-0`}
                          >
                            {photo.userAvatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-white text-sm">
                                {photo.userName}
                              </p>
                              <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 whitespace-nowrap">
                                {photo.userSchool}
                              </span>
                            </div>
                            <p className="text-sm text-cyan-200/80">
                              {photo.caption}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-3 border-t border-cyan-500/10">
                          <button
                            className={`flex items-center gap-1 text-sm transition-all ${photo.isLiked
                                ? "text-pink-400"
                                : "text-cyan-300/70 hover:text-pink-400"
                              }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${photo.isLiked ? "fill-pink-400" : ""}`}
                            />
                            <span>{photo.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-cyan-300/70 hover:text-cyan-300 transition-all">
                            <MessageCircle className="w-4 h-4" />
                            <span>{photo.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-cyan-300/70 hover:text-cyan-300 transition-all ml-auto">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/30 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2">
                  <Camera className="w-5 h-5" />
                  Share Your Moment
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-cyan-400/50" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">
                  Event Starting Soon
                </h4>
                <p className="text-cyan-300/60 text-sm">
                  Photo sharing will be available when the event goes live
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Event Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-300/70 text-sm">Attendees</span>
                  <span className="text-white font-bold">
                    {activeEvent.attendees.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${activeEvent.gradient} h-full rounded-full transition-all`}
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cyan-300/70 text-sm">Photos Shared</span>
                <span className="text-white font-bold">{eventPhotos.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cyan-300/70 text-sm">Total Likes</span>
                <span className="text-white font-bold">
                  {eventPhotos.reduce((sum, p) => sum + p.likes, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Expiring Content
            </h3>
            <p className="text-purple-200/80 text-sm mb-4">
              All photos from this event will expire 1 hour after it ends.
              Capture the moment while it lasts!
            </p>
            <div className="p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-purple-300/70">Time remaining:</p>
              <p className="text-white font-bold text-lg">2h 43m</p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-4">
              Connect by School
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <span className="text-purple-300">UT at Austin</span>
                <span className="text-white font-bold">24</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <span className="text-cyan-300">UC Berkeley</span>
                <span className="text-white font-bold">18</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="text-green-300">MIT</span>
                <span className="text-white font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
{isShareOpen && shareTargetEventId && (
  <SharePhotoModal
    eventName={events.find((e) => e.id === shareTargetEventId)?.name ?? "Event"}
    onClose={() => {
      setIsShareOpen(false);
      setShareTargetEventId(null);
    }}
    onShare={(files) => {
      const first = files[0];
      if (!first) return;

      const url = URL.createObjectURL(first);

      setPhotos((prev) => [
        {
          id: crypto.randomUUID(),
          userId: "you",
          userName: "Amari Kim",
          userAvatar: "AK",
          userSchool: "UT at Austin",
          userGradient: "from-cyan-400 to-purple-500",
          eventId: shareTargetEventId,
          caption: "Just shared a moment ✨",
          timestamp: "just now",
          likes: 0,
          comments: 0,
          isLiked: false,
          imageUrl: url,
        },
        ...prev,
      ]);

      setIsShareOpen(false);
      setShareTargetEventId(null);
    }}
  />
)}


    </div>
  );
}
