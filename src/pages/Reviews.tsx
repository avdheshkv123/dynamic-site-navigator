
import { useState } from "react";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  User,
  Calendar,
  AlertCircle,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Mock data for reviews
const initialReviews = [
  {
    id: 1,
    productId: 101,
    productName: "Ergonomic Office Chair",
    rating: 5,
    title: "Best office chair ever!",
    comment: "I've been using this chair for the past month and it has completely eliminated my back pain. The lumbar support is excellent and the material is very comfortable.",
    author: "Michael Scott",
    date: "2025-03-15",
    helpful: 24,
    unhelpful: 2,
    verified: true
  },
  {
    id: 2,
    productId: 102,
    productName: "Standing Desk",
    rating: 4,
    title: "Great desk, some minor issues",
    comment: "The desk is sturdy and looks great in my home office. The height adjustment works smoothly. My only complaint is that the surface scratches a bit too easily.",
    author: "Dwight Schrute",
    date: "2025-03-10",
    helpful: 15,
    unhelpful: 3,
    verified: true
  },
  {
    id: 3,
    productId: 103,
    productName: "Wireless Keyboard",
    rating: 2,
    title: "Disappointing battery life",
    comment: "The keyboard looks nice and types well, but the battery barely lasts a week. The product description claimed it would last months. Very disappointing.",
    author: "Jim Halpert",
    date: "2025-02-28",
    helpful: 31,
    unhelpful: 4,
    verified: true
  },
  {
    id: 4,
    productId: 104,
    productName: "Monitor Stand",
    rating: 5,
    title: "Perfect height and very sturdy",
    comment: "This monitor stand is exactly what I needed. It raises my monitor to the perfect eye level and has room underneath for organizing my desk supplies. It's also very sturdy and well-made.",
    author: "Pam Beesly",
    date: "2025-02-20",
    helpful: 19,
    unhelpful: 0,
    verified: true
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [newReview, setNewReview] = useState({
    productId: "",
    productName: "",
    rating: 5,
    title: "",
    comment: "",
  });
  const { toast } = useToast();

  const handleNewReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.productName || !newReview.title || !newReview.comment) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields to submit your review.",
        variant: "destructive"
      });
      return;
    }
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    const review = {
      id: reviews.length + 1,
      ...newReview,
      author: "Current User",
      date: currentDate,
      helpful: 0,
      unhelpful: 0,
      verified: true,
    };
    
    setReviews([review, ...reviews]);
    
    setNewReview({
      productId: "",
      productName: "",
      rating: 5,
      title: "",
      comment: "",
    });
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  const handleHelpful = (id: number, isHelpful: boolean) => {
    setReviews(reviews.map(review => {
      if (review.id === id) {
        return {
          ...review,
          helpful: isHelpful ? review.helpful + 1 : review.helpful,
          unhelpful: !isHelpful ? review.unhelpful + 1 : review.unhelpful,
        };
      }
      return review;
    }));
    
    toast({
      title: "Feedback recorded",
      description: `You marked this review as ${isHelpful ? "helpful" : "unhelpful"}.`,
    });
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === "all") return true;
    if (filter === "positive") return review.rating >= 4;
    if (filter === "neutral") return review.rating === 3;
    if (filter === "negative") return review.rating <= 2;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "helpful") {
      return b.helpful - a.helpful;
    }
    if (sortBy === "highest") {
      return b.rating - a.rating;
    }
    if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} 
      />
    ));
  };

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Product Reviews</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>Share your experience with our products</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input 
                    id="productName" 
                    name="productName"
                    value={newReview.productName}
                    onChange={handleNewReviewChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className="p-0 hover:scale-110 transition-transform"
                        onClick={() => handleRatingChange(i + 1)}
                      >
                        <Star 
                          className={`h-6 w-6 ${i < newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="title">Review Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={newReview.title}
                    onChange={handleNewReviewChange}
                    placeholder="Summarize your experience"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="comment">Review Details</Label>
                  <Textarea 
                    id="comment" 
                    name="comment"
                    value={newReview.comment}
                    onChange={handleNewReviewChange}
                    placeholder="Share your experience with the product..."
                    className="min-h-[100px]"
                    required
                  />
                </div>
                
                <Button type="submit" variant="green">Submit Review</Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="space-x-2 mb-2 sm:mb-0">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "positive" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("positive")}
              >
                Positive
              </Button>
              <Button 
                variant={filter === "neutral" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("neutral")}
              >
                Neutral
              </Button>
              <Button 
                variant={filter === "negative" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("negative")}
              >
                Critical
              </Button>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm mr-2">Sort by:</span>
              <select 
                className="border rounded px-2 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>
          
          {sortedReviews.length > 0 ? (
            <div className="space-y-4">
              {sortedReviews.map(review => (
                <Card key={review.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{review.title}</CardTitle>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {review.date}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {review.verified && (
                            <span className="flex items-center text-green-600">
                              <Check className="h-3 w-3 mr-1" />
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium mb-1">
                      For: {review.productName}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <div className="flex items-center mt-4 gap-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{review.author}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-sm text-muted-foreground">
                      Was this review helpful?
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex gap-1 items-center"
                        onClick={() => handleHelpful(review.id, true)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {review.helpful}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex gap-1 items-center"
                        onClick={() => handleHelpful(review.id, false)}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        {review.unhelpful}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-muted-foreground">
                There are no reviews matching your current filters.
              </p>
            </div>
          )}
        </div>
        
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Review Statistics</CardTitle>
              <CardDescription>Summary of customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Overall Rating</span>
                    <div className="flex items-center">
                      {renderStars(Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length))}
                      <span className="ml-2 font-bold">
                        {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Based on {reviews.length} reviews
                  </span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const rating = 5 - i;
                    const count = reviews.filter(r => r.rating === rating).length;
                    const percentage = Math.round((count / reviews.length) * 100) || 0;
                    
                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center gap-1 w-20">
                          {rating} <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-right text-sm">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Most reviewed products</h4>
                  <ul className="space-y-2">
                    {Array.from(new Set(reviews.map(r => r.productName)))
                      .slice(0, 3)
                      .map(product => {
                        const productReviews = reviews.filter(r => r.productName === product);
                        const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
                        
                        return (
                          <li key={product} className="flex justify-between items-center">
                            <span className="text-sm truncate flex-1">{product}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{avgRating.toFixed(1)}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
