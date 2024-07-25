import '@vidstack/react/player/styles/default/theme.css';

import { MediaPlayer, MediaProvider, PlayButton, TimeSlider } from '@vidstack/react';
import {PauseIcon, PlayIcon} from "@vidstack/react/icons";

const VideoPlayer = () => {
    return (
        <div>
            {/*<MediaPlayer controls={true} muted={true}  title="Sprite Fight" src="https://s3.eu-central-2.wasabisys.com/codelorian-video/flexiones.mp4?AWSAccessKeyId=QGIXNEX2ME9OE0T1GP0W&Expires=1721944597&Signature=RgFEl6xqNAK5aAOH0XEAlQ%2FOO1Q%3D">*/}
            {/*    <MediaProvider  />*/}
            {/*</MediaPlayer>*/}
            <MediaPlayer muted={true} controls={false} title="Sprite Fight" src="youtube/_ifxX0U-xrM">
                <MediaProvider  />
                <PlayButton className="vds-button">
                    <PlayIcon className="play-icon vds-icon" />
                    <PauseIcon className="pause-icon vds-icon" />
                </PlayButton>
                <TimeSlider.Root className="vsds-time-slider vds-slider">
                    <TimeSlider.Track className="vds-slider-track" />
                    <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                    <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
                    <TimeSlider.Thumb className="vds-slider-thumb" />
                </TimeSlider.Root>

            </MediaPlayer>

        </div>
    );
};

export default VideoPlayer;
