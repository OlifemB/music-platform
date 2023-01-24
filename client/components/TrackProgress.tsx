import React from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    step?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, step, onChange}) => {
    return (
        <div style={{display: 'flex'}}>
            <input
                style={{flex: '1'}}
                type="range"
                min={0}
                max={right}
                value={left}
                step={step}
                onChange={onChange}
            />
            {/*<div>*/}
            {/*    {left} / {right}*/}
            {/*</div>*/}
        </div>
    );
};

export default TrackProgress;