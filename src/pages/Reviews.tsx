import { useState, useEffect } from "react";
import { Star, StarHalf, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: number;
  productId: number;
  productName: string;
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
  helpful: number;
  unhelpful: number;
  verified: boolean;
}

const initialReviews: Review[] = [
  {
    id: 1,
    productId: 101,
    productName: "Ergonomic Office Chair",
    rating: 5,
    title: "Best chair ever!",
    comment: "This chair has completely transformed my work experience. The support is incredible, and I can sit comfortably for hours.",
    author: "Verified Customer",
    date: "2024-08-15",
    helpful: 42,
    unhelpful: 3,
    verified: true
  },
  {
    id: 2,
    productId: 101,
    productName: "Ergonomic Office Chair",
    rating: 4,
    title: "Great chair, but...",
    comment: "Overall, a great chair. The lumbar support is excellent. However, the armrests could be more adjustable.",
    author: "Tech Enthusiast",
    date: "2024-07-28",
    helpful: 28,
    unhelpful: 5,
    verified: true
  },
  {
    id: 3,
    productId: 102,
    productName: "Wireless Keyboard",
    rating: 3,
    title: "Decent keyboard for the price",
    comment: "It's a decent wireless keyboard. Keys are responsive, but the build quality feels a bit cheap.",
    author: "Budget Shopper",
    date: "2024-07-10",
    helpful: 15,
    unhelpful: 2,
    verified: false
  },
  {
    id: 4,
    productId: 103,
    productName: "Adjustable Standing Desk",
    rating: 5,
    title: "Life-changing desk!",
    comment: "This standing desk is fantastic! It's sturdy, easy to adjust, and has improved my posture significantly.",
    author: "Health Nut",
    date: "2024-06-22",
    helpful: 55,
    unhelpful: 1,
    verified: true
  },
  {
    id: 5,
    productId: 102,
    productName: "Wireless Keyboard",
    rating: 2,
    title: "Not so great",
    comment: "I had high hopes, but the keyboard disconnects frequently and the battery life is poor.",
    author: "Disappointed User",
    date: "2024-06-05",
    helpful: 8,
    unhelpful: 30,
    verified: false
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    productId: "",
    productName: "",
    rating: 0,
    title: "",
    comment: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prevState => ({
      ...prevState,
      rating: rating
    }));
  };

  const handleSubmitReview = () => {
    if (!newReview.comment || !newReview.title || !newReview.rating) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const reviewData = {
      ...newReview,
      id: Math.floor(Math.random() * 10000),
      productId: Number(newReview.productId),
      author: "Current User",
      date: new Date().toLocaleDateString(),
      helpful: 0,
      unhelpful: 0,
      verified: true
    };

    setReviews([...reviews, reviewData]);
    setNewReview({
      productId: "",
      productName: "",
      rating: 0,
      title: "",
      comment: ""
    });
    setIsAddingReview(false);

    toast({
      title: "Review Submitted",
      description: "Your review has been submitted successfully."
    });
  };

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast({
      title: "Review Deleted",
      description: "The review has been deleted successfully."
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-5 w-5 text-yellow-500" />);
      } else if (i - 0.5 === rating) {
        stars.push(<StarHalf key={i} className="h-5 w-5 text-yellow-500" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Reviews</h1>
        <Button onClick={() => setIsAddingReview(true)} variant="green" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Review
        </Button>
      </div>

      {isAddingReview && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Review</CardTitle>
            <CardDescription>Share your thoughts about the product</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productId">Product ID</Label>
                <Input
                  id="productId"
                  name="productId"
                  type="number"
                  placeholder="Enter Product ID"
                  value={newReview.productId}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  name="productName"
                  type="text"
                  placeholder="Enter Product Name"
                  value={newReview.productName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label>Rating</Label>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map(index => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`mr-1 ${newReview.rating >= index ? 'text-yellow-500' : ''}`}
                    onClick={() => handleRatingChange(index)}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Review Title"
                value={newReview.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Write your review here"
                value={newReview.comment}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <div className="flex justify-end p-4">
            <Button variant="secondary" onClick={() => setIsAddingReview(false)} className="mr-2">
              Cancel
            </Button>
            <Button variant="green" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </div>
        </Card>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No reviews available.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {reviews.map(review => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{review.title}</CardTitle>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteReview(review.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      by {review.author} on {review.date}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{review.comment}</p>
                <Separator className="my-4" />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Helpful: {review.helpful}</span>
                  <span>Unhelpful: {review.unhelpful}</span>
                  <span>{review.verified ? "Verified Purchase" : "Unverified Purchase"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
