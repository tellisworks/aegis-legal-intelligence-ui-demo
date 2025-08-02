import { motion } from "framer-motion";
import { mockTimeline, TimelineEvent } from "@/lib/mock-data";

export default function TimelineView() {
  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'legal': return 'bg-blue-500';
      case 'contradiction': return 'bg-orange-500';
      case 'alienation': return 'bg-red-500';
      case 'pattern': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'legal': return '⚖️';
      case 'contradiction': return '📄';
      case 'alienation': return '🔥';
      case 'pattern': return '🔍';
      default: return '•';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Timeline</h3>
        <p className="text-gray-600">Interactive timeline showing key events, contradictions, and patterns.</p>
      </div>
      
      {/* Timeline Legend */}
      <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-700">⚖️ Court Events</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-700">🔥 Escalation Events</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-700">📄 Contradictions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-700">🔍 Pattern Events</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative overflow-x-auto">
        <div className="flex items-center space-x-8 pb-4" style={{ minWidth: '800px' }}>
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
          
          {/* Timeline Events */}
          {mockTimeline.map((event, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`w-4 h-4 ${getEventColor(event.type)} rounded-full z-10 relative`}>
                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  <div className="font-medium">{event.event}</div>
                  <div className="text-gray-300">{new Date(event.date).toLocaleDateString()} • {event.source}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 text-center">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
