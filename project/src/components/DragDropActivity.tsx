import React, { useState } from 'react';
import { CheckCircle, RotateCcw } from 'lucide-react';

interface DragDropItem {
  id: string;
  content: string;
  emoji: string;
  category: string;
}

interface DragDropZone {
  id: string;
  title: string;
  emoji: string;
  color: string;
  acceptedCategories: string[];
}

interface DragDropActivityProps {
  title: string;
  items: DragDropItem[];
  zones: DragDropZone[];
  onComplete: (correct: boolean) => void;
}

const DragDropActivity: React.FC<DragDropActivityProps> = ({
  title,
  items,
  zones,
  onComplete
}) => {
  const [draggedItem, setDraggedItem] = useState<DragDropItem | null>(null);
  const [droppedItems, setDroppedItems] = useState<{ [zoneId: string]: DragDropItem[] }>({});
  const [availableItems, setAvailableItems] = useState<DragDropItem[]>(items);
  const [isComplete, setIsComplete] = useState(false);

  const handleDragStart = (item: DragDropItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const zone = zones.find(z => z.id === zoneId);
    if (!zone || !zone.acceptedCategories.includes(draggedItem.category)) {
      // Wrong drop - animate rejection
      return;
    }

    // Add item to zone
    setDroppedItems(prev => ({
      ...prev,
      [zoneId]: [...(prev[zoneId] || []), draggedItem]
    }));

    // Remove from available items
    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
    setDraggedItem(null);

    // Check if activity is complete
    const newDroppedItems = {
      ...droppedItems,
      [zoneId]: [...(droppedItems[zoneId] || []), draggedItem]
    };

    const totalDropped = Object.values(newDroppedItems).reduce((sum, items) => sum + items.length, 0);
    if (totalDropped === items.length) {
      setIsComplete(true);
      onComplete(true);
    }
  };

  const handleReset = () => {
    setDroppedItems({});
    setAvailableItems(items);
    setIsComplete(false);
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-purple-800 mb-2">{title}</h3>
        <p className="text-lg text-gray-600">Drag and drop the items into the correct categories! 🎯</p>
      </div>

      {/* Available Items */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border-3 border-blue-300">
        <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center space-x-2">
          <span>📦</span>
          <span>Items to Sort</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className="bg-white p-4 rounded-xl border-2 border-gray-300 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{item.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drop Zones */}
      <div className="grid md:grid-cols-2 gap-6">
        {zones.map(zone => (
          <div
            key={zone.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, zone.id)}
            className={`bg-gradient-to-br ${zone.color} rounded-2xl p-6 border-3 border-dashed border-gray-400 min-h-48 transition-all duration-300 ${
              draggedItem && zone.acceptedCategories.includes(draggedItem.category)
                ? 'border-green-500 bg-green-50 scale-105'
                : draggedItem
                ? 'border-red-500 bg-red-50'
                : ''
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{zone.emoji}</div>
              <h4 className="text-lg font-bold text-gray-800">{zone.title}</h4>
            </div>

            <div className="space-y-2">
              {(droppedItems[zone.id] || []).map(item => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-xl border-2 border-green-300 text-center animate-bounce"
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-sm font-medium text-gray-700">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full font-bold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Reset</span>
        </button>

        {isComplete && (
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold animate-pulse">
            <CheckCircle className="h-5 w-5" />
            <span>Great Job! 🎉</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropActivity;