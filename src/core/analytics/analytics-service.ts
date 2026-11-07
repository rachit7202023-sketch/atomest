// src/core/analytics/analytics-service.ts
// Centralised analytics layer. WorkflowEngine auto-emits all workflow events.
// Modules never call this directly.
// Currently wraps Google Analytics (gtag). Easy to swap for PostHog, Mixpanel, etc.

export type AnalyticsEvent =
  | 'workflow_started'
  | 'workflow_completed'
  | 'workflow_failed'
  | 'workflow_cancelled'
  | 'credits_deducted'
  | 'credits_refunded'
  | 'file_uploaded'
  | 'output_exported'
  | 'module_viewed'
  | 'module_hired'  // user lands on a module and clicks "Hire"
  | 'page_viewed';

export interface AnalyticsProps {
  moduleId?: string;
  userId?: string;
  jobId?: string;
  runtime?: number;        // ms
  creditsUsed?: number;
  error?: string;
  format?: string;
  [key: string]: unknown;
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
    ((window as unknown as Record<string, unknown>).gtag as (...a: unknown[]) => void)(...args);
  }
}

export const analyticsService = {
  /**
   * Emit a structured analytics event.
   * Called automatically by the WorkflowEngine for all lifecycle events.
   */
  emit(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
    gtag('event', event, {
      ...props,
      timestamp: new Date().toISOString(),
    });

    // Dev logging
    if (import.meta.env.DEV) {
      console.debug(`[analytics] ${event}`, props);
    }
  },

  /**
   * Track a page view. Call from page-level components.
   */
  page(name: string, path?: string): void {
    gtag('event', 'page_view', {
      page_title: name,
      page_location: path ?? (typeof window !== 'undefined' ? window.location.href : ''),
    });
  },

  /**
   * Identify a user after login. Associates future events with the user.
   */
  identify(userId: string, traits: Record<string, unknown> = {}): void {
    gtag('set', 'user_properties', {
      user_id: userId,
      ...traits,
    });
  },
};
