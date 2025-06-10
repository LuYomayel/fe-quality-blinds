"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StarIcon as StarSolid,
  FlagIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  StarIcon as StarOutline,
  HandThumbUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  profile_photo_url?: string;
}

interface UserReview {
  id: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  timestamp: number;
  helpful: number;
  isVerified: boolean;
}

interface ReviewsData {
  googleReviews: GoogleReview[];
  userReviews: UserReview[];
  googleRating: number;
  userRating: number;
  totalGoogleReviews: number;
  totalUserReviews: number;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productName,
}) => {
  const [reviewsData, setReviewsData] = useState<ReviewsData>({
    googleReviews: [],
    userReviews: [],
    googleRating: 0,
    userRating: 0,
    totalGoogleReviews: 0,
    totalUserReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"google" | "users">("google");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    name: "",
    email: "",
    rating: 5,
    title: "",
    comment: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      // Fetch Google reviews
      const googleResponse = await fetch("/api/reviews/google");
      const googleData = await googleResponse.json();

      // Fetch user reviews for this product
      const userResponse = await fetch(
        `/api/reviews/user?productId=${productId}`
      );
      const userData = await userResponse.json();

      setReviewsData({
        googleReviews: googleData.success ? googleData.data.reviews : [],
        userReviews: userData.success ? userData.data.reviews : [],
        googleRating: googleData.success ? googleData.data.rating : 0,
        userRating: userData.success ? userData.data.averageRating : 0,
        totalGoogleReviews: googleData.success
          ? googleData.data.totalReviews
          : 0,
        totalUserReviews: userData.success ? userData.data.totalReviews : 0,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (
    field: keyof ReviewFormData,
    value: string | number
  ) => {
    setReviewForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (reviewForm.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (reviewForm.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (reviewForm.comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters";
    }

    if (!captchaVerified) {
      newErrors.captcha = "Please verify that you are not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/reviews/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reviewForm,
          productId,
          captchaToken: "verified", // Simplified captcha
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setReviewForm({
          name: "",
          email: "",
          rating: 5,
          title: "",
          comment: "",
        });
        setCaptchaVerified(false);

        // Hide form after success
        setTimeout(() => {
          setShowReviewForm(false);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setErrors({ submit: data.error });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrors({ submit: "Failed to submit review. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.floor(rating) ? (
              <StarSolid className={`${sizeClasses[size]} text-yellow-400`} />
            ) : (
              <StarOutline className={`${sizeClasses[size]} text-gray-300`} />
            )}
          </span>
        ))}
      </div>
    );
  };

  const renderRatingSelector = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleFormChange("rating", star)}
          className="focus:outline-none"
        >
          {star <= reviewForm.rating ? (
            <StarSolid className="h-8 w-8 text-yellow-400 hover:text-yellow-500 transition-colors" />
          ) : (
            <StarOutline className="h-8 w-8 text-gray-300 hover:text-yellow-300 transition-colors" />
          )}
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        ({reviewForm.rating} star{reviewForm.rating !== 1 ? "s" : ""})
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const combinedRating =
    reviewsData.totalUserReviews > 0
      ? (reviewsData.googleRating * reviewsData.totalGoogleReviews +
          reviewsData.userRating * reviewsData.totalUserReviews) /
        (reviewsData.totalGoogleReviews + reviewsData.totalUserReviews)
      : reviewsData.googleRating;

  const totalReviews =
    reviewsData.totalGoogleReviews + reviewsData.totalUserReviews;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Customer Reviews
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {renderStars(combinedRating, "lg")}
              <span className="text-2xl font-bold text-gray-900">
                {combinedRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">
              Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab("google")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "google"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Google Reviews ({reviewsData.totalGoogleReviews})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "users"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>Product Reviews ({reviewsData.totalUserReviews})</span>
          </div>
        </button>
      </div>

      {/* Reviews Content */}
      <AnimatePresence mode="wait">
        {activeTab === "google" ? (
          <motion.div
            key="google"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {reviewsData.googleReviews.length > 0 ? (
              reviewsData.googleReviews.map((review, index) => (
                <div
                  key={`${review.author_name}-${index}`}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {review.author_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {review.author_name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {review.relative_time_description}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        {renderStars(review.rating, "sm")}
                        <span className="text-sm text-gray-600">
                          {review.rating}/5
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No Google reviews available at the moment.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="users"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {reviewsData.userReviews.length > 0 ? (
              reviewsData.userReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">
                            {review.name}
                          </h4>
                          {review.isVerified && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        {renderStars(review.rating, "sm")}
                        <span className="text-sm text-gray-600">
                          {review.rating}/5
                        </span>
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1">
                        {review.title}
                      </h5>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {review.comment}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                          <HandThumbUpIcon className="h-4 w-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                          <FlagIcon className="h-4 w-4" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <ChatBubbleLeftIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">
                  No reviews yet for {productName}
                </p>
                <p className="text-sm text-gray-400">
                  Be the first to share your experience!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Write a Review for {productName}
                </h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Thank you for your review!
                  </h4>
                  <p className="text-gray-600">
                    Your review has been submitted and is pending approval.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) =>
                          handleFormChange("name", e.target.value)
                        }
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={reviewForm.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.value)
                        }
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    {renderRatingSelector()}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Review Title *
                    </label>
                    <input
                      type="text"
                      value={reviewForm.title}
                      onChange={(e) =>
                        handleFormChange("title", e.target.value)
                      }
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Summarize your experience"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Review *
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) =>
                        handleFormChange("comment", e.target.value)
                      }
                      rows={4}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.comment ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Share your experience with this product..."
                    />
                    {errors.comment && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.comment}
                      </p>
                    )}
                  </div>

                  {/* Simple Captcha */}
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={captchaVerified}
                      onChange={(e) => setCaptchaVerified(e.target.checked)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700">
                      I&apos;m not a robot
                    </label>
                  </div>
                  {errors.captcha && (
                    <p className="text-sm text-red-600">{errors.captcha}</p>
                  )}

                  {errors.submit && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <ExclamationTriangleIcon className="h-5 w-5" />
                      <span className="text-sm">{errors.submit}</span>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductReviews;
