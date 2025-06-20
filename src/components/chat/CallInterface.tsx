import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from 'lucide-react';
import { CallState } from '../../types';
import { Button } from '../ui/Button';

interface CallInterfaceProps {
  callState: CallState;
  onEndCall: () => void;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({
  callState,
  onEndCall
}) => {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (callState.status === 'connected') {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState.status]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (callState.status) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return formatDuration(duration);
      case 'ended':
        return 'Call ended';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
      >
        {/* Call Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={callState.status === 'connecting' ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mb-4"
          >
            <img
              src={callState.participant?.avatar}
              alt={callState.participant?.name}
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          </motion.div>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {callState.participant?.name}
          </h2>
          
          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
            {callState.type === 'video' ? (
              <Video className="w-4 h-4" />
            ) : (
              <PhoneOff className="w-4 h-4" />
            )}
            <span className="text-sm">
              {callState.type === 'video' ? 'Video Call' : 'Voice Call'}
            </span>
          </div>
          
          <motion.p 
            className="text-lg font-medium text-gray-900 dark:text-white mt-2"
            animate={callState.status === 'connecting' ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {getStatusText()}
          </motion.p>
        </div>

        {/* Video Preview (for video calls) */}
        {callState.type === 'video' && callState.status === 'connected' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 relative"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-75">Video call simulation</p>
              </div>
            </div>
            
            {/* Self preview */}
            <div className="absolute bottom-4 right-4 w-20 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-white text-xs">You</div>
            </div>
          </motion.div>
        )}

        {/* Call Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          {callState.status === 'connected' && (
            <>
              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMuted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>

              {callState.type === 'video' && (
                <motion.button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoOff 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </motion.button>
              )}

              <motion.button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`p-3 rounded-full transition-colors ${
                  isSpeakerOn 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </motion.button>
            </>
          )}
        </div>

        {/* End Call Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={onEndCall}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <PhoneOff className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Call Status Indicator */}
        {callState.status === 'connecting' && (
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};