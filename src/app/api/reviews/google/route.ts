import { NextResponse } from "next/server";

// For now, we'll simulate the Google Reviews API
// In production, you would integrate with Google Places API or Google My Business API
//const GOOGLE_PLACE_ID = "ChIJX8XYZ123456789"; // Replace with actual place ID
//const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetails {
  rating: number;
  reviews: GoogleReview[];
  user_ratings_total: number;
}

// Simulated recent reviews for development
const mockGoogleReviews: GoogleReview[] = [
  {
    author_name: "James Wilson",
    rating: 5,
    relative_time_description: "2 days ago",
    text: "Exceptional service from Quality Blinds! They installed beautiful roller blinds throughout our home. Professional installation team and the quality is outstanding. Highly recommend for anyone looking for premium window treatments.",
    time: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Sophie Martinez",
    rating: 5,
    relative_time_description: "5 days ago",
    text: "Amazing experience with Quality Blinds Australia! From the initial consultation to installation, everything was seamless. The Roman blinds we ordered are absolutely gorgeous and the quality is top-notch.",
    time: Date.now() - 5 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Michael Chen",
    rating: 5,
    relative_time_description: "1 week ago",
    text: "Professional service and excellent products. The team helped us choose the perfect shutters for our bathroom and kitchen. Installation was quick and clean. Very satisfied with the results!",
    time: Date.now() - 7 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Emma Thompson",
    rating: 5,
    relative_time_description: "1 week ago",
    text: "Quality Blinds exceeded our expectations! We needed motorized blinds for large windows and they delivered perfectly. The smart home integration works flawlessly. Great value for money.",
    time: Date.now() - 8 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "David Kumar",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Outstanding customer service and product quality. The consultation was thorough and the team provided excellent advice. Our new Venetian blinds look fantastic and function perfectly.",
    time: Date.now() - 14 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Lisa Roberts",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Fantastic experience from start to finish. Quality Blinds provided competitive pricing, quality products, and professional installation. The blockout blinds are perfect for our bedroom.",
    time: Date.now() - 15 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Robert Anderson",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "Highly recommend Quality Blinds Australia! They installed awnings for our outdoor area and the quality is exceptional. The motorized system with weather sensors is brilliant.",
    time: Date.now() - 21 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Sarah Johnson",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "Professional team and excellent results. The curtains they installed in our living room are beautiful and the blockout feature works perfectly. Great attention to detail.",
    time: Date.now() - 22 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Mark Williams",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Excellent service and product quality. Quality Blinds helped us choose the right window treatments for our entire home. Installation was professional and the results are stunning.",
    time: Date.now() - 30 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
  {
    author_name: "Jennifer Lee",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "Quality Blinds Australia provided outstanding service! The team was knowledgeable, professional, and delivered exactly what they promised. Our shutters look amazing and function perfectly.",
    time: Date.now() - 32 * 24 * 60 * 60 * 1000,
    language: "en",
    profile_photo_url: "https://lh3.googleusercontent.com/a/default-user=s40-c",
  },
];

const mockPlaceDetails: GooglePlaceDetails = {
  rating: 4.9,
  user_ratings_total: 147,
  reviews: mockGoogleReviews,
};

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  try {
    // In production, uncomment this to use real Google Places API
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,reviews,user_ratings_total&key=${GOOGLE_API_KEY}`
    // );
    // const data = await response.json();

    // For now, return mock data with recent reviews
    const recentReviews = mockPlaceDetails.reviews
      .sort((a, b) => b.time - a.time) // Sort by newest first
      .slice(0, 10); // Get latest 10 reviews

    return NextResponse.json({
      success: true,
      data: {
        rating: mockPlaceDetails.rating,
        totalReviews: mockPlaceDetails.user_ratings_total,
        reviews: recentReviews,
      },
    });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);

    // Return cached/fallback data if API fails
    return NextResponse.json({
      success: false,
      error: "Failed to fetch reviews",
      data: {
        rating: 4.4,
        totalReviews: 120,
        reviews: mockGoogleReviews.slice(0, 5), // Fallback to 5 reviews
      },
    });
  }
}
