import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle } from
'@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  storeName: string;
  currentRating?: number;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  storeName,
  currentRating
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(currentRating || 0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setSelectedRating(currentRating || 0);
      setHoveredRating(0);
    }
  }, [isOpen, currentRating]);

  const handleSubmit = () => {
    if (selectedRating > 0) {
      onSubmit(selectedRating);
    }
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const getStarColor = (starIndex: number) => {
    const displayRating = hoveredRating || selectedRating;
    return starIndex <= displayRating ? 'text-yellow-400 fill-current' : 'text-gray-300';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} data-id="4okceptqz" data-path="src/components/RatingDialog.tsx">
      <DialogContent className="sm:max-w-md" data-id="4cl9cj92k" data-path="src/components/RatingDialog.tsx">
        <DialogHeader data-id="cpa83rpff" data-path="src/components/RatingDialog.tsx">
          <DialogTitle data-id="zjjz3t4v1" data-path="src/components/RatingDialog.tsx">
            {currentRating ? 'Update Rating' : 'Rate Store'}
          </DialogTitle>
          <DialogDescription data-id="gtqhl1pcq" data-path="src/components/RatingDialog.tsx">
            {currentRating ?
            `Update your rating for ${storeName}` :
            `How would you rate ${storeName}?`
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-6" data-id="5e8igfcch" data-path="src/components/RatingDialog.tsx">
          <div className="flex space-x-1" data-id="cwho611wh" data-path="src/components/RatingDialog.tsx">
            {[1, 2, 3, 4, 5].map((star) =>
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm p-1 transition-all duration-150 hover:scale-110" data-id="2lbopap1d" data-path="src/components/RatingDialog.tsx">

                <Star
                className={`h-8 w-8 transition-colors duration-150 ${getStarColor(star)}`} data-id="c0lik9f90" data-path="src/components/RatingDialog.tsx" />

              </button>
            )}
          </div>
          
          <div className="text-center" data-id="10iemb50u" data-path="src/components/RatingDialog.tsx">
            <p className="text-sm text-muted-foreground" data-id="w0cqd7qa7" data-path="src/components/RatingDialog.tsx">
              {hoveredRating > 0 ?
              getRatingText(hoveredRating) :
              selectedRating > 0 ?
              <>Selected: {selectedRating} star{selectedRating !== 1 ? 's' : ''}</> :

              'Click to rate'
              }
            </p>
            {currentRating &&
            <p className="text-xs text-muted-foreground mt-1" data-id="2tfcg1jxe" data-path="src/components/RatingDialog.tsx">
                Current rating: {currentRating} star{currentRating !== 1 ? 's' : ''}
              </p>
            }
          </div>
        </div>

        <DialogFooter className="flex gap-2" data-id="y2yvhzmti" data-path="src/components/RatingDialog.tsx">
          <Button variant="outline" onClick={onClose} data-id="dab9i9mkr" data-path="src/components/RatingDialog.tsx">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedRating === 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" data-id="wsh1dvapd" data-path="src/components/RatingDialog.tsx">

            {currentRating ? 'Update Rating' : 'Submit Rating'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);

};

const getRatingText = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Poor';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Very Good';
    case 5:
      return 'Excellent';
    default:
      return '';
  }
};

export default RatingDialog;