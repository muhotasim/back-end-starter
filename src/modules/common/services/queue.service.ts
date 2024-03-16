import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { MailService } from './mail.service';
import { JobTypes } from 'src/utils/custome.datatypes';

interface QueueItem {
  jobType: JobTypes;
  data: { [key: string]: any };
}

@Injectable()
export class QueueService implements OnModuleInit {
  private isProcessing = false;
  private queue: QueueItem[] = [];

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {}

  onModuleInit() {
    this.processQueue();
  }

  addJob(type: JobTypes, data: { [key: string]: any }) {
    this.queue.push({ jobType: type, data });
    if (!this.isProcessing) {
      this.isProcessing = true;
      this.eventEmitter.emit('event.job_added');
    }
  }

  @OnEvent('event.job_added')
  async processQueue() {
    while (this.queue.length > 0) {
      const job = this.queue.shift();
      if (job) {
        try {
          await this.processJob(job);
        } catch (error) {
          console.error(`Error processing job: ${error.message}`);
          // If there's an error, push the job back to the queue for retry
          this.queue.unshift(job);
        }
      }
    }
    this.isProcessing = false;
  }

  private async processJob(job: QueueItem) {
    switch (job.jobType) {
      case JobTypes.mail:
        await this.mailService.sendMail(job.data);
        break;
      default:
        throw new Error(`Unsupported job type: ${job.jobType}`);
    }
  }
}
