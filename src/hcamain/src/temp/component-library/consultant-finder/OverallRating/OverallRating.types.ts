export interface OverallRatingProps {
  title?: string;
  subtitle: string;
  overallExperience: number;
  overalCare: number;
  explanation: number;
  overallExperienceLabel: string;
  personalCareLabel: string;
  explanationLabel: string;
  ignoreReviewsConsultant: boolean;
  noReviewsMsg: string;
}
