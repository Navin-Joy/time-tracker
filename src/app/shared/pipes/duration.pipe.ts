import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const hours: number = this.getHours(value);
    const mins: number = this.getMinutes(value - hours * (3600000));
    const seconds: number = this.getSeconds(value - hours * (3600000) - mins * (60000))

    return String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
  }

  private getSeconds(milliseconds: number): number {
    return Math.floor(milliseconds / 1000);
  }

  private getMinutes(milliseconds: number): number {
    return Math.floor(this.getSeconds(milliseconds) / 60);
  }

  private getHours(milliseconds: number): number {
    return Math.floor(this.getMinutes(milliseconds) / 60);
  }

}
