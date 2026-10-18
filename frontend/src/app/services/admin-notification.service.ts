import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AggregatedNotification {
  id: string;
  title: string;
  summary: string;
  messages: string[];
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
  autoCloseMs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminNotificationService {
  private activeNotificationSubject = new BehaviorSubject<AggregatedNotification | null>(null);
  public activeNotification$: Observable<AggregatedNotification | null> =
    this.activeNotificationSubject.asObservable();

  // Queue to buffer individual success messages during a multi-step action
  private pendingSuccessMessages: string[] = [];
  private batchTitle: string = 'System Action Completed';

  /**
   * Start a new batch of system action messages.
   */
  startActionBatch(batchTitle: string = 'System Action Completed'): void {
    this.batchTitle = batchTitle;
    this.pendingSuccessMessages = [];
  }

  /**
   * Add an individual success message to the batch without triggering separate pop-ups.
   */
  addSuccessMessage(message: string): void {
    if (message && message.trim()) {
      this.pendingSuccessMessages.push(message.trim());
    }
  }

  /**
   * Complete the batch: aggregates all buffered individual success messages
   * and displays them together in a single unified toast notification / alert banner.
   */
  completeActionBatch(summary?: string, autoCloseMs: number = 6500): AggregatedNotification | null {
    if (this.pendingSuccessMessages.length === 0) {
      return null;
    }

    const messages = [...this.pendingSuccessMessages];
    const defaultSummary = messages.length === 1
      ? messages[0]
      : `All ${messages.length} operations completed successfully without issues.`;

    const notification: AggregatedNotification = {
      id: 'notif-' + Date.now(),
      title: this.batchTitle,
      summary: summary || defaultSummary,
      messages: messages,
      type: 'success',
      timestamp: new Date(),
      autoCloseMs
    };

    this.pendingSuccessMessages = [];
    this.show(notification);
    return notification;
  }

  /**
   * Directly aggregate and display an array of individual success messages together.
   */
  showAggregatedSuccess(
    messages: string[],
    title: string = 'System Action Completed',
    summary?: string,
    autoCloseMs: number = 6500
  ): void {
    if (!messages || messages.length === 0) return;

    const defaultSummary = messages.length === 1
      ? messages[0]
      : `Successfully completed ${messages.length} system operations.`;

    const notification: AggregatedNotification = {
      id: 'notif-' + Date.now(),
      title,
      summary: summary || defaultSummary,
      messages: [...messages],
      type: 'success',
      timestamp: new Date(),
      autoCloseMs
    };

    this.show(notification);
  }

  show(notification: AggregatedNotification): void {
    this.activeNotificationSubject.next(notification);
  }

  clear(): void {
    this.activeNotificationSubject.next(null);
  }
}
