import { NextRequest, NextResponse } from "next/server";

interface UserReview {
  id: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  isApproved: boolean;
  timestamp: number;
  helpful: number;
  flagged: number;
}

// Simulated database - in production, use actual database
const userReviews: UserReview[] = [];

// Simple spam detection keywords
const SPAM_KEYWORDS = [
  "buy now",
  "click here",
  "visit this link",
  "make money",
  "guaranteed",
  "free money",
  "act now",
  "limited time",
  "urgent",
  "congratulations",
  "winner",
  "pharmacy",
  "viagra",
  "casino",
  "lottery",
];

// Simple profanity filter
const PROFANITY_WORDS = [
  "damn",
  "hell",
  "crap",
  "stupid",
  "idiot",
  "hate",
  "worst",
  // Add more as needed
];

function validateReview(review: Partial<UserReview>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required fields
  if (!review.name || review.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!review.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(review.email)) {
    errors.push("Valid email is required");
  }

  if (!review.rating || review.rating < 1 || review.rating > 5) {
    errors.push("Rating must be between 1 and 5");
  }

  if (
    !review.title ||
    review.title.trim().length < 5 ||
    review.title.trim().length > 100
  ) {
    errors.push("Title must be between 5 and 100 characters");
  }

  if (
    !review.comment ||
    review.comment.trim().length < 10 ||
    review.comment.trim().length > 1000
  ) {
    errors.push("Comment must be between 10 and 1000 characters");
  }

  if (!review.productId) {
    errors.push("Product ID is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function detectSpam(text: string): boolean {
  const lowerText = text.toLowerCase();

  // Check for spam keywords
  const hasSpamKeywords = SPAM_KEYWORDS.some((keyword) =>
    lowerText.includes(keyword.toLowerCase())
  );

  // Check for excessive caps
  const capsCount = (text.match(/[A-Z]/g) || []).length;
  const excessiveCaps = capsCount > text.length * 0.3;

  // Check for excessive punctuation
  const punctuationCount = (text.match(/[!?]{2,}/g) || []).length;
  const excessivePunctuation = punctuationCount > 3;

  // Check for repeated characters
  const hasRepeatedChars = /(.)\1{4,}/.test(text);

  return (
    hasSpamKeywords || excessiveCaps || excessivePunctuation || hasRepeatedChars
  );
}

function containsProfanity(text: string): boolean {
  const lowerText = text.toLowerCase();
  return PROFANITY_WORDS.some((word) => lowerText.includes(word));
}

function verifyCaptcha(captchaToken: string): boolean {
  // Simple captcha verification - in production, use reCAPTCHA or similar
  return captchaToken === "verified" || captchaToken.length > 10;
}

export const dynamic = "force-static";
export const revalidate = false;

// GET - Fetch reviews for a product
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      {
        success: false,
        error: "Product ID is required",
      },
      { status: 400 }
    );
  }

  // Filter approved reviews for the product
  const productReviews = userReviews
    .filter((review) => review.productId === productId && review.isApproved)
    .sort((a, b) => b.timestamp - a.timestamp);

  // Calculate average rating
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
        productReviews.length
      : 0;

  return NextResponse.json({
    success: true,
    data: {
      reviews: productReviews,
      totalReviews: productReviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
    },
  });
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { captchaToken, ...reviewData } = body;

    // Verify captcha
    if (!verifyCaptcha(captchaToken)) {
      return NextResponse.json(
        {
          success: false,
          error: "Captcha verification failed",
        },
        { status: 400 }
      );
    }

    // Validate review data
    const validation = validateReview(reviewData);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Check for spam
    const titleAndComment = `${reviewData.title} ${reviewData.comment}`;
    if (detectSpam(titleAndComment)) {
      return NextResponse.json(
        {
          success: false,
          error: "Review flagged as potential spam",
        },
        { status: 400 }
      );
    }

    // Check for profanity
    if (containsProfanity(titleAndComment)) {
      return NextResponse.json(
        {
          success: false,
          error: "Review contains inappropriate content",
        },
        { status: 400 }
      );
    }

    // Create new review
    const newReview: UserReview = {
      id: Date.now().toString(),
      ...reviewData,
      name: reviewData.name.trim(),
      email: reviewData.email.trim().toLowerCase(),
      title: reviewData.title.trim(),
      comment: reviewData.comment.trim(),
      isVerified: false, // Email verification would happen separately
      isApproved: false, // Manual approval required
      timestamp: Date.now(),
      helpful: 0,
      flagged: 0,
    };

    // Add to "database"
    userReviews.push(newReview);

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully and is pending approval",
      data: {
        id: newReview.id,
        status: "pending_approval",
      },
    });
  } catch (error) {
    console.error("Error submitting review:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit review",
      },
      { status: 500 }
    );
  }
}

// PUT - Mark review as helpful or flag it
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, action } = body; // action: 'helpful' | 'flag'

    const reviewIndex = userReviews.findIndex((r) => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Review not found",
        },
        { status: 404 }
      );
    }

    if (action === "helpful") {
      userReviews[reviewIndex].helpful += 1;
    } else if (action === "flag") {
      userReviews[reviewIndex].flagged += 1;

      // Auto-hide if flagged too many times
      if (userReviews[reviewIndex].flagged >= 5) {
        userReviews[reviewIndex].isApproved = false;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Review ${action} updated`,
    });
  } catch (error) {
    console.error("Error updating review:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update review",
      },
      { status: 500 }
    );
  }
}
