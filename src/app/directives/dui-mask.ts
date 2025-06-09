import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDuiMask]',
  standalone: true
})
export class DuiMaskDirective {

  constructor(private el: ElementRef, private ngControl: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    const originalCursorPosition = input.selectionStart;

    if (value.length > 0) {
      if (value.length <= 8) {
        formattedValue = value;
      } else {
        formattedValue = `${value.slice(0, 8)}-${value.slice(8, 9)}`; 
      }
    }

    // Update the value of the control (ngModel) and the DOM element
    if (this.ngControl && this.ngControl.control && this.ngControl.control.value !== formattedValue) {
      this.ngControl.control.setValue(formattedValue, { emitEvent: false });
    }
    if (input.value !== formattedValue) {
      input.value = formattedValue; 
    }

    // Adjusts the cursor position if a hyphen has been inserted
    if (originalCursorPosition !== null && formattedValue.length > value.length && originalCursorPosition === 9) {
      input.setSelectionRange(originalCursorPosition + 1, originalCursorPosition + 1);
    } else if (originalCursorPosition !== null) {
      input.setSelectionRange(originalCursorPosition, originalCursorPosition);
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    const currentValue = (event.target as HTMLInputElement).value;
    const cursorPosition = (event.target as HTMLInputElement).selectionStart;

    if (event.ctrlKey || event.altKey || event.metaKey || event.key.length > 1) {
        return;
    }

    if (charCode >= 48 && charCode <= 57) { // 0-9
        if (currentValue.length === 9 && currentValue[8] === '-') {
            event.preventDefault();
        } else if (currentValue.length >= 10 && cursorPosition !== null && cursorPosition >= 9) {
            event.preventDefault();
        } else if (currentValue.length >= 8 && cursorPosition !== null && cursorPosition > 7 && charCode >= 48 && charCode <= 57) {
            return;
        }
        return;
    }

    if (event.key === '-' && currentValue.length === 8 && cursorPosition === 8) {
        return;
    }

    event.preventDefault();
  }
}