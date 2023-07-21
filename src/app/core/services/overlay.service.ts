import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OverlayComponent } from 'src/app/shared/components/overlay/overlay.component';
import { IOverlayContent } from '../interfaces/overlay.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  dialogRef!: MatDialogRef<OverlayComponent>;

  constructor(
    private dialog: MatDialog
  ) { }

  public openOverlay(data: IOverlayContent): Observable<boolean> {
    this.dialogRef = this.dialog.open(OverlayComponent, {
      data,
      panelClass: 'custom-popup',
      width: data?.width || '450px',
      disableClose: false,
      backdropClass: 'custom-backdrop'
    });

    return this.dialogRef.afterClosed();
  }

  public closeOverlay(): void {
    this.dialogRef.close();
  }
}
