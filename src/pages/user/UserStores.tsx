import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Search, MapPin, Mail, Edit2 } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { Store, Rating } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import RatingDialog from '@/components/RatingDialog';

const UserStores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [userRatings, setUserRatings] = useState<Rating[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesData, ratingsData] = await Promise.all([
        mockApi.getStores(),
        mockApi.getRatings()]
        );

        setStores(storesData);
        // Filter ratings for current user
        setUserRatings(ratingsData.filter((rating) => rating.userId === user?.id));
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load stores",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const filteredStores = stores.filter((store) =>
  store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserRatingForStore = (storeId: string): Rating | undefined => {
    return userRatings.find((rating) => rating.storeId === storeId);
  };

  const handleRateStore = (store: Store) => {
    setSelectedStore(store);
    setShowRatingDialog(true);
  };

  const handleRatingSubmit = async (rating: number) => {
    if (!selectedStore || !user) return;

    try {
      const newRating = await mockApi.submitRating(user.id, selectedStore.id, rating);

      // Update local state
      const existingRatingIndex = userRatings.findIndex((r) => r.storeId === selectedStore.id);
      if (existingRatingIndex >= 0) {
        setUserRatings((prev) => prev.map((r) =>
        r.storeId === selectedStore.id ? newRating : r
        ));
      } else {
        setUserRatings((prev) => [...prev, newRating]);
      }

      // Update store rating in local state
      setStores((prev) => prev.map((store) => {
        if (store.id === selectedStore.id) {
          const allRatings = userRatings.filter((r) => r.storeId === store.id);
          const avgRating = allRatings.reduce((sum, r) => sum + r.rating, rating) / (allRatings.length + 1);
          return { ...store, rating: Math.round(avgRating * 10) / 10 };
        }
        return store;
      }));

      toast({
        title: "Rating submitted",
        description: `You rated ${selectedStore.name} ${rating} stars`
      });

      setShowRatingDialog(false);
      setSelectedStore(null);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive"
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) =>
    <Star
      key={index}
      className={`h-4 w-4 ${
      index < rating ?
      'text-yellow-400 fill-current' :
      'text-gray-300'}`
      } data-id="vti843ze9" data-path="src/pages/user/UserStores.tsx" />

    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6" data-id="kya7lv2xk" data-path="src/pages/user/UserStores.tsx">
        <h1 className="text-3xl font-bold" data-id="9b0o5axw5" data-path="src/pages/user/UserStores.tsx">Browse Stores</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-id="i0ydv3sny" data-path="src/pages/user/UserStores.tsx">
          {[1, 2, 3].map((i) =>
          <Card key={i} data-id="md005wx74" data-path="src/pages/user/UserStores.tsx">
              <CardHeader data-id="3dnq8ksbm" data-path="src/pages/user/UserStores.tsx">
                <div className="h-6 bg-gray-200 rounded animate-pulse" data-id="cg1tpb6gy" data-path="src/pages/user/UserStores.tsx"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" data-id="yw624d03i" data-path="src/pages/user/UserStores.tsx"></div>
              </CardHeader>
              <CardContent data-id="bz1dnhyxx" data-path="src/pages/user/UserStores.tsx">
                <div className="space-y-2" data-id="sazar1emn" data-path="src/pages/user/UserStores.tsx">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" data-id="j8mynxbc6" data-path="src/pages/user/UserStores.tsx"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" data-id="bfw0olwud" data-path="src/pages/user/UserStores.tsx"></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>);

  }

  return (
    <div className="space-y-6" data-id="96mn0bl7g" data-path="src/pages/user/UserStores.tsx">
      <div className="flex items-center justify-between" data-id="3t0ah6grp" data-path="src/pages/user/UserStores.tsx">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-id="lz4bk2d1a" data-path="src/pages/user/UserStores.tsx">
          Browse Stores
        </h1>
        <Badge variant="secondary" className="text-sm" data-id="awhg2beyu" data-path="src/pages/user/UserStores.tsx">
          {filteredStores.length} stores found
        </Badge>
      </div>

      <div className="relative" data-id="4j2kjzgv5" data-path="src/pages/user/UserStores.tsx">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" data-id="hnsmz0yka" data-path="src/pages/user/UserStores.tsx" />
        <Input
          placeholder="Search stores by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10" data-id="1l0gekr7c" data-path="src/pages/user/UserStores.tsx" />

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-id="j5b06da30" data-path="src/pages/user/UserStores.tsx">
        {filteredStores.map((store) => {
          const userRating = getUserRatingForStore(store.id);

          return (
            <Card key={store.id} className="hover:shadow-lg transition-shadow" data-id="3rjd1fa7r" data-path="src/pages/user/UserStores.tsx">
              <CardHeader data-id="pyd20mv02" data-path="src/pages/user/UserStores.tsx">
                <CardTitle className="flex items-start justify-between" data-id="v4youdhh3" data-path="src/pages/user/UserStores.tsx">
                  <span className="truncate" data-id="z2s1k8lyj" data-path="src/pages/user/UserStores.tsx">{store.name}</span>
                  <div className="flex items-center space-x-1 ml-2" data-id="ipmp6v69o" data-path="src/pages/user/UserStores.tsx">
                    {renderStars(Math.round(store.rating))}
                    <span className="text-sm text-muted-foreground ml-1" data-id="mrz15ftq7" data-path="src/pages/user/UserStores.tsx">
                      ({store.rating.toFixed(1)})
                    </span>
                  </div>
                </CardTitle>
                <CardDescription className="flex items-center gap-2" data-id="ft8nxw11o" data-path="src/pages/user/UserStores.tsx">
                  <Mail className="h-4 w-4" data-id="e4i2177ut" data-path="src/pages/user/UserStores.tsx" />
                  {store.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-id="f67j3xs0v" data-path="src/pages/user/UserStores.tsx">
                <div className="flex items-start gap-2" data-id="2695scjoq" data-path="src/pages/user/UserStores.tsx">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" data-id="k7562ixbr" data-path="src/pages/user/UserStores.tsx" />
                  <span className="text-sm text-muted-foreground" data-id="vfwzffcg7" data-path="src/pages/user/UserStores.tsx">
                    {store.address}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t" data-id="fwv0e66vw" data-path="src/pages/user/UserStores.tsx">
                  <div className="text-sm" data-id="1bonar17l" data-path="src/pages/user/UserStores.tsx">
                    <span className="text-muted-foreground" data-id="rveu3fnpz" data-path="src/pages/user/UserStores.tsx">Your rating: </span>
                    {userRating ?
                    <div className="flex items-center gap-1" data-id="l9azxrijx" data-path="src/pages/user/UserStores.tsx">
                        <div className="flex" data-id="rlrf4jpd1" data-path="src/pages/user/UserStores.tsx">
                          {renderStars(userRating.rating)}
                        </div>
                        <span className="font-medium" data-id="nrr7h7oy3" data-path="src/pages/user/UserStores.tsx">({userRating.rating})</span>
                      </div> :

                    <span className="text-gray-400" data-id="ay8m3goq6" data-path="src/pages/user/UserStores.tsx">Not rated</span>
                    }
                  </div>
                </div>

                <div className="flex gap-2" data-id="xlnslqe2o" data-path="src/pages/user/UserStores.tsx">
                  <Button
                    onClick={() => handleRateStore(store)}
                    size="sm"
                    className="flex-1"
                    variant={userRating ? "outline" : "default"} data-id="z3pzae623" data-path="src/pages/user/UserStores.tsx">

                    {userRating ?
                    <>
                        <Edit2 className="h-4 w-4 mr-2" data-id="yr9ddltpg" data-path="src/pages/user/UserStores.tsx" />
                        Update Rating
                      </> :

                    <>
                        <Star className="h-4 w-4 mr-2" data-id="14v4jdg2z" data-path="src/pages/user/UserStores.tsx" />
                        Rate Store
                      </>
                    }
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground" data-id="x9nmgonjm" data-path="src/pages/user/UserStores.tsx">
                  Total ratings: {store.totalRatings}
                </div>
              </CardContent>
            </Card>);

        })}
      </div>

      {filteredStores.length === 0 &&
      <div className="text-center py-12" data-id="p7xw15wcs" data-path="src/pages/user/UserStores.tsx">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" data-id="kbh0krc05" data-path="src/pages/user/UserStores.tsx" />
          <h3 className="text-lg font-medium text-gray-900 mb-2" data-id="62wkdvi5w" data-path="src/pages/user/UserStores.tsx">No stores found</h3>
          <p className="text-gray-500" data-id="y6yz0388r" data-path="src/pages/user/UserStores.tsx">
            {searchTerm ?
          "Try adjusting your search terms to find stores." :
          "No stores are currently available."}
          </p>
        </div>
      }

      <RatingDialog
        isOpen={showRatingDialog}
        onClose={() => {
          setShowRatingDialog(false);
          setSelectedStore(null);
        }}
        onSubmit={handleRatingSubmit}
        storeName={selectedStore?.name || ''}
        currentRating={selectedStore ? getUserRatingForStore(selectedStore.id)?.rating : undefined} data-id="z98simkm9" data-path="src/pages/user/UserStores.tsx" />

    </div>);

};

export default UserStores;