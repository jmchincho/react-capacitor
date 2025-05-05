import React, { useEffect, useRef, useState } from 'react';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import {Capacitor} from "@capacitor/core";

export interface VideoProps {
    urlVideo: string;
    urlPoster: string;
    title: string;
    posterAlt: string;
    className?: string;
    onPause?: (value: boolean) => void;
}

const Video: React.FC<VideoProps> = ({
                                         urlVideo,
                                         urlPoster,
                                         title,
                                         posterAlt,
                                         className,
                                         onPause
                                     }) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const [showPoster, setShowPoster] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const videoPlayerId = 'fullscreen-player';

    const initPlayer = async () => {
        if (!playerRef.current) return;

        await CapacitorVideoPlayer.initPlayer({
            mode: 'fullscreen',
            url: urlVideo,
            playerId: videoPlayerId,
            componentTag: 'video-player',
            title,
        });


    };


    return (
        <div className={`relative w-full h-full ${className}`} ref={playerRef}>
            {showPoster && (
                <div className="absolute inset-0 z-10 bg-black">
                    <img
                        src={urlPoster}
                        alt={posterAlt}
                        className="w-full h-full object-cover"
                    />
                    <button
                        className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-50"
                        onClick={initPlayer}
                    >
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
};

export default Video;
export { Video };
